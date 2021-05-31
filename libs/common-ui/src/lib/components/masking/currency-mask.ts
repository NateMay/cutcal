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
  Provider,
  Renderer2,
  ViewEncapsulation
} from '@angular/core'
import {
  ControlValueAccessor,
  NgControl,
  NG_VALUE_ACCESSOR
} from '@angular/forms'
import { fromEvent, merge, Observable, Subject } from 'rxjs'
import { takeUntil, tap } from 'rxjs/operators'
import { devError } from '../../functions/devError'
import { devWarn } from '../../functions/devWarn'
import { onStable } from '../../functions/onStable/onStable'
import { MaskingBase } from './masking-base'
import { insertAt, numericChecker } from './masking.utils'

export type DsCurrenyDelimiter = '.' | ','

const CURRENCY_MASK_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DsCurrencyMask),
  multi: true
}

@Component({
  selector: 'ds-currency-mask',
  template: ` <ng-content></ng-content> `,
  providers: [CURRENCY_MASK_VALUE_ACCESSOR],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DsCurrencyMask
  extends MaskingBase
  implements ControlValueAccessor, OnDestroy, AfterContentInit, OnInit {
  private unsub$ = new Subject<void>()

  private control: NgControl | null

  /**
   * @description value to bind to when not using the formControlName
   */
  @Input() set value(value: number | null) {
    this._value = value
  }
  get value(): number | null {
    return this.control ? this.control.value as number : this._value
  }
  @Output() valueChange = new EventEmitter<number | null>()
  private _value: number | null

  /**
   * @description the underlying values in the selected range
   */
  private get selection(): number {
    return parseInt(
      this.inputText
        .slice(this.start, this.end)
        .replace('.', '')
        .replace(',', ''),
      10
    )
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

  @Input() format: 'american' | 'european' = 'american'

  private get decimalIndex(): number | null {
    return this.hasDecimal ? this.inputText.indexOf(this.decimalChar) : null
  }

  private get hasDecimal(): boolean {
    return this.inputText.includes(this.decimalChar)
  }

  private get decimalChar(): DsCurrenyDelimiter {
    return this.format === 'american' ? '.' : ','
  }

  private get thousandsSeparator(): DsCurrenyDelimiter {
    return this.format === 'american' ? ',' : '.'
  }

  private storedCharactersBeforeCursor: number
  private get charactersBeforeCursor(): number {
    const maskedBefore = this.inputText.substr(0, this.start)
    return maskedBefore.replace(new RegExp(this.thousandsSeparator, 'g'), '')
      .length
  }

  @Input() precision: number = 2
  private get isPrecisionLocked(): boolean {
    return this.hasDecimal && this.start > this.decimalIndex + this.precision
  }
  // @Input() strict: boolean = true

  constructor(
    private ngZone: NgZone,
    private injector: Injector,
    private renderer: Renderer2,
    private clipboard: Clipboard,
    @Inject(DOCUMENT) protected _document: Document
  ) {
    super(_document, renderer)
  }

  ngOnInit(): void {
    // TODO handle android case

    // wait for the FormControl to instantiate
    onStable(this.ngZone, () => {
      try {
        this.control = this.injector.get(NgControl)
        if (this.control) this.initalizeValueFromControl()
      } catch {
        devWarn(`FormControl Not Found`)
      }
    })
  }

  ngAfterContentInit(): void {
    this.ensureValidType()

    this.listenInput('keydown')
      .pipe(tap(this.handlePreventDefault), tap(this.handleKeyEvent))
      .subscribe()

    // this.listenInput('focus')
    //   .pipe(tap(() => this.place(this.firstAvailable)))
    //   .subscribe()

    this.listenInput('blur')
      .pipe(tap(() => this.onTouched()))
      .subscribe()

    merge(fromEvent(this.inputEl, 'cut'), fromEvent(this.inputEl, 'copy'))
      .pipe(tap(this.copySelectionToClipboard), takeUntil(this.unsub$))
      .subscribe()
  }

  ngOnDestroy(): void {
    this.unsub$.next()
    this.unsub$.complete()
  }

  private ensureValidType(): void {
    if (!['text'].includes(this.inputEl.type)) {
      devError(
        `"${this.inputEl.type}" is an invalid <input> type for this mask. Only "text" & "tel" are valid. Changing to type="text" by default.`
      )
      this.renderer.setAttribute(this.inputEl, 'type', 'text')
    }
  }

  private initalizeValueFromControl(): void {
    this.inputText = ''
    this.insert(this.control.value)
  }

  /**
   * @description subscribe helper for input events
   */
  private listenInput(eventName: string): Observable<Event> {
    return fromEvent(this.inputEl, eventName).pipe(takeUntil(this.unsub$))
  }

  private handleKeyEvent = (event?: KeyboardEvent): void => {
    if (this.disabled) return

    this.storedCharactersBeforeCursor = this.charactersBeforeCursor
    const character: string = this.getChar(event)
    event.preventDefault()

    if (this.isWritableChar(character)) {
      if (this.isPrecisionLocked) return

      if (numericChecker(character)) this.insert(character)
      else if (character == this.decimalChar) {
        if (this.hasDecimal) return
        else this.insert(character)
      }
      this.placeByRelativity(1)
    }

    if (character == 'Backspace') {
      if (this.start === 0) return
      // I have no idea why this hack is necessary - N8
      const offset = this.start === this.inputText.length ? 0 : -1
      this.backspace()
      this.placeByRelativity(offset)
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

  private isWritableChar(character: string): boolean {
    return numericChecker(character) || character === this.decimalChar
  }

  private arrowUp(event: KeyboardEvent): void {
    event.shiftKey ? this.select(0, this.start) : this.place(0)
  }

  private arrowDown(event: KeyboardEvent): void {
    event.shiftKey
      ? this.select(this.start, this.inputText.length)
      : this.place(this.inputText.length)
  }

  private arrowLeft(event: KeyboardEvent): void {
    event.shiftKey
      ? this.select(this.start - 1, this.end)
      : this.place(this.start - 1)
  }

  private arrowRight(event: KeyboardEvent): void {
    event.shiftKey
      ? this.select(this.start, this.end + 1)
      : this.place(this.start + 1)
  }

  private insert(incoming: string): void {
    // this may only require the first conditional
    const existing = this.isRange
      ? this.inputText.slice(this.start, this.end)
      : this.inputText

    const inserted = insertAt(
      existing,
      incoming,
      Math.min(this.start, this.end)
    )

    const stripped = inserted.replace(
      new RegExp(this.thousandsSeparator, 'g'),
      ''
    )

    // const value = parseFloat(stripped)
    this.inputText = this.applySeperators(stripped)
  }

  private backspace() {
    const removed =
      this.inputText.slice(0, this.start - 1) + this.inputText.slice(this.start)
    const stripped = removed.replace(
      new RegExp(this.thousandsSeparator, 'g'),
      ''
    )
    this.inputText = this.applySeperators(stripped)
  }

  private applySeperators(raw: string): string {
    const decimalIndex = raw.includes(this.decimalChar)
      ? raw.indexOf(this.decimalChar)
      : raw.length

    for (let index = decimalIndex; index >= 4; ) {
      index -= 3
      raw = insertAt(raw, this.thousandsSeparator, index)
    }
    return raw
  }

  private placeByRelativity(offset: -1 | 0 | 1 = 1) {
    let countDown = this.storedCharactersBeforeCursor
    let cursorPosition = 0
    this.inputText.split('').forEach((char: string, index: number) => {
      if (countDown > 0) {
        cursorPosition++
        if (this.isWritableChar(char)) countDown--
      }
    })
    this.place(cursorPosition + offset)
  }

  /**
   * @example
   * 1,234,534.34 => 1234534.34
   */
  private getUnderlyingValue(unmaskedValue: string): number {
    return parseInt(this.inputText.replace('.', '').replace(',', ''), 10)
  }

  private copySelectionToClipboard = (event: ClipboardEvent) => {
    event.preventDefault()
    this.clipboard.copy(this.selection.toString())
  }

  private deleteRange(start: number, end: number) {
    // for (let i = start; i < end; i++) {
    //   const digit = this.digits[i]
    //   if (digit.writable) digit.value = this.blank
    // }
  }

  /**
   * @category FORM BINDING METHODS
   * All methods below are required for the ValueControlAccessor interface
   * which is needed to work with the ReactiveForms Module
   */

  onChange = (value: unknown): void => {}
  onTouched = (): void => {}

  // Update control value
  writeValue(strValue: unknown): void {
    // covert type to number if it was pass in that wat
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
