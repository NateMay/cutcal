import { Directionality } from '@angular/cdk/bidi'
import { coerceBooleanProperty } from '@angular/cdk/coercion'
import { ESCAPE, UP_ARROW } from '@angular/cdk/keycodes'
import {
  Overlay,
  OverlayConfig,
  OverlayRef,
  PositionStrategy,
  ScrollStrategy
} from '@angular/cdk/overlay'
import { ComponentPortal } from '@angular/cdk/portal'
import { DOCUMENT } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  EventEmitter,
  Inject,
  InjectionToken,
  Input,
  NgZone,
  OnDestroy,
  Optional,
  Output,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core'
import { CanColor, ThemePalette } from '@angular/material/core'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { merge, Subject, Subscription } from 'rxjs'
import { filter, first } from 'rxjs/operators'
import { CcDatepickerContent } from './datepicker-content'
import { CcDatepickerInput } from './datepicker-input'

/** Injection token that determines the scroll handling while the calendar is open. */
export const CC_DATEPICKER_SCROLL_STRATEGY = new InjectionToken<
  () => ScrollStrategy
>('cc-datepicker-scroll-strategy')

export const CC_DATEPICKER_SCROLL_STRATEGY_FACTORY = (
  overlay: Overlay
): (() => ScrollStrategy) => () => overlay.scrollStrategies.reposition()

export const CC_DATEPICKER_SCROLL_STRATEGY_FACTORY_PROVIDER = {
  provide: CC_DATEPICKER_SCROLL_STRATEGY,
  deps: [Overlay],
  useFactory: CC_DATEPICKER_SCROLL_STRATEGY_FACTORY
}

