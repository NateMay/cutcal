import { coerceBooleanProperty } from '@angular/cdk/coercion'
import {
  Directive,
  ElementRef,
  EventEmitter,
  forwardRef,
  Inject,
  Input,
  OnInit,
  Optional,
  Output
} from '@angular/core'
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms'
import { ThemePalette } from '@angular/material/core'
import { MatFormField } from '@angular/material/form-field'
import { MAT_INPUT_VALUE_ACCESSOR } from '@angular/material/input'
import { Subscription } from 'rxjs'
import { CcDatepicker } from './datepicker'

export const CC_DATEPICKER_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CcDatepickerInput),
  multi: true
}

export const MAT_DATEPICKER_VALIDATORS: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => CcDatepickerInput),
  multi: true
}

/**
 * An event used for datepicker input and change events. We don't always have access to a native
 * input or change event because the event may have been triggered by the user clicking on the
 * calendar popup. For consistency, we always use MatDatepickerInputEvent instead.
 */
export class CcDatepickerInputEvent {
  /** The new value for the target datepicker input. */
  value: string | null

  constructor(
    /** Reference to the dateepicker input component that emitted the event. */
    public target: CcDatepickerInput,
    /** Reference to the native input element associated with the datepicker input. */
    public targetElement: HTMLElement
  ) {
    this.value = this.target.value
  }
}

@Directive({
  selector: 'input[ccDatepicker]',
  providers: [
    CC_DATEPICKER_VALUE_ACCESSOR,
    MAT_DATEPICKER_VALIDATORS,
    { provide: MAT_INPUT_VALUE_ACCESSOR, useExisting: CcDatepickerInput }
  ],
  host: {
    '[attr.aria-haspopup]': '_datepicker ? "dialog" : null',
    '[attr.aria-owns]': '(_datepicker?.opened && _datepicker.id) || null',
    '[disabled]': 'disabled',
    '(input)': '_onInput($event.target.value)',
    '(change)': '_onChange()',
    '(blur)': '_onBlur()',
    '(keydown)': '_onKeydown($event)'
  },
  exportAs: 'ccDatepickerInput'
})
export class CcDatepickerInput implements OnInit {
  /** Emits when the value changes (either due to user input or programmatic change). */
  _valueChange = new EventEmitter<string | null>()

  /** Emits when the disabled state has changed */
  _disabledChange = new EventEmitter<boolean>()

  private _datepickerSubscription = Subscription.EMPTY

  private _localeSubscription = Subscription.EMPTY

  /** The value of the input. */
  @Input()
  get value(): string | null {
    return this._value
  }
  set value(newDate: string | null) {
    const oldDate = this.value
    this._value = newDate
    if (oldDate != this._value) {
      this._valueChange.emit(newDate)
    }
  }
  private _value: string | null

  /** Emits when a `change` event is fired on this `<input>`. */
  @Output() readonly dateChange: EventEmitter<
    CcDatepickerInputEvent
  > = new EventEmitter<CcDatepickerInputEvent>()

  /** Emits when an `input` event is fired on this `<input>`. */
  @Output() readonly dateInput: EventEmitter<
    CcDatepickerInputEvent
  > = new EventEmitter<CcDatepickerInputEvent>()

  @Input()
  set ccDatepicker(value: CcDatepicker) {
    if (!value) {
      return
    }

    this._datepicker = value
    this._datepicker._registerInput(this)
    this._datepickerSubscription.unsubscribe()

    this._datepickerSubscription = this._datepicker.selectedChanged.subscribe(
      (selected: string) => {
        this.value = selected
        this._cvaOnChange(selected)
        this._onTouched()
        this.dateInput.emit(
          new CcDatepickerInputEvent(this, this._elementRef.nativeElement)
        )
        this.dateChange.emit(
          new CcDatepickerInputEvent(this, this._elementRef.nativeElement)
        )
      }
    )
  }
  _datepicker: CcDatepicker

  /** Whether the datepicker-input is disabled. */
  @Input()
  get disabled(): boolean {
    return !!this._disabled
  }
  set disabled(value: boolean) {
    const newValue = coerceBooleanProperty(value)
    const element = this._elementRef.nativeElement

    if (this._disabled !== newValue) {
      this._disabled = newValue
      this._disabledChange.emit(newValue)
    }

    // We need to null check the `blur` method, because it's undefined during SSR.
    if (newValue && element.blur) {
      // Normally, native input elements automatically blur if they turn disabled. This behavior
      // is problematic, because it would mean that it triggers another change detection cycle,
      // which then causes a changed after checked error if the input element was focused before.
      element.blur()
    }
  }
  private _disabled: boolean

  constructor(
    private _elementRef: ElementRef<HTMLInputElement>,
    @Optional() @Inject(MatFormField) private _formField: MatFormField
  ) {}

  ngOnInit() {}

  _onTouched = () => {}

  private _cvaOnChange: (value: any) => void = () => {}

  private _validatorOnChange = () => {}

  /** Returns the palette used by the input's form field, if any. */
  _getThemePalette(): ThemePalette {
    return this._formField ? this._formField.color : undefined
  }

  /**
   * @description Gets the element that the datepicker popup should be connected to.
   * @returns The element to connect the popup to.
   */
  getConnectedOverlayOrigin(): ElementRef {
    return this._formField
      ? this._formField.getConnectedOverlayOrigin()
      : this._elementRef
  }
}
