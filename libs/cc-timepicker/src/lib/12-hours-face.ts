import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import { ClockFaceTime, getHours, TimePeriod } from './timepicker-utils'

@Component({
  selector: 'cc-timepicker-12-hours-face',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <cc-timepicker-face
      [selectedTime]="selectedHour"
      [faceTime]="hoursList"
      (timeChange)="hourChange.next($event)"
      (timeSelected)="onTimeSelected($event)"
    ></cc-timepicker-face>
  `,
})
export class CcTimepicker12HoursFaceComponent {
  @Input() period: TimePeriod = TimePeriod.AM

  @Input() selectedHour!: ClockFaceTime
  @Input() minTime!: Date
  @Input() maxTime!: Date
  @Input() format!: number

  @Output() hourChange = new EventEmitter<ClockFaceTime>()
  @Output() hourSelected = new EventEmitter<number>()

  hoursList: ClockFaceTime[] = []

  constructor() {
    this.hoursList = getHours(12)
  }

  onTimeSelected(time: number): void {
    this.hourSelected.next(time)
  }
}
