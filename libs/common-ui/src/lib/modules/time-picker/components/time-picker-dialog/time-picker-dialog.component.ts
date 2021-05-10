import {
  Component,
  ElementRef,
  Inject,
  Input,
  Optional,
  TemplateRef,
  ViewChild
} from '@angular/core'
import {
  dateFromTime,
  forceZero
} from '../../../../functions/dateFromTime/dateFromTime'
import { ClockFaceTime } from '../../models/clock-face-time.interface'
import { TimePeriod } from '../../models/time-period.enum'
import { TimeUnit } from '../../models/time-unit.enum'
import { DEFAULT_HOUR, DEFAULT_MINUTE } from '../../utils/default-clock-face'
import { TimePickerData, TIME_PICKER_DATA } from '../../utils/time-picker-data'
import { TimePickerInputComponent } from '../time-picker-input/time-picker-input.component'

@Component({
  selector: 'ds-timepicker-dialog',
  styleUrls: ['./time-picker-dialog.component.scss'],
  host: { class: 'cc-time-picker-dialog mat-elevation-z2' },
  template: `
    <span cdkTrapFocus>
      <header>
        <ds-timepicker-dial
          [format]="format"
          [hour]="selectedHour?.time"
          [minute]="selectedMinute?.time"
          [period]="selectedPeriod"
          [activeTimeUnit]="activeTimeUnit"
          [minTime]="minTime"
          [maxTime]="maxTime"
          [editableHintTmpl]="editableHintTmpl"
          [minutesGap]="minutesGap"
          (periodChanged)="changePeriod($event)"
          (timeUnitChanged)="changeTimeUnit($event)"
          (hourChanged)="onHourChange($event)"
          (minuteChanged)="onMinuteChange($event)"
        ></ds-timepicker-dial>
      </header>

      <div class="timepicker__main-content">
        <div class="timepicker__body" [ngSwitch]="activeTimeUnit">
          <div *ngSwitchCase="timeUnit.HOUR">
            <ds-timepicker-24-hours-face
              *ngIf="format === 24; else ampmHours"
              (hourChange)="onHourChange($event)"
              [selectedHour]="selectedHour"
              [minTime]="minTime"
              [maxTime]="maxTime"
              [format]="format"
              (hourSelected)="onHourSelected($event)"
            ></ds-timepicker-24-hours-face>

            <ng-template #ampmHours>
              <ds-timepicker-12-hours-face
                (hourChange)="onHourChange($event)"
                [selectedHour]="selectedHour"
                [period]="selectedPeriod"
                [minTime]="minTime"
                [maxTime]="maxTime"
                (hourSelected)="onHourSelected($event)"
              ></ds-timepicker-12-hours-face>
            </ng-template>
          </div>

          <ds-timepicker-minutes-face
            *ngSwitchCase="timeUnit.MINUTE"
            [selectedMinute]="selectedMinute"
            [selectedHour]="selectedHour?.time"
            [minTime]="minTime"
            [maxTime]="maxTime"
            [format]="format"
            [period]="selectedPeriod"
            [minutesGap]="minutesGap"
            (minuteChange)="onMinuteChange($event)"
          ></ds-timepicker-minutes-face>
        </div>
        <div class="actions" fxLayout="row">
          <button mat-button (click)="data.close()">Close</button>
          <button mat-button (click)="setTime()">OK</button>
        </div>
      </div>
    </span>
  `
})
export class TimepickerDialogComponent {
  private _minutesGap: number
  private input: TimePickerInputComponent

  selectedHour: ClockFaceTime
  selectedMinute: ClockFaceTime
  selectedPeriod: TimePeriod

  timeUnit = TimeUnit
  activeTimeUnit = TimeUnit.HOUR

  @Input() editableHintTmpl!: TemplateRef<Node>

  @Input() set minutesGap(gap: number | null) {
    if (gap == null) return
    gap = Math.floor(gap)
    this._minutesGap = gap <= 59 ? gap : 1
  }

  get minutesGap(): number | null {
    return this._minutesGap
  }

  get minTime(): Date {
    return this.input?.min
  }

  get maxTime(): Date {
    return this.input?.max
  }

  get disabled(): boolean {
    return this.input?.disabled
  }

  get format(): number {
    return this.input?.format
  }

  @ViewChild('timepickerww', { static: true }) timepickerComponent!: ElementRef

  constructor(
    @Optional() @Inject(TIME_PICKER_DATA) public data: TimePickerData
  ) {
    if (data) {
      this.input = data.input
      this.setDefaultTime(this.input.time)
    }
  }

  getFullTime(format: number): string {
    const hour = this.selectedHour.time
    const minute = this.selectedMinute.time
    const period = format === 12 ? this.selectedPeriod : ''
    return `${forceZero(hour)}:${forceZero(minute)} ${period}`.trim()
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onHourSelected(hour: number): void {
    this.changeTimeUnit(TimeUnit.MINUTE)
    // this.hourSelected.next(hour);
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

  // DEPENDS ON (time-picker) then TEST (time-picker)
  setTime(): void {
    this.data.timeSet(this.getFullTime(this.format))
    this.data.close()
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
}

// TODO (move) into functions or TimeAdapter
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