@Component({
  selector: 'cc-datepicker',
  template: '',
  exportAs: 'ccDatepicker',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class CcDatepicker implements OnDestroy, CanColor {
  private _scrollStrategy: () => ScrollStrategy

  /** Subscription to value changes in the associated input element. */
  private _inputSubscription = Subscription.EMPTY

  /** A reference to the overlay when the calendar is opened as a popup. */
  private _popupRef: OverlayRef | null

  /** A reference to the dialog when the calendar is opened as a dialog. */
  private _dialogRef: MatDialogRef<CcDatepickerContent> | null

  /** Reference to the component instantiated in popup mode. */
  private _popupComponentRef: ComponentRef<CcDatepickerContent> | null

  /** The element that was focused before the dateepicker was opened. */
  private _focusedElementBeforeOpen: HTMLElement | null = null

  /** Emits new selected date when selected date changes. */
  readonly _selectedChanged = new Subject<string>()

  /** Whether the datepicker pop-up should be disabled. */
  @Input()
  get disabled(): boolean {
    return this._disabled === undefined && this._datepickerInput
      ? this._datepickerInput.disabled
      : !!this._disabled
  }
  set disabled(value: boolean) {
    const newValue = coerceBooleanProperty(value)

    if (newValue !== this._disabled) {
      this._disabled = newValue
      this._disabledChange.next(newValue)
    }
  }
  private _disabled: boolean

  /** Emits when the datepicker is disabled. */
  readonly _disabledChange = new Subject<boolean>()

  /** The input element this datepicker is associated with. */
  _datepickerInput: CcDatepickerInput

  /** Reference to the datepicker that created the overlay. */
  datepicker: CcDatepicker

  /**
   * Whether the calendar UI is in touch mode. In touch mode the calendar opens in a dialog rather
   * than a popup and elements have more padding to allow for bigger touch targets.
   */
  @Input()
  get touchUi(): boolean {
    return this._touchUi
  }
  set touchUi(value: boolean) {
    this._touchUi = coerceBooleanProperty(value)
  }
  private _touchUi = false

  /** Emits when the datepicker has been opened. */
  // tslint:disable-next-line: no-output-rename
  @Output('opened') openedStream: EventEmitter<void> = new EventEmitter<void>()

  /** Emits when the datepicker has been closed. */
  // tslint:disable-next-line: no-output-rename
  @Output('closed') closedStream: EventEmitter<void> = new EventEmitter<void>()

  /** Emits when an animation has finished. */
  _animationDone = new Subject<void>()

  /** Whether the calendar is open. */
  @Input()
  get opened(): boolean {
    return this._opened
  }
  set opened(value: boolean) {
    value ? this.open() : this.close()
  }
  private _opened = false

  /** The currently selected date. */
  get _selected(): string | null {
    return this._validSelected
  }
  set _selected(value: string | null) {
    this._validSelected = value
  }
  private _validSelected: string | null = null

  /** Color palette to use on the datepicker's calendar. */
  @Input()
  get color(): ThemePalette {
    return (
      this._color ||
      (this._datepickerInput
        ? this._datepickerInput._getThemePalette()
        : undefined)
    )
  }
  set color(value: ThemePalette) {
    this._color = value
  }
  _color: ThemePalette

  /** Current state of the animation. */
  _animationState: 'enter' | 'void' = 'enter'

  constructor(
    private _dialog: MatDialog,
    private _ngZone: NgZone,
    @Optional() @Inject(DOCUMENT) private _document: any,
    @Inject(CC_DATEPICKER_SCROLL_STRATEGY) scrollStrategy: any,
    private _viewContainerRef: ViewContainerRef,
    @Optional() private _dir: Directionality,
    private _overlay: Overlay
  ) {
    this._scrollStrategy = scrollStrategy
  }

  ngOnDestroy() {
    this._destroyPopup()
    this.close()
    this._inputSubscription.unsubscribe()
    this._disabledChange.complete()
  }

  /**
   * @description Register an input with this datepicker.
   * @param input The datepicker input to register with this datepicker.
   */
  _registerInput(input: CcDatepickerInput): void {
    if (this._datepickerInput) {
      throw Error('A CcDatepicker can only be associated with a single input.')
    }
    this._datepickerInput = input
    this._inputSubscription = this._datepickerInput._valueChange.subscribe(
      (value: string | null) => (this._selected = value)
    )
  }

  select(date: string): void {
    if (this._selected != date) {
      this._selectedChanged.next(date)
    }
    this._selected = date
  }

  /** Open the calendar. */
  open(): void {
    if (this._opened || this.disabled) {
      return
    }
    if (!this._datepickerInput) {
      throw Error('Attempted to open an CcDatepicker with no associated input.')
    }
    if (this._document) {
      this._focusedElementBeforeOpen = this._document.activeElement
    }

    this.touchUi ? this._openAsDialog() : this._openAsPopup()
    this._opened = true
    this.openedStream.emit()
  }

  /** Close the calendar. */
  close(): void {
    if (!this._opened) {
      return
    }
    if (this._popupComponentRef && this._popupRef) {
      const instance = this._popupComponentRef.instance
      instance._startExitAnimation()
      instance._animationDone
        .pipe(first())
        .subscribe(() => this._destroyPopup())
    }
    if (this._dialogRef) {
      this._dialogRef.close()
      this._dialogRef = null
    }

    const completeClose = () => {
      // The `_opened` could've been reset already if
      // we got two events in quick succession.
      if (this._opened) {
        this._opened = false
        this.closedStream.emit()
        this._focusedElementBeforeOpen = null
      }
    }

    if (
      this._focusedElementBeforeOpen &&
      typeof this._focusedElementBeforeOpen.focus === 'function'
    ) {
      // Because IE moves focus asynchronously, we can't count on it being restored before we've
      // marked the datepicker as closed. If the event fires out of sequence and the element that
      // we're refocusing opens the datepicker on focus, the user could be stuck with not being
      // able to close the calendar at all. We work around it by making the logic, that marks
      // the datepicker as closed, async as well.
      this._focusedElementBeforeOpen.focus()
      setTimeout(completeClose)
    } else {
      completeClose()
    }
  }

  /** Open the calendar as a dialog. */
  private _openAsDialog(): void {
    // Usually this would be handled by `open` which ensures that we can only have one overlay
    // open at a date, however since we reset the variables in async handlers some overlays
    // may slip through if the user opens and closes multiple dates in quick succession (e.g.
    // by holding down the enter key).
    if (this._dialogRef) {
      this._dialogRef.close()
    }

    this._dialogRef = this._dialog.open<CcDatepickerContent>(
      CcDatepickerContent,
      {
        direction: this._dir ? this._dir.value : 'ltr',
        viewContainerRef: this._viewContainerRef,
        panelClass: 'cc-datepicker-dialog',

        // These values are all the same as the defaults, but we set them explicitly so that the
        // datepicker dialog behaves consistently even if the user changed the defaults.
        hasBackdrop: true,
        disableClose: false,
        width: '',
        height: '',
        minWidth: '',
        minHeight: '',
        maxWidth: '80vw',
        maxHeight: '',
        position: {},
        autoFocus: true,
        restoreFocus: true
      }
    )

    this._dialogRef.afterClosed().subscribe(() => this.close())
    this._dialogRef.componentInstance.datepicker = this
    this._dialogRef.componentInstance.color = this.color
  }

  /** Open the calendar as a popup. */
  private _openAsPopup(): void {
    const portal = new ComponentPortal<CcDatepickerContent>(
      CcDatepickerContent,
      this._viewContainerRef
    )

    this._destroyPopup()
    this._createPopup()
    const ref = (this._popupComponentRef = this._popupRef.attach(portal))
    ref.instance.datepicker = this
    ref.instance.color = this.color

    // Update the position once the calendar has rendered.
    this._ngZone.onStable
      .asObservable()
      .pipe(first())
      .subscribe(() => {
        this._popupRef.updatePosition()
      })
  }

  /** Create the popup. */
  private _createPopup(): void {
    const overlayConfig = new OverlayConfig({
      positionStrategy: this._createPopupPositionStrategy(),
      hasBackdrop: true,
      backdropClass: 'mat-overlay-transparent-backdrop',
      direction: this._dir,
      scrollStrategy: this._scrollStrategy(),
      panelClass: 'cc-datepicker-popup'
    })

    this._popupRef = this._overlay.create(overlayConfig)
    this._popupRef.overlayElement.setAttribute('role', 'dialog')

    merge(
      this._popupRef.backdropClick(),
      this._popupRef.detachments(),
      this._popupRef.keydownEvents().pipe(
        // Closing on alt + up is only valid when there's an input associated with the dateepicker.
        filter(
          event =>
            event.keyCode === ESCAPE ||
            (this._datepickerInput &&
              event.altKey &&
              event.keyCode === UP_ARROW)
        )
      )
    ).subscribe(event => {
      if (event) {
        event.preventDefault()
      }

      this.close()
    })
  }

  /** Destroys the current popup overlay. */
  private _destroyPopup() {
    if (this._popupRef) {
      this._popupRef.dispose()
      this._popupRef = this._popupComponentRef = null
    }
  }

  /** Create the popup PositionStrategy. */
  private _createPopupPositionStrategy(): PositionStrategy {
    return this._overlay
      .position()
      .flexibleConnectedTo(this._datepickerInput.getConnectedOverlayOrigin())
      .withTransformOriginOn('.cc-datepicker-content')
      .withFlexibleDimensions(false)
      .withViewportMargin(8)
      .withLockedPosition()
      .withPositions([
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top'
        },
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'bottom'
        },
        {
          originX: 'end',
          originY: 'bottom',
          overlayX: 'end',
          overlayY: 'top'
        },
        {
          originX: 'end',
          originY: 'top',
          overlayX: 'end',
          overlayY: 'bottom'
        }
      ])
  }
}
