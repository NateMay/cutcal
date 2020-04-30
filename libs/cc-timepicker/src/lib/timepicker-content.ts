import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
import { CanColor, CanColorCtor, mixinColor } from '@angular/material/core';
import { dateFromTime } from '@cutcal/common';
import { Subject } from 'rxjs';
import { CcTimepicker } from './timepicker';
import { ccTimepickerAnimations } from './timepicker-animations';
import { ClockFaceTime, DEFAULT_HOUR, DEFAULT_MINUTE, TimePeriod, TimeUnit } from './timepicker-utils';

@Component({
  selector: 'cc-timepicker-dialog',
  host: { class: 'cc-timepicker-dialog' },
  template: `
    <cc-timepicker-controls></cc-timepicker-controls>

    <ng-container [ngSwitch]="activeTimeUnit">
      <div *ngSwitchCase="timeUnit.HOUR">
        <cc-timepicker-24-hours-face
          *ngIf="format === 24; else ampmHours"
          (hourChange)="onHourChange($event)"
          [selectedHour]="selectedHour"
          [format]="format"
          (hourSelected)="onHourSelected($event)"
        ></cc-timepicker-24-hours-face>

        <ng-template #ampmHours>
          <cc-timepicker-12-hours-face
            (hourChange)="onHourChange($event)"
            [selectedHour]="selectedHour"
            [period]="selectedPeriod"
            (hourSelected)="onHourSelected($event)"
          ></cc-timepicker-12-hours-face>
        </ng-template>
      </div>

      <cc-timepicker-minutes-face
        *ngSwitchCase="timeUnit.MINUTE"
        [selectedMinute]="selectedMinute"
        [selectedHour]="selectedHour?.time"
        [format]="format"
        [period]="selectedPeriod"
        [minutesGap]="minutesGap"
        (minuteChange)="onMinuteChange($event)"
      ></cc-timepicker-minutes-face>
    </ng-container>
  `
})
export class CcTimePickerDialog {

  selectedHour: ClockFaceTime
  selectedMinute: ClockFaceTime
  selectedPeriod: TimePeriod

  timeUnit = TimeUnit
  activeTimeUnit = TimeUnit.HOUR

  @ViewChild('hour') hourInput: ElementRef<HTMLInputElement>

  format = 12

  private _minutesGap: number
  @Input() set minutesGap(gap: number | null) {
    if (gap == null) return
    gap = Math.floor(gap)
    this._minutesGap = gap <= 59 ? gap : 1
  }
  get minutesGap(): number | null {
    return this._minutesGap
  }

  constructor() {
    // TODO (tp) pass in default time
    this.setDefaultTime('10:30 pm')
  }

  setDefaultTime(time: string): void {
    const defaultTime = dateFromTime(time)
    if (defaultTime) {
      const period = time.substr(time.length - 2).toUpperCase()
      const hour = formatHourByPeriod(
        defaultTime.getHours(),
        period as TimePeriod
      )
      const minutes = defaultTime.getMinutes()
      this.selectedHour = { ...DEFAULT_HOUR, time: hour, angle: hour * 30 }
      this.selectedMinute = {
        ...DEFAULT_MINUTE,
        time: minutes,
        angle: minutes * 6
      }
      this.selectedPeriod = period as TimePeriod
    } else this.resetTime()
  }

  private resetTime(): void {
    this.selectedHour = { ...DEFAULT_HOUR }
    this.selectedMinute = { ...DEFAULT_MINUTE }
    this.selectedPeriod = TimePeriod.AM
  }

  focusActiveCell() {
    this.hourInput.nativeElement.focus()
  }

  onHourChange(hour: ClockFaceTime): void {
    this.selectedHour = hour
  }

  onMinuteChange(minute: ClockFaceTime): void {
    this.selectedMinute = minute
  }

  changePeriod(period: TimePeriod): void {
    this.selectedPeriod = period
  }

  changeTimeUnit(unit: TimeUnit): void {
    this.activeTimeUnit = unit
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onHourSelected(hour: number): void {
    this.changeTimeUnit(TimeUnit.MINUTE)
    // this.hourSelected.next(hour);
  }
}

/**
 * @description Format hour in 24hours format to meridian (AM or PM) format
 */
function formatHourByPeriod(hour: number, period: TimePeriod): number {
  switch (period) {
    case TimePeriod.AM:
      return hour === 0 ? 12 : hour
    case TimePeriod.PM:
      return hour === 12 ? 12 : hour - 12
    default:
      return hour
  }
}

/** Used to generate a unique ID for each timepicker instance. */
// const timepickerUid = 0

// Boilerplate for applying mixins to CcTimepickerContent.
class CcTimepickerContentBase {
  constructor(public readonly _elementRef: ElementRef<any>) {}
}
const _CcTimepickerContentMixinBase: CanColorCtor &
  typeof CcTimepickerContentBase = mixinColor(CcTimepickerContentBase)

/**
 * Component used as the content for the timepicker dialog and popup. We use this instead of using
 * CcTimePickerFace directly as the content so we can control the initial focus. This also gives us a
 * place to put additional features of the popup that are not part of the calendar itself in the
 * future. (e.g. confirmation buttons).
 */
@Component({
  template: `
    <cc-timepicker-dialog cdkTrapFocus></cc-timepicker-dialog>
    <div class="cc-timepicker-actions">
      <button mat-button>CANCEL</button>
      <button mat-button color="primary">OK</button>
    </div>
  `,
  host: {
    class: 'cc-timepicker-content',
    '[@transformPanel]': '_animationState',
    '(@transformPanel.done)': '_animationDone.next()',
    '[class.cc-timepicker-content-touch]': 'timepicker.touchUi'
  },
  animations: [
    ccTimepickerAnimations.transformPanel,
    ccTimepickerAnimations.fadeInCalendar
  ],
  exportAs: 'ccTimepickerContent',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  inputs: ['color']
})
export class CcTimepickerContent extends _CcTimepickerContentMixinBase
  implements AfterViewInit, OnDestroy, CanColor {
  /** Reference to the internal calendar component. */
  @ViewChild(CcTimePickerDialog) _calendar: CcTimePickerDialog

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
