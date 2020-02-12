import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core'
import { ClockFaceTime } from '../../models/clock-face-time.interface'
import { TimePeriod } from '../../models/time-period.enum'
import { TimeUnit } from '../../models/time-unit.enum'
import { disableMinutes, getMinutes } from '../../utils/timepicker-time.utils'

@Component({
  selector: 'cc-timepicker-minutes-face',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <cc-timepicker-face
      [faceTime]="minutesList"
      [selectedTime]="selectedMinute"
      [minutesGap]="minutesGap"
      (timeChange)="minuteChange.next($event)"
      [unit]="timeUnit.MINUTE"
    ></cc-timepicker-face>
  `,
})
export class TimepickerMinutesFaceComponent implements OnChanges {
  minutesList: ClockFaceTime[] = []
  timeUnit = TimeUnit

  @Input() selectedMinute: ClockFaceTime
  @Input() selectedHour: number
  @Input() period: TimePeriod
  @Input() minTime: Date
  @Input() maxTime: Date
  @Input() format: number
  @Input() minutesGap: number

  @Output() minuteChange = new EventEmitter<ClockFaceTime>()

  ngOnChanges(changes: SimpleChanges) {
    if (changes['period'] && changes['period'].currentValue) {
      const minutes = getMinutes(this.minutesGap)
      this.minutesList = disableMinutes(minutes, this.selectedHour, {
        min: this.minTime,
        max: this.maxTime,
        format: this.format,
        period: this.period,
      })
    }
  }
}
