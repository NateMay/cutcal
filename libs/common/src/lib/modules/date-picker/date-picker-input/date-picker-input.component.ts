import { CdkOverlayOrigin, Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay'
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal'
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentRef, ElementRef, EventEmitter, forwardRef, HostBinding, HostListener, Injector, Input, NgZone, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'
import { Boolish } from '../../../decorators/boolish/boolish'
import { eventWithin } from '../../../functions/eventWithin/eventWithin'
import { executeOnStable } from '../../../functions/executeOnStable/executeOnStable'
import { DatePickerDialogData, DATE_PICKER_DATA } from '../date-picker-data'
import { DatePickerDialogComponent } from '../date-picker-dialog/date-picker-dialog.component'

let nextUniqueId = 0

export const DATE_PICKER_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  multi: true,
  useExisting: forwardRef(() => DatePickerInputComponent),
}

// TEST (date-picker) with reactive forms

@Component({
  selector: 'cc-date-picker',
  host: { class: 'cc-date-picker' },
  styleUrls: ['./date-picker-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DATE_PICKER_CONTROL_VALUE_ACCESSOR],
  template: `
    <mat-form-field [ngStyle]="{ width: width }">
      <mat-label *ngIf="label">{{ label }}</mat-label>

      <input
        type="text"
        #input
        matInput
        autocomplete="off"
        [attr.id]="idStr"
        [attr.name]="name"
        [disabled]="disabled"
        [placeholder]="placeholder"
        [attr.aria-label]="ariaLabel"
        [ngStyle]="{ 'text-align': inputAlign }"
        value="{{ date | date: dateFormat }}"
        (focus)="openPicker()"
        (click)="openPicker()"
        (blur)="blur()"
        (keydown.enter)="parseDate(input.value)"
        (keydown.tab)="parseDate(input.value)"
        (keydown.shift.tab)="parseDate(input.value)"
        cdkOverlayOrigin
        #pickerOrigin="cdkOverlayOrigin"
      />

      <button
        mat-icon-button
        matSuffix
        [attr.id]="idStr + '-trigger'"
        [disabled]="disabled"
      >
        <mat-icon>calendar_today</mat-icon>
      </button>
    </mat-form-field>
  `,
})
export class DatePickerInputComponent implements OnInit, ControlValueAccessor {
  @Input() date: Date | null
  @Output() dateChange = new EventEmitter<Date | null>()

  /**
   * @description id of the input element
   */
  @Input()
  get idStr(): string {
    return this._id
  }
  set idStr(value: string) {
    this._id = value || this._uid
  }
  private _id: string
  private _uid = `cc-date-picker-input-${nextUniqueId++}`

  @Input() label: string = 'Selected a Date'
  @Input() name: string = 'date-picker'
  @Input() dateFormat: string = 'mediumDate'
  @Input() placeholder: string = 'Date'
  @Input() inputAlign: string = 'left'

  @Input() @Boolish disabled = false

  @Input() @Boolish monthBtnDisabled = false

  // TODO (date-picker) get rid of this and redesign the api pof the component
  /**
   * @example
   *   <mat-form-field>
   *    <input ccDatePickerInput="picker1">
   *    <cc-date-picker #picker1></cc-date-picker>
   *   </mat-form-field>
   */
  @Input()
  @HostBinding('style.width')
  width: string = '205px'

  pickerOverlayRef!: OverlayRef

  pickerRef!: ComponentRef<DatePickerDialogComponent>

  get ariaLabel() {
    return `${this.label} - ${this.placeholder}`
  }

  @ViewChild('input') input!: ElementRef

  @ViewChild('pickerOrigin') pickerOrigin!: CdkOverlayOrigin

  @HostListener('document:mousedown', ['$event'])
  onmousedown(event: MouseEvent): void {
    if (
      !eventWithin(event, [
        this.pickerOrigin.elementRef.nativeElement,
        this.pickerOverlayRef.hostElement,
      ])
    ) {
      this.parseDate(this.input.nativeElement.value)
      this.closePicker()
    }
  }

  @HostListener('document:keydown.Escape')
  closePicker(): void {
    this.pickerOverlayRef.detach()
  }

  constructor(
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef,
    private injector: Injector,
    private zone: NgZone,
    private cdr: ChangeDetectorRef
  ) {
    this.idStr = this.idStr
  }

  ngOnInit() {
    /**
     * @reference [Overlay-Stackblitz] {@link https://stackblitz.com/edit/overlay-demo?file=app%2Fapp.module.ts}
     */
    this.pickerOverlayRef = this.overlay.create(
      new OverlayConfig({
        scrollStrategy: this.overlay.scrollStrategies.reposition(),
        positionStrategy: this.overlay
          .position()
          .connectedTo(
            this.pickerOrigin.elementRef,
            { originX: 'start', originY: 'bottom' },
            { overlayX: 'start', overlayY: 'top' }
          ),
        width: '250px',
        height: 'auto',
      })
    )
  }

  // used by the datetime-binder to make updates
  markForCheck() {
    this.cdr.markForCheck()
  }

  openPicker(): void {
    if (this.pickerOverlayRef.hasAttached()) return

    this.pickerRef = this.pickerOverlayRef.attach(
      new ComponentPortal(
        DatePickerDialogComponent,
        this.viewContainerRef,
        this.createInjector(<DatePickerDialogData>{
          selectedDate: this.date,
          monthBtnDisabled: this.monthBtnDisabled,
          close: () => {
            this.reFocusTrigger()
            this.closePicker()
          },
          select: (date: Date) => {
            this.date = date
            this.writeValue(date)
            this.reFocusTrigger()
            this.pickerRef.instance.selectedDate = date
            this.pickerRef.instance.focusDate = date
          },
        })
      )
    )
  }

  blur() {
    this.onTouched()
  }

  reFocusTrigger() {
    if (this.pickerOverlayRef.hasAttached())
      executeOnStable(this.zone, () => {
        const trigger = document.getElementById(`${this.idStr}-trigger`)
        if (!trigger) console.warn('trigger not refocused')
        else trigger.focus()
      })
  }

  private createInjector(data: DatePickerDialogData): PortalInjector {
    return new PortalInjector(
      this.injector,
      new WeakMap<any, any>([[DATE_PICKER_DATA, data]])
    )
  }

  parseDate(text: string): void {
    const num = Date.parse(text)
    const newValue = isNaN(num) ? null : new Date(num)
    this.date = newValue
    this.writeValue(newValue)
  }

  writeValue(date: Date | null): void {
    this.onTouched()
    this.dateChange.emit(date)
    this.onChange(date)
    this.closePicker()
  }

  registerOnChange(fn: (date: Date | null) => void): void {
    this.onChange = fn
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled
  }

  onChange = (date: Date | null) => {}
  onTouched = () => {}
}
