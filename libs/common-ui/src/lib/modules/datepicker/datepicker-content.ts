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
import { Subject } from 'rxjs'
import { CcDatepicker } from './datepicker'
import { ccDatepickerAnimations } from './datepicker-animations'

@Component({
  selector: 'cc-dateicker-face',
  template: 'face'
})
export class CcDatePickerFace {
  focusActiveCell() {}
}

/** Used to generate a unique ID for each datepicker instance. */
// const datepickerUid = 0

// Boilerplate for applying mixins to CcDatepickerContent.
class MatDatepickerContentBase {
  constructor(public readonly _elementRef: ElementRef) {}
}
const _CcDatepickerContentMixinBase: CanColorCtor &
  typeof MatDatepickerContentBase = mixinColor(MatDatepickerContentBase)

/**
 * Component used as the content for the datepicker dialog and popup. We use this instead of using
 * MatCalendar directly as the content so we can control the initial focus. This also gives us a
 * place to put additional features of the popup that are not part of the calendar itself in the
 * future. (e.g. confirmation buttons).
 */
@Component({
  selector: 'cc-datepicker-content',
  template: `
    <p>datepicker-content works!</p>
    <cc-dateicker-face></cc-dateicker-face>
  `,
  styleUrls: ['./datepicker-content.scss'],
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
export class CcDatepickerContent extends _CcDatepickerContentMixinBase
  implements AfterViewInit, OnDestroy, CanColor {
  /** Reference to the internal calendar component. */
  @ViewChild(CcDatePickerFace) _calendar: CcDatePickerFace

  /** Reference to the datepicker that created the overlay. */
  datepicker: CcDatepicker

  /** Whether the datepicker is above or below the input. */
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
