import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import { ClockFaceTime } from '../models/clock-face-time.interface'
import { getHours } from '../utils/timepicker-time.utils'

@Component({
  selector: 'cc-timepicker-24-hours-face',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <cc-timepicker-face
      [selectedTime]="selectedHour"
      [faceTime]="hoursList"
      [format]="format"
      (timeChange)="hourChange.next($event)"
      (timeSelected)="onTimeSelected($event)"
    ></cc-timepicker-face>
  `,
})
export class Timepicker24HoursFaceComponent {
  @Input() selectedHour!: ClockFaceTime
  @Input() minTime!: Date
  @Input() maxTime!: Date
  @Input() format!: number

  @Output() hourChange = new EventEmitter<ClockFaceTime>()
  @Output() hourSelected = new EventEmitter<number>()

  hoursList: ClockFaceTime[] = []

  constructor() {
    this.hoursList = getHours(24)
  }

  onTimeSelected(time: number): void {
    this.hourSelected.next(time)
  }
}
