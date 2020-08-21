import { DOCUMENT } from '@angular/common'
import {
  ContentChild,
  Directive,
  ElementRef,
  Inject,
  Renderer2
} from '@angular/core'

/**
 * @description If we could query from the <input> directly then
 * we wouldn't need this, but we do need a reference to the nativeElement
 */
@Directive({
  selector: 'input[ccMaskedInput]'
})
export class CcMaskedInput {
  constructor(public readonly input: ElementRef<HTMLInputElement>) {}
}

/**
 * @description base class with <input> helpers
 * Masking wrapper compoent should extend this base class
 */
@Directive()
export class MaskingBase {
  /**
   * @description reference to the <input> (via the CcMaskedInput) I
   * couldn't succefully query for the <input>, so this was my only
   * option. Perhaps this can be revistited to allow masking without
   * the a directive like CcMaskedInput to get the <input>
   */
  @ContentChild(CcMaskedInput) protected inputDir: CcMaskedInput

  protected get inputEl(): HTMLInputElement {
    if (!this.inputDir)
      throw new Error('masking requires a CcMaskedInput as a child')
    return this.inputDir.input.nativeElement
  }

  protected set inputText(str: string) {
    this.inputEl.value = str
  }

  protected get inputText(): string {
    return this.inputEl.value
  }

  /**
   * @description <input> cursor start index
   */
  get start(): number {
    return this.inputEl.selectionStart || 0
  }

  /**
   * @description <input> cursor end index
   */
  get end(): number {
    return this.inputEl.selectionEnd || 0
  }

  /**
   * @description whether or not a cursor range is selected
   */
  get isRange(): boolean {
    return this.start !== this.end
  }

  constructor(
    @Inject(DOCUMENT) protected _document: Document,
    private _renderer: Renderer2
  ) {}

  handlePreventDefault = (event?: KeyboardEvent): void => {
    const isModified = [event.metaKey, event.altKey].includes(true)
    const character: string = this.getChar(event)
    if (character !== 'Tab' && !isModified) event.preventDefault()
  }

  // TODO modify as needed based on platform
  /**
   * @description returns the character key | 'a', 5, 'Backspace', etc.
   * This is here to handle future browser idiosyncracies or event types
   */
  getChar(event: KeyboardEvent): string {
    switch (event.type) {
      case 'keydown':
        return event.key
    }
  }

  /**
   * @description Sets the <input>'s cursor range. The <input>'s
   * caret-color is temporarily made transarent to hide the flickering
   * related to the cursor jumping to the end of the new input value
   */
  public select(start: number, end: number): void {
    if (this._document.activeElement === this.inputEl) {
      this._renderer.setStyle(this.inputEl, 'caret-color', 'transparent')
      setTimeout(() => {
        this.inputEl.setSelectionRange(start, end)
        this._renderer.setStyle(this.inputEl, 'caret-color', 'inherit')
      })
    }
  }

  /**
   * @description Sets the <input>'s single point cursor position
   */
  public place(position: number): void {
    this.select(position, position)
  }
}
