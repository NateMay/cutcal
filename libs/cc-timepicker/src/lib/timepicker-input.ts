import { coerceBooleanProperty } from '@angular/cdk/coercion'
import { DOWN_ARROW } from '@angular/cdk/keycodes'
import {
  Directive,
  ElementRef,
  EventEmitter,
  forwardRef,
  Inject,
  Input,
  OnDestroy,
  Optional,
  Output,
  Provider
} from '@angular/core'
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  ValidatorFn,
  Validators
} from '@angular/forms'
import { ThemePalette } from '@angular/material/core'
import { MatFormField } from '@angular/material/form-field'
import { MAT_INPUT_VALUE_ACCESSOR } from '@angular/material/input'
import { Subscription } from 'rxjs'
import { DsTimepicker } from './timepicker'

export const CC_TIMEPICKER_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DsTimepickerInput),
  multi: true
}

export const MAT_TIMEPICKER_VALIDATORS: Provider = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => DsTimepickerInput),
  multi: true
}

/**
 * An event used for timepicker input and change events. We don't always have access to a native
 * input or change event because the event may have been triggered by the user clicking on the
 * calendar popup. For consistency, we always use DsTimepickerInputEvent instead.
 */
export class DsTimepickerInputEvent {
  /** The new value for the target timepicker input. */
  value: string | null

  constructor(
    /** Reference to the timeepicker input component that emitted the event. */
    public target: DsTimepickerInput,
    /** Reference to the native input element associated with the timepicker input. */
    public targetElement: HTMLElement
  ) {
    this.value = this.target.value
  }
}

@Directive({
  selector: 'input[ccTimepicker]',
  providers: [
    CC_TIMEPICKER_VALUE_ACCESSOR,
    MAT_TIMEPICKER_VALIDATORS,
    { provide: MAT_INPUT_VALUE_ACCESSOR, useExisting: DsTimepickerInput }
  ],
  host: {
    '[attr.aria-haspopup]': '_timepicker ? "dialog" : null',
    '[attr.aria-owns]': '(_timepicker?.opened && _timepicker.id) || null',
    '[disabled]': 'disabled',
    '(input)': '_onInput($event.target.value)',
    '(change)': '_onChange()',
    '(blur)': '_onBlur()',
    '(keydown)': '_onKeydown($event)'
  },
  exportAs: 'ccTimepickerInput'
})
export class DsTimepickerInput
  implements ControlValueAccessor, OnDestroy, Validator {
  /** Emits when the value changes (either due to user input or programmatic change). */
  _valueChange = new EventEmitter<string | null>()

  /** Emits when the disabled state has changed */
  _disabledChange = new EventEmitter<boolean>()

  private _timepickerSubscription = Subscription.EMPTY

  private _localeSubscription = Subscription.EMPTY

  /** The value of the input. */
  @Input()
  get value(): string | null {
    return this._value
  }
  set value(newTime: string | null) {
    const oldTime = this.value
    this._value = newTime
    if (oldTime != this._value) {
      this._valueChange.emit(newTime)
    }
  }
  private _value: string | null

  /** Emits when a `change` event is fired on this `<input>`. */
  @Output() readonly timeChange = new EventEmitter<DsTimepickerInputEvent>()

  /** Emits when an `input` event is fired on this `<input>`. */
  @Output() readonly timeInput = new EventEmitter<DsTimepickerInputEvent>()

  /** Emits when an `input` event is fired on this `<input>`. */
  @Output() readonly dateInput = new EventEmitter<DsTimepickerInputEvent>()

  @Input()
  set ccTimepicker(value: DsTimepicker) {
    if (!value) {
      return
    }

    this._timepicker = value
    this._timepicker._registerInput(this)
    this._timepickerSubscription.unsubscribe()

    this._timepickerSubscription = this._timepicker.selectedChanged.subscribe(
      (selected: string) => {
        this.value = selected
        this._cvaOnChange(selected)
        this._onTouched()
        this.timeInput.emit(
          new DsTimepickerInputEvent(this, this._elementRef.nativeElement)
        )
        this.timeChange.emit(
          new DsTimepickerInputEvent(this, this._elementRef.nativeElement)
        )
      }
    )
  }
  _timepicker: DsTimepicker

  /** Whether the timepicker-input is disabled. */
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

  /** Whether the last value set on the input was valid. */
  private _lastValueValid = false

  /** The combined form control validator for this input. */

  constructor(
    private _elementRef: ElementRef<HTMLInputElement>,
    @Optional() @Inject(MatFormField) private _formField: MatFormField
  ) {}

  ngOnDestroy() {
    this._timepickerSubscription.unsubscribe()
    this._localeSubscription.unsubscribe()
    this._valueChange.complete()
    this._disabledChange.complete()
  }

  registerOnValidatorChange(fn: () => void): void {
    this._validatorOnChange = fn
  }

  /** The form control validator for whether the input parses. */
  private _parseValidator: ValidatorFn = (): ValidationErrors | null =>
    this._lastValueValid
      ? null
      : { ccTimepickerParse: { text: this._elementRef.nativeElement.value } }


  // eslint-disable-next-line @typescript-eslint/member-ordering
  private _validator: ValidatorFn | null = Validators.compose([
    this._parseValidator
  ])

  validate(c: AbstractControl): ValidationErrors | null {
    return this._validator ? this._validator(c) : null
  }

  /**
   * @deprecated breaking-change 8.0.0 Use `getConnectedOverlayOrigin` instead
   */
  getPopupConnectionElementRef(): ElementRef<any> {
    return this.getConnectedOverlayOrigin()
  }

  _onTouched = () => {}

  private _cvaOnChange: (value: any) => void = () => {}

  private _validatorOnChange = () => {}

  // Implemented as part of ControlValueAccessor.
  registerOnChange(fn: (value: any) => void): void {
    this._cvaOnChange = fn
  }

  // Implemented as part of ControlValueAccessor.
  registerOnTouched(fn: () => void): void {
    this._onTouched = fn
  }

  // Implemented as part of ControlValueAccessor.
  writeValue(value: string): void {
    this.value = value
  }

  /**
   * @description Gets the element that the timepicker popup should be connected to.
   * @returns The element to connect the popup to.
   */
  getConnectedOverlayOrigin(): ElementRef {
    return this._formField
      ? this._formField.getConnectedOverlayOrigin()
      : this._elementRef
  }

  _onKeydown(event: KeyboardEvent) {
    const isAltDownArrow = event.altKey && event.keyCode === DOWN_ARROW

    if (
      this._timepicker &&
      isAltDownArrow &&
      !this._elementRef.nativeElement.readOnly
    ) {
      this._timepicker.open()
      event.preventDefault()
    }
  }

  _onInput(value: string) {
    const lastValueWasValid = this._lastValueValid

    if (this._value != value) {
      this.dateInput.emit(
        new DsTimepickerInputEvent(this, this._elementRef.nativeElement)
      )
    } else if (lastValueWasValid !== this._lastValueValid) {
      this._validatorOnChange()
    }
  }

  _onChange() {
    this.timeChange.emit(
      new DsTimepickerInputEvent(this, this._elementRef.nativeElement)
    )
  }

  /** Returns the palette used by the input's form field, if any. */
  _getThemePalette(): ThemePalette {
    return this._formField ? this._formField.color : undefined
  }

  /** Handles blur events on the input. */
  _onBlur() {
    // Reformat the input only if we have a valid value.
    if (this.value) {
      this._formatValue(this.value)
    }

    this._onTouched()
  }

  /** Formats a value and sets it on the input element. */
  private _formatValue(value: string | null) {
    this._elementRef.nativeElement.value = value
  }
}
