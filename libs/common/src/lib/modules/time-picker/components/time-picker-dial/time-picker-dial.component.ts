import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, TemplateRef } from '@angular/core'
import { ClockFaceTime } from '../../models/clock-face-time.interface'
import { TimePeriod } from '../../models/time-period.enum'
import { TimeUnit } from '../../models/time-unit.enum'
import { disableHours, disableMinutes, getHours, getMinutes } from '../../utils/timepicker-time.utils'

@Component({
  selector: 'cc-timepicker-dial',
  styleUrls: ['time-picker-dial.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="timepicker-dial">
      <div class="timepicker-dial__container">
        <div class="timepicker-dial__time">
          <cc-timepicker-dial-control
            [timeList]="hours"
            [time]="hour"
            [timeUnit]="timeUnit.HOUR"
            [isActive]="activeTimeUnit === timeUnit.HOUR"
            (timeUnitChanged)="changeTimeUnit($event)"
            (timeChanged)="changeHour($event)"
          ></cc-timepicker-dial-control>

          <span>:</span>

          <cc-timepicker-dial-control
            [timeList]="minutes"
            [time]="minute"
            [timeUnit]="timeUnit.MINUTE"
            [isActive]="activeTimeUnit === timeUnit.MINUTE"
            [minutesGap]="minutesGap"
            (timeUnitChanged)="changeTimeUnit($event)"
            (timeChanged)="changeMinute($event)"
          ></cc-timepicker-dial-control>
        </div>

        <cc-timepicker-period
          *ngIf="format != 24"
          [selectedPeriod]="period"
          [activeTimeUnit]="activeTimeUnit"
          [maxTime]="maxTime"
          [minTime]="minTime"
          [format]="format"
          [hours]="hours"
          [minutes]="minutes"
          [selectedHour]="hour"
          (periodChanged)="changePeriod($event)"
        ></cc-timepicker-period>
      </div>
      <!--
      <small class="timepicker-dial__hint"> * use arrows (<span>&#8645;</span>) to change the time</small>
      -->
    </div>
  `,
})
export class TimepickerDialComponent implements OnChanges {
  timeUnit = TimeUnit

  hours: ClockFaceTime[]
  minutes: ClockFaceTime[]

  isHintVisible: boolean

  @Input() editableHintTmpl!: TemplateRef<Node>
  @Input() hour!: number | string
  @Input() minute!: number | string
  @Input() format!: number
  @Input() period!: TimePeriod
  @Input() activeTimeUnit!: TimeUnit
  @Input() minTime!: Date
  @Input() maxTime!: Date
  @Input() minutesGap!: number

  @Output() periodChanged = new EventEmitter<TimePeriod>()
  @Output() timeUnitChanged = new EventEmitter<TimeUnit>()
  @Output() hourChanged = new EventEmitter<ClockFaceTime>()
  @Output() minuteChanged = new EventEmitter<ClockFaceTime>()

  ngOnChanges(changes: SimpleChanges) {
    if (
      (changes['period'] && changes['period'].currentValue) ||
      (changes['format'] && changes['format'].currentValue)
    ) {
      const hours = getHours(this.format)

      this.hours = disableHours(hours, {
        min: this.minTime,
        max: this.maxTime,
        format: this.format,
        period: this.period,
      })
    }
    if (
      (changes['period'] && changes['period'].currentValue) ||
      (changes['hour'] && changes['hour'].currentValue)
    ) {
      const minutes = getMinutes(this.minutesGap)

      this.minutes = disableMinutes(minutes, +this.hour, {
        min: this.minTime,
        max: this.maxTime,
        format: this.format,
        period: this.period,
      })
    }
  }

  changeTimeUnit(unit: TimeUnit): void {
    this.timeUnitChanged.next(unit)
  }

  changePeriod(period: TimePeriod): void {
    this.periodChanged.next(period)
  }

  changeHour(hour: ClockFaceTime): void {
    this.hourChanged.next(hour)
  }

  changeMinute(minute: ClockFaceTime): void {
    this.minuteChanged.next(minute)
  }

  showHint(): void {
    this.isHintVisible = true
  }

  hideHint(): void {
    this.isHintVisible = false
  }
}
