import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core'
import { ClockFaceTime } from '../../models/clock-face-time.interface'
import { TimePeriod } from '../../models/time-period.enum'
import { TimeUnit } from '../../models/time-unit.enum'
import { getMinutes } from '../../utils/timepicker-time.utils'

@Component({
  selector: 'ds-timepicker-minutes-face',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ds-timepicker-face
      [faceTime]="minutesList"
      [selectedTime]="selectedMinute"
      [minutesGap]="minutesGap"
      (timeChange)="minuteChange.next($event)"
      [unit]="timeUnit.MINUTE"
    ></ds-timepicker-face>
  `
})
export class TimepickerMinutesFaceComponent implements OnChanges {
  minutesList: ClockFaceTime[] = []
  timeUnit = TimeUnit

  @Input() selectedMinute!: ClockFaceTime
  @Input() selectedHour!: number
  @Input() period!: TimePeriod
  @Input() minTime!: Date
  @Input() maxTime!: Date
  @Input() format!: number
  @Input() minutesGap!: number

  @Output() minuteChange = new EventEmitter<ClockFaceTime>()

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['period']?.currentValue) {
      this.minutesList = getMinutes(this.minutesGap)
    }
  }
}
