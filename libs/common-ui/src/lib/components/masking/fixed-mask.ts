import { Clipboard } from '@angular/cdk/clipboard'
import { coerceBooleanProperty } from '@angular/cdk/coercion'
import { DOCUMENT } from '@angular/common'
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  Inject,
  Injector,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  ViewEncapsulation
} from '@angular/core'
import {
  ControlValueAccessor,
  NgControl,
  NG_VALUE_ACCESSOR
} from '@angular/forms'
import { findLastIndex, get } from 'lodash'
import { fromEvent, merge, Observable, Subject } from 'rxjs'
import { takeUntil, tap } from 'rxjs/operators'
import { devError } from '../../functions/devError'
import { devWarn } from '../../functions/devWarn'
import { onStable } from '../../functions/onStable/onStable'
import { MaskingBase } from './masking-base'
import {
  CharChecker,
  CharCheckerMap,
  createMaskDigit,
  Digit,
  HIDER,
  isWritable,
  MASK_CHECKERS,
  MASK_SPECIALS,
  replaceAt
} from './masking.utils'

const FIXED_MASK_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CcFixedMask),
  multi: true
}

export type CcPredefinedMask = keyof CcPredefinedMasks

export interface CcPredefinedMasks {
  phone: string
  zipcode: string
  ssn: string
  partialSsn: string
  hiddenSsn: string
  creditCard: string
}

