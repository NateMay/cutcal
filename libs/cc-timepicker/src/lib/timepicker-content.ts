import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core'
import { CanColor, CanColorCtor, mixinColor } from '@angular/material/core'
import { Subject } from 'rxjs'
import { CcTimepicker } from './timepicker'
import { ccTimepickerAnimations } from './timepicker-animations'

@Component({
  selector: 'cc-timpicker-face',
  template: 'face',
})
export class CcTimePickerFace {
  focusActiveCell() {}
}

/** Used to generate a unique ID for each timepicker instance. */
// const timepickerUid = 0

// Boilerplate for applying mixins to CcTimepickerContent.
class MatTimepickerContentBase {
  constructor(public _elementRef: ElementRef<any>) {}
}
const _CcTimepickerContentMixinBase: CanColorCtor &
  typeof MatTimepickerContentBase = mixinColor(MatTimepickerContentBase)

/**
 * Component used as the content for the timepicker dialog and popup. We use this instead of using
 * MatCalendar directly as the content so we can control the initial focus. This also gives us a
 * place to put additional features of the popup that are not part of the calendar itself in the
 * future. (e.g. confirmation buttons).
 */
@Component({
  selector: 'cc-timepicker-content',
  template: `
    <p>timepicker-content works!</p>
    <cc-timpicker-face></cc-timpicker-face>
  `,
  styleUrls: ['./timepicker-content.scss'],
  host: {
    class: 'cc-timepicker-content',
    '[@transformPanel]': '_animationState',
    '(@transformPanel.done)': '_animationDone.next()',
    '[class.cc-timepicker-content-touch]': 'timepicker.touchUi',
  },
  animations: [
    ccTimepickerAnimations.transformPanel,
    ccTimepickerAnimations.fadeInCalendar,
  ],
  exportAs: 'ccTimepickerContent',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  inputs: ['color'],
})
export class CcTimepickerContent extends _CcTimepickerContentMixinBase
  implements AfterViewInit, OnDestroy, CanColor {
  /** Reference to the internal calendar component. */
  @ViewChild(CcTimePickerFace) _calendar: CcTimePickerFace

  /** Reference to the timepicker that created the overlay. */
  timepicker: CcTimepicker

  /** Whether the timepicker is above or below the input. */
  _isAbove: boolean

  /** Current state of the animation. */
  _animationState: 'enter' | 'void' = 'enter'

  /** Emits when an animation has finished. */
  _animationDone = new Subject<void>()

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
