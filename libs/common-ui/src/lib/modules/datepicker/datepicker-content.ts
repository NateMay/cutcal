import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  ViewEncapsulation
} from '@angular/core'
import { CanColor, CanColorCtor, mixinColor } from '@angular/material/core'
import { Observable, Subject } from 'rxjs'
import { DsDatepicker } from './datepicker'
import { ccDatepickerAnimations } from './datepicker-animations'

@Component({
  selector: 'ds-dateicker-face',
  template: 'face'
})
export class DsDatePickerFace {
  focusActiveCell() {}
}

/** Used to generate a unique ID for each datepicker instance. */
// const datepickerUid = 0

// Boilerplate for applying mixins to DsDatepickerContent.
class MatDatepickerContentBase {
  constructor(public readonly _elementRef: ElementRef) {}
}
const _DsDatepickerContentMixinBase: CanColorCtor &
  typeof MatDatepickerContentBase = mixinColor(MatDatepickerContentBase)

/**
 * Component used as the content for the datepicker dialog and popup. We use this instead of using
 * MatCalendar directly as the content so we can control the initial focus. This also gives us a
 * place to put additional features of the popup that are not part of the calendar itself in the
 * future. (e.g. confirmation buttons).
 */
@Component({
  selector: 'ds-datepicker-content',
  template: `
    <p>datepicker-content works!</p>
    <ds-dateicker-face></ds-dateicker-face>
  `,
  host: {
    class: 'cc-datepicker-content',
    '[@transformPanel]': '_animationState',
    '(@transformPanel.done)': '_animationDone.next()',
    '[class.cc-datepicker-content-touch]': 'datepicker.touchUi'
  },
  animations: [
    ccDatepickerAnimations.transformPanel,
    ccDatepickerAnimations.fadeInCalendar
  ],
  exportAs: 'ccDatepickerContent',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  inputs: ['color']
})
export class DsDatepickerContent
  extends _DsDatepickerContentMixinBase
  implements AfterViewInit, OnDestroy, CanColor {
  /** Reference to the internal calendar component. */
  @ViewChild(DsDatePickerFace) _calendar: DsDatePickerFace

  /** Reference to the datepicker that created the overlay. */
  datepicker: DsDatepicker

  /** Whether the datepicker is above or below the input. */
  _isAbove: boolean

  /** Current state of the animation. */
  _animationState: 'enter' | 'void' = 'enter'

  /** Emits when an animation has finished. */
  private _animationDone = new Subject<void>()

  get animationDone(): Observable<void> {
    return this._animationDone.asObservable()
  }
  constructor(
    elementRef: ElementRef,
    /**
     * @deprecated `_changeDetectorRef` parameter to become required.
     */
    private _changeDetectorRef?: ChangeDetectorRef
  ) {
    super(elementRef)
  }

  ngAfterViewInit() {
    this._calendar.focusActiveCell()
  }

  ngOnDestroy() {
    this._animationDone.complete()
  }

  _startExitAnimation() {
    this._animationState = 'void'

    // @breaking-change 11.0.0 Remove null check for `_changeDetectorRef`.
    if (this._changeDetectorRef) {
      this._changeDetectorRef.markForCheck()
    }
  }
}
