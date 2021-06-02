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
import { merge, Observable, Subject, Subscription, throwError } from 'rxjs'
import { catchError, filter, first, tap } from 'rxjs/operators'
import { DsTimepickerContent } from './timepicker-content'
import { DsTimepickerInput } from './timepicker-input'

/** Injection token that determines the scroll handling while the calendar is open. */
export const CC_TIMEPICKER_SCROLL_STRATEGY = new InjectionToken<
  () => ScrollStrategy
>('cc-timepicker-scroll-strategy')

export const CC_TIMEPICKER_SCROLL_STRATEGY_FACTORY =
  (overlay: Overlay): (() => ScrollStrategy) =>
  () =>
    overlay.scrollStrategies.reposition()

export const CC_TIMEPICKER_SCROLL_STRATEGY_FACTORY_PROVIDER = {
  provide: CC_TIMEPICKER_SCROLL_STRATEGY,
  deps: [Overlay],
  useFactory: CC_TIMEPICKER_SCROLL_STRATEGY_FACTORY
}

@Component({
  selector: 'ds-timepicker',
  template: '',
  exportAs: 'ccTimepicker',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class DsTimepicker implements OnDestroy, CanColor {
  private _scrollStrategy: () => ScrollStrategy

  /** Subscription to value changes in the associated input element. */
  private _inputSubscription = Subscription.EMPTY

  /** A reference to the overlay when the calendar is opened as a popup. */
  private _popupRef: OverlayRef | null

  /** A reference to the dialog when the calendar is opened as a dialog. */
  private _dialogRef: MatDialogRef<DsTimepickerContent> | null

  /** Reference to the component instantiated in popup mode. */
  private _popupComponentRef: ComponentRef<DsTimepickerContent> | null

  /** The element that was focused before the timeepicker was opened. */
  private _focusedElementBeforeOpen: HTMLElement | null = null

  /** Emits new selected time when selected time changes. */
  private readonly _selectedChanged = new Subject<string>()

  get selectedChanged(): Observable<string> {
    return this._selectedChanged.asObservable()
  }

  @Input() defaultColor: ThemePalette = 'primary'

  /** Whether the timepicker pop-up should be disabled. */
  @Input()
  get disabled(): boolean {
    return this._disabled === undefined && this._timepickerInput
      ? this._timepickerInput.disabled
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

  /** Emits when the timepicker is disabled. */
  private readonly _disabledChange = new Subject<boolean>()

  /** The input element this timepicker is associated with. */
  _timepickerInput: DsTimepickerInput

  /** Reference to the datepicker that created the overlay. */
  datepicker: DsTimepicker

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

  /** Emits when the timepicker has been opened. */
  // eslint-disable-next-line @angular-eslint/no-output-rename
  @Output('opened') openedStream = new EventEmitter<void>()

  /** Emits when the timepicker has been closed. */
  // eslint-disable-next-line @angular-eslint/no-output-rename
  @Output('closed') closedStream = new EventEmitter<void>()

  /** Emits when an animation has finished. */
  private _animationDone = new Subject<void>()

  /** Whether the calendar is open. */
  @Input()
  get opened(): boolean {
    return this._opened
  }
  set opened(value: boolean) {
    value ? this.open() : this.close()
  }
  private _opened = false

  /** The currently selected time. */
  get _selected(): string | null {
    return this._validSelected
  }
  set _selected(value: string | null) {
    this._validSelected = value
  }
  private _validSelected: string | null = null

  /** Color palette to use on the timepicker's calendar. */
  @Input()
  get color(): ThemePalette {
    return (
      this._color ||
      (this._timepickerInput
        ? this._timepickerInput._getThemePalette()
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
    @Optional() @Inject(DOCUMENT) private _document: Document,
    @Inject(CC_TIMEPICKER_SCROLL_STRATEGY) scrollStrategy: () => ScrollStrategy,
    private _viewContainerRef: ViewContainerRef,
    @Optional() private _dir: Directionality,
    private _overlay: Overlay
  ) {
    this._scrollStrategy = scrollStrategy
  }

  ngOnDestroy(): void {
    this._destroyPopup()
    this.close()
    this._inputSubscription.unsubscribe()
    this._disabledChange.complete()
  }

  /**
   * @description Register an input with this timepicker.
   * @param input The timepicker input to register with this timepicker.
   */
  _registerInput(input: DsTimepickerInput): void {
    if (this._timepickerInput) {
      throw Error('A DsTimepicker can only be associated with a single input.')
    }
    this._timepickerInput = input
    this._inputSubscription = this._timepickerInput._valueChange
      .pipe(
        tap((value: string | null) => (this._selected = value)),
        catchError((e) => throwError(e))
      )
      .subscribe()
  }

  select(time: string): void {
    if (this._selected != time) {
      this._selectedChanged.next(time)
    }
    this._selected = time
  }

  /** Open the calendar. */
  open(): void {
    if (this._opened || this.disabled) {
      return
    }
    if (!this._timepickerInput) {
      throw Error('Attempted to open an DsTimepicker with no associated input.')
    }
    if (this._document) {
      this._focusedElementBeforeOpen = this._document
        .activeElement as HTMLElement
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
      instance.animationDone
        .pipe(
          first(),
          tap(() => this._destroyPopup()),
          catchError((e) => throwError(e))
        )
        .subscribe()
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
      // marked the timepicker as closed. If the event fires out of sequence and the element that
      // we're refocusing opens the timepicker on focus, the user could be stuck with not being
      // able to close the calendar at all. We work around it by making the logic, that marks
      // the timepicker as closed, async as well.
      this._focusedElementBeforeOpen.focus()
      setTimeout(completeClose)
    } else {
      completeClose()
    }
  }

  /** Open the calendar as a dialog. */
  private _openAsDialog(): void {
    // Usually this would be handled by `open` which ensures that we can only have one overlay
    // open at a time, however since we reset the variables in async handlers some overlays
    // may slip through if the user opens and closes multiple times in quick succession (e.g.
    // by holding down the enter key).
    if (this._dialogRef) {
      this._dialogRef.close()
    }

    this._dialogRef = this._dialog.open<DsTimepickerContent>(
      DsTimepickerContent,
      {
        direction: this._dir ? this._dir.value : 'ltr',
        viewContainerRef: this._viewContainerRef,
        panelClass: 'cc-timepicker-dialog',

        // These values are all the same as the defaults, but we set them explicitly so that the
        // timepicker dialog behaves consistently even if the user changed the defaults.
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

    this._dialogRef
      .afterClosed()
      .pipe(
        tap(() => this.close()),
        catchError((e) => throwError(e))
      )
      .subscribe()
    this._dialogRef.componentInstance.timepicker = this
    this._dialogRef.componentInstance.color = this.color
  }

  /** Open the calendar as a popup. */
  private _openAsPopup(): void {
    const portal = new ComponentPortal<DsTimepickerContent>(
      DsTimepickerContent,
      this._viewContainerRef
    )

    this._destroyPopup()
    this._createPopup()
    const ref = (this._popupComponentRef = this._popupRef.attach(portal))
    ref.instance.timepicker = this
    ref.instance.color = this.color

    // Update the position once the calendar has rendered.
    this._ngZone.onStable
      .asObservable()
      .pipe(
        first(),
        tap(() => this._popupRef.updatePosition()),
        catchError((e) => throwError(e))
      )
      .subscribe()
  }

  /** Create the popup. */
  private _createPopup(): void {
    const overlayConfig = new OverlayConfig({
      positionStrategy: this._createPopupPositionStrategy(),
      hasBackdrop: true,
      backdropClass: 'mat-overlay-transparent-backdrop',
      direction: this._dir,
      scrollStrategy: this._scrollStrategy(),
      panelClass: 'cc-timepicker-popup'
    })

    this._popupRef = this._overlay.create(overlayConfig)
    this._popupRef.overlayElement.setAttribute('role', 'dialog')

    merge(
      this._popupRef.backdropClick(),
      this._popupRef.detachments(),
      this._popupRef.keydownEvents().pipe(
        // Closing on alt + up is only valid when there's an input associated with the timeepicker.
        filter(
          (event) =>
            event.keyCode === ESCAPE ||
            (this._timepickerInput &&
              event.altKey &&
              event.keyCode === UP_ARROW)
        )
      )
    )
      .pipe(
        tap((event) => {
          if (event) event.preventDefault()
          this.close()
        }),
        catchError((e) => throwError(e))
      )
      .subscribe()
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
      .flexibleConnectedTo(this._timepickerInput.getConnectedOverlayOrigin())
      .withTransformOriginOn('.cc-timepicker-content')
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