@Component({
  selector: 'cc-fixed-mask',
  template: `
    <ng-content></ng-content>
  `,
  providers: [FIXED_MASK_VALUE_ACCESSOR],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CcFixedMask extends MaskingBase
  implements ControlValueAccessor, OnDestroy, AfterContentInit, OnInit {
  static readonly Masks: CcPredefinedMasks = Object.freeze({
    phone: '(999) 999-9999',
    zipcode: '99999',
    ssn: '999-99-9999',
    partialSsn: '*9*9*9-*9*9-9999',
    hiddenSsn: '*9*9*9-*9*9-*9*9*9*9',
    creditCard: '9999 9999 9999 9999'
  })
  private unsub$ = new Subject<void>()

  private control: NgControl | null

  /**
   * @description value to bind to when not using the formControlName
   */
  @Input() set value(value: string | number | null) {
    this.isNumeric = typeof value === 'number'
    this._value = this.isNumeric ? value.toString() : value
    onStable(this.ngZone, () =>
      this.initalizeValueFromString(this._value as string)
    )
  }
  get value(): string | number | null {
    return this.control ? this.control.value : this._value
  }
  @Output() valueChange = new EventEmitter<string | number | null>()
  private _value: string | number | null
  private isNumeric: boolean

  /**
   * @description the underlying values in the selected range
   */
  private get selection(): string {
    return this.digits
      .slice(this.start, this.end)
      .filter(isWritable)
      .map(digit => digit.value)
      .join('')
  }

  // TODO confirm that this is working
  /**
   * @description disables the control and the <input>
   */
  @Input() set disabled(disabled: boolean) {
    if (this._disabled == disabled) return
    this._disabled = coerceBooleanProperty(disabled)
    // wait for the control so that the disabled state get registered
    onStable(this.ngZone, () => (this.inputEl.disabled = this._disabled))
  }
  get disabled(): boolean {
    return this._disabled
  }
  private _disabled: boolean = false

  /**
   * @description data structure for getting the digit checker
   * functions which confirm if a typed character is valid at a
   * given index.
   * // FEATURE: allow teams to register their own checkers
   */
  private checkers: CharCheckerMap = MASK_CHECKERS

  /**
   * @description character used to hide characters like a password
   * @example
   *   •••-••-7258
   */
  @Input() hider: '•' | '*' = HIDER

  // TODO implement reveal as setter
  /**
   * @description used to hide and reveal hidden characters
   */
  @Input() set reveal(reveal: boolean) {}
  private _reveal: boolean = false

  /**
   * @description dynamic masking / formatting pattern
   *
   * @example
   * ```html
   * <custom-mask [mask]="+^ (999) 999-9999">
   * '+1 (734) 432-6437'
   * ```
   *
   * The '*' modifier will hide any character after it
   *
   * @example
   * ```html
   * <custom-mask [mask]="*9*9*9-*9*9-9999">
   * '•••-••-7258'
   * ```
   *
   * @formatting
   * - 'a' = Lower Case Checker
   * - 'A' = Upper Case Checker
   * - '#' = Wildcard
   * - '^' = Non Zero Checker
   * - '9' = Numeric Checker (lower numbers denote a max value)
   * - '&' = Alpha Numeric
   *
   * These characters are reserved and will display uneditable in the <input>
   * - forward slash: /
   * - parenthesis:  ( )
   * - plus & minus: + -
   * - space: " "
   */
  @Input() set mask(mask: string) {
    const newMask = get(CcFixedMask.Masks, mask) || mask
    // eslint-disable-next-line no-useless-escape
    if (/^[aA#^&*0-9\/()+\- ]+$/.test(newMask)) this._mask = mask
    else {
      devError(
        'Invalid mask provided. Supported characters are: a A # ^ & * 0-9 / ( ) + -'
      )
      onStable(this.ngZone, () => this.unsub$.next())
    }
  }
  get mask(): string {
    return this._mask
  }
  private _mask: string = '(999) 999-9999'

  /**
   * @description facilitates the named masks
   * @example
   * ```html
   *  <cc-fixed-mask mask="partialSsnMasking">
   * ```
   */
  private get maskArray(): string[] {
    return this.maskLiteral.split('')
  }
  /**
   * @description mask string with out the hider modifiers '*'
   */
  private get effectiveMask(): string {
    return this.maskLiteral.replace(/\*/g, '')
  }

  private get maskLiteral(): string {
    return get(CcFixedMask.Masks, this._mask) || this._mask
  }

  /**
   * @description holds all relevant information for every character
   * position in the mask
   */
  private get digits(): Digit[] {
    if (!this._digits) throw new Error('[Cutcal] No mask was calculated')
    return [...this._digits]
  }
  private _digits: Digit[] = []

  private get firstAvailable(): number {
    return this.digits.findIndex(
      digit => digit.writable && digit.value === this.blank
    )
  }

  private get firstWritable(): number {
    return this.digits.findIndex(isWritable)
  }

  private get lastWritable(): number {
    return findLastIndex(this.digits, isWritable)
  }

  @Input() blank: '_' | ' ' = '_'
  /**
   * @description returns the formatting pattern with no values
   * @example "(___) ___-___"
   */
  private get formattedButBlank(): string {
    return this.digits
      .map((digit: Digit) => (digit.writable ? this.blank : digit.value))
      .join('')
  }

  constructor(
    private ngZone: NgZone,
    private injector: Injector,
    private renderer: Renderer2,
    private clipboard: Clipboard,
    @Inject(DOCUMENT) protected _document: Document
  ) {
    super(_document, renderer)
  }

  ngOnInit() {
    // TODO handle android case
    this.storeDitiData()

    // wait for the FormControl to instantiate
    onStable(this.ngZone, () => {
      try {
        this.control = this.injector.get(NgControl)
        if (this.control) this.initalizeValueFromControl()
      } catch {
        devWarn(`FormControl Not Found.`)
      }
    })
  }

  ngAfterContentInit() {
    this.ensureValidType()

    this.listenInput('keydown')
      .pipe(tap(this.handlePreventDefault), tap(this.handleKeyEvent))
      .subscribe()

    this.listenInput('focus')
      .pipe(tap(() => this.place(this.firstAvailable)))
      .subscribe()

    this.listenInput('blur')
      .pipe(tap(() => this.onTouched()))
      .subscribe()

    merge(fromEvent(this.inputEl, 'cut'), fromEvent(this.inputEl, 'copy'))
      .pipe(tap(this.copySelectionToClipboard), takeUntil(this.unsub$))
      .subscribe()
  }

  ngOnDestroy() {
    this.unsub$.next()
    this.unsub$.complete()
  }

  private storeDitiData(): void {
    for (let index = 0; index < this.maskArray.length; index++) {
      const isHidden = this.maskArray[index] === '*'
      const effectiveIndex = isHidden ? index + 1 : index
      const maskChar = this.maskArray[effectiveIndex]
      const isSpecial = MASK_SPECIALS.includes(maskChar)

      this._digits.push(
        createMaskDigit(
          index,
          isSpecial ? maskChar : '',
          !isSpecial,
          isHidden,
          this.getChecker(effectiveIndex)
        )
      )

      if (isHidden) index++ // skip forward 1 if it's a '*' (hidden modifier)
    }
  }

  private ensureValidType() {
    if (!['tel', 'text'].includes(this.inputEl.type)) {
      devError(
        `"${this.inputEl.type}" is an invalid <input> type for this mask. Only "text" & "tel" are valid. Changing to type="text" by default.`
      )
      this.renderer.setAttribute(this.inputEl, 'type', 'text')
    }
  }

  private initalizeValueFromControl() {
    let value = this.control.value
    this.isNumeric = typeof value === 'number'
    value = this.isNumeric ? value.toString() : value
    this.fillNextAvailable(value || '')
  }

  private initalizeValueFromString(initial: string): void {
    this.fillNextAvailable(initial)
  }

  /**
   * @description subscribe helper for input events
   */
  private listenInput(eventName: string): Observable<Event> {
    return fromEvent(this.inputEl, eventName).pipe(takeUntil(this.unsub$))
  }

  private handleKeyEvent = (event?: KeyboardEvent): void => {
    if (this.disabled) return

    const character: string = this.getChar(event)

    // check if it is a valid character for the current position
    if (this.digits[this.start]?.checker(character)) {
      this.place(this.nextWritable())
      return this.updateCharacter(character, this.start)
    }

    if (character == 'Backspace') {
      this.place(this.prevWritable())
      return this.updateCharacter(this.blank, this.prevWritable())
    }
    // TODO Delete

    switch (character) {
      case 'ArrowUp':
        return this.arrowUp(event)
      case 'ArrowDown':
        return this.arrowDown(event)
      case 'ArrowLeft':
        return this.arrowLeft(event)
      case 'ArrowRight':
        return this.arrowRight(event)
    }
  }

  private arrowUp(event: KeyboardEvent): void {
    event.shiftKey
      ? this.select(this.firstWritable, this.start)
      : this.place(this.firstWritable)
  }

  private arrowDown(event: KeyboardEvent): void {
    event.shiftKey
      ? this.select(this.start, this.lastWritable + 1)
      : this.place(this.effectiveMask.length)
  }

  private arrowLeft(event: KeyboardEvent): void {
    event.shiftKey
      ? this.select(this.prevWritable(), this.end)
      : this.place(this.prevWritable())
  }

  private arrowRight(event: KeyboardEvent): void {
    event.shiftKey
      ? this.select(this.start, this.nextWritable(this.end + 1))
      : this.place(this.nextWritable())
  }

  private updateCharacter(character: string, position: number): void {
    if (position > this.lastWritable) return
    const unmaskedValue = replaceAt(
      this.inputText,
      character || this.blank,
      position
    )
    this.digits[position].value = character
    this.inputText = this.applyHider(unmaskedValue)
    this.writeValue(this.getUnderlyingValue(unmaskedValue))
  }

  /**
   * @example
   * ```html
   * <cc-fixed-mask mask="*9*9*9-*9*9-*9*9*9*9">
   * '723-34-1236' => '•••-••-••••'
   * ```
   */
  private applyHider(unmaskedValue: string): string {
    // this.digitData.map(digit => digit.writable ? digit : )
    return unmaskedValue
      .split('')
      .map((char: string, index: number) => {
        const digit: Digit = this.digits[index]
        if (!digit.value) return this.blank
        else return this._reveal || !digit.hidden ? char : this.hider
      })
      .join('')
  }

  /**
   * @example
   * '723-34-1236' => '723341236'
   * @note converts to a number in writeValue() if needed
   */
  private getUnderlyingValue(unmaskedValue: string): string {
    return unmaskedValue
      .split('')
      .filter(
        (char: string, index: number) =>
          this.digits[index].writable && char !== this.blank
      )
      .join('')
  }

  // returns the digit checker at the given position
  private getChecker(cursorPos: number): CharChecker {
    const maskKey: string = this.effectiveMask.charAt(cursorPos)
    return this.checkers[maskKey]
  }

  // TODO use to initialize from control or value & for pasting
  /**
   * @description like handleCharacter(), but takes multiple characters
   */

  private fillNextAvailable(
    value: string,
    // index: number = 0,
    focus: boolean = false
  ) {
    this.digits.forEach(digit => {
      if (digit.writable) {
        digit.value = value.charAt(0) || this.blank
        value = value.substring(1)
      }
    })
    this.inputText = this.digits.map(digit => digit.value).join('')
    // true for paste
    if (focus) onStable(this.ngZone, () => this.place(this.firstAvailable))
  }

  private nextWritable(fromIndex: number = this.start + 1): number {
    const remaining: Digit[] = this.digits.splice(fromIndex)
    const nextWritable = remaining.find(isWritable)
    return Math.min(this.lastWritable, this.digits.indexOf(nextWritable))
  }

  private prevWritable(fromIndex: number = this.start): number {
    const remaining: Digit[] = this.digits.slice(0, fromIndex)
    return Math.max(this.firstWritable, findLastIndex(remaining, isWritable))
  }

  private copySelectionToClipboard = (event: ClipboardEvent) => {
    event.preventDefault()
    this.clipboard.copy(this.selection)
  }

  private deleteRange(start: number, end: number) {
    for (let i = start; i < end; i++) {
      const digit = this.digits[i]
      if (digit.writable) digit.value = this.blank
    }
  }

  /**
   * @category FORM BINDING METHODS
   * All methods below are required for the ValueControlAccessor interface
   * which is needed to work with the ReactiveForms Module
   */

  onChange = (value: string | number | null) => {}
  onTouched = () => {}

  // Update control value
  writeValue(strValue: string): void {
    // covert type to number if it was pass in that wat
    this._value = this.isNumeric ? parseInt(strValue, 10) : strValue
    this.valueChange.emit(this._value)
    // trigger control change events
    this.onChange(this._value)
  }

  // Enable the control to recognize changes
  registerOnChange(fn: (selection: any) => void): void {
    this.onChange = fn
  }

  // Enable control to recognize a touched state
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn
  }

  // Enable control to recognize a disabled state
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled
  }
}
