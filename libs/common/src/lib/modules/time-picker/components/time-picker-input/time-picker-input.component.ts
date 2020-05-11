import {
  CdkOverlayOrigin,
  Overlay,
  OverlayConfig,
  OverlayRef
} from '@angular/cdk/overlay'
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal'
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  HostListener,
  Injector,
  Input,
  NgZone,
  OnInit,
  Output,
  ViewChild,
  ViewContainerRef
} from '@angular/core'
import { NG_VALUE_ACCESSOR } from '@angular/forms'
import { Boolish } from '@cutcal/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { dateFromTime } from '../../../../functions/dateFromTime/dateFromTime'
import { onStable } from '../../../../functions/onStable/onStable'
import { TimePickerData, TIME_PICKER_DATA } from '../../utils/time-picker-data'
import { TimepickerDialogComponent } from '../time-picker-dialog/time-picker-dialog.component'

let nextUniqueId = 0

export const TIME_PICKER_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  multi: true,
  useExisting: forwardRef(() => TimePickerInputComponent)
}
// DEPENDS ON (time-picker) then TEST (time-picker) with reactive forms

@Component({
  selector: 'cc-time-picker-input',
  host: { class: 'cc-time-picker-input' },
  styleUrls: ['./time-picker-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TIME_PICKER_CONTROL_VALUE_ACCESSOR],
  template: `
    <mat-form-field [ngStyle]="{ width: width }">
      <mat-label *ngIf="label">{{ label }}</mat-label>
      <input
        type="text"
        #inputEl
        matInput
        autocomplete="off"
        [attr.id]="idStr"
        [attr.name]="name"
        [attr.disabled]="disabled ? true : null"
        [placeholder]="placeholder"
        [attr.aria-label]="ariaLabel"
        (focus)="openPicker()"
        (click)="openPicker()"
        (blur)="blur()"
        (keydown.enter)="parseTime()"
        (keydown.tab)="parseTime()"
        (keydown.shift.tab)="closePicker()"
        cdkOverlayOrigin
        #pickerOrigin="cdkOverlayOrigin"
      />

      <button
        mat-icon-button
        matSuffix
        [attr.id]="idStr + '-trigger'"
        [disabled]="disabled"
      >
        <mat-icon>access_time</mat-icon>
      </button>
    </mat-form-field>
  `
})
export class TimePickerInputComponent implements OnInit, AfterViewInit {
  // Overlay Stuff
  pickerOverlayRef!: OverlayRef
  pickerRef!: ComponentRef<TimepickerDialogComponent>

  // simple @Input()s
  @Input() ariaLabel: string = 'time'
  @Input() label: string = 'Select a time'
  @Input() name: string = 'time-picker'
  @Input() placeholder: string = 'hh:mm am'
  @Input() @Boolish disabled: boolean = false

  // Must come before the time setter
  private _format: 12 | 24 = 12
  @Input()
  set format(format: 12 | 24) {
    this._format = format === 24 ? 24 : 12
  }
  get format(): 12 | 24 {
    return this._format
  }

  // bound value
  private _time$ = new BehaviorSubject<string>('')
  get time$(): Observable<string> {
    return this._time$.asObservable()
  }
  _time!: string
  @Input()
  set time(time: string) {
    // FIXME (time-picker) handle the format convertion
    this._time = time || ''
    this._time$.next(time || '')
    this.updateInputValue()
  }
  get time(): string {
    return this._time$.getValue()
  }
  @Output() timeChange: EventEmitter<string> = new EventEmitter()

  @Input()
  get idStr(): string {
    return this._id
  }
  set idStr(value: string) {
    this._id = value || this._uid
  }
  private _id!: string
  private _uid = `cc-time-picker-${nextUniqueId++}`

  // range is currently not implemented
  private _min!: Date
  @Input()
  set min(min: Date) {
    this._min = typeof min === 'string' ? (this._min = dateFromTime(min)) : min
  }
  get min(): Date {
    return this._min
  }

  private _max!: Date
  @Input()
  set max(max: Date) {
    this._max = typeof max === 'string' ? (this._max = dateFromTime(max)) : max
  }
  get max(): Date {
    return this._max
  }

  get inputVal(): string {
    return this.inputEl.nativeElement.value
  }
  set inputVal(val: string) {
    this.inputEl.nativeElement.value = val
  }

  @ViewChild('inputEl', { static: true }) inputEl!: ElementRef
  @ViewChild('pickerOrigin', { static: true }) pickerOrigin!: CdkOverlayOrigin

  // TODO (time-picker) get rid of this and redesign the api pof the component
  /**
   * @example
   * ```html
   *   <mat-form-field>
   *    <input ccTimePickerInput="picker1">
   *    <cc-time-picker #picker1></cc-time-picker>
   *   </mat-form-field>
   * ```
   */
  @Input()
  @HostBinding('style.width')
  width: string = '205px'

  constructor(
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef,
    private injector: Injector,
    private zone: NgZone,
    private cdr: ChangeDetectorRef
  ) {
    this.idStr = this.idStr
  }

  @HostListener('document:mousedown', ['$event'])
  onmousedown(event: MouseEvent): void {
    if (
      !this.pickerOrigin.elementRef.nativeElement.contains(event.target) &&
      !this.pickerOverlayRef.hostElement.contains(<Node>event.target)
    )
      this.closePicker()
  }

  @HostListener('document:keydown.Escape')
  closePicker(): void {
    this.pickerOverlayRef.detach()
  }

  ngOnInit(): void {
    /**
     * @see {@link https://stackblitz.com/edit/overlay-demo?file=app%2Fapp.module.ts Overlay Stackblitz}
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
        height: 'auto'
      })
    )
  }

  ngAfterViewInit(): void {
    this._time = this.inputEl.nativeElement.value
  }

  // used by the datetime-binder to make updates
  markForCheck(): void {
    this.cdr.markForCheck()
  }

  openPicker(): void {
    if (this.pickerOverlayRef.hasAttached()) return

    this.pickerRef = this.pickerOverlayRef.attach(
      new ComponentPortal(
        TimepickerDialogComponent,
        this.viewContainerRef,
        this.createInjector(<TimePickerData>{
          input: this,
          close: () => {
            this.reFocusTrigger()
            this.closePicker()
          },
          timeSet: (time: string) => {
            this.time = time
            this.writeValue(time)
          }
        })
      )
    )
  }

  blur(): void {
    this.onTouched()
    this.changeValue(this.inputVal)
  }

  reFocusTrigger(): void {
    if (this.pickerOverlayRef.hasAttached())
      onStable(this.zone, () => {
        const trigger = document.getElementById(`${this.idStr}-trigger`)
        if (trigger) trigger.focus()
      })
  }

  private createInjector(data: TimePickerData): PortalInjector {
    return new PortalInjector(
      this.injector,
      new WeakMap<any, any>([[TIME_PICKER_DATA, data]])
    )
  }

  parseTime(): void {
    this.time = this.inputVal
    this.onTouched()
    this.writeValue(this.inputVal)
    this.closePicker()
  }

  private updateInputValue(): void {
    this.inputVal = this.time
  }

  changeValue(value: string): void {
    if (this.time == value) return
    this.time = value
    this.time = value
  }

  writeValue(time: string): void {
    this.timeChange.emit(time)
    this.onChange(time)
  }

  registerOnChange(fn: (time: string) => void): void {
    this.onChange = fn
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled
  }

  onChange = (time: string): void => {}
  onTouched = (): void => {}
}
