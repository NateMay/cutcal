import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core'
import {
  ClockFaceTime,
  getMinutes,
  TimePeriod,
  TimeUnit
} from './timepicker-utils'

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
export class DsTimepickerMinutesFace implements OnChanges {
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
