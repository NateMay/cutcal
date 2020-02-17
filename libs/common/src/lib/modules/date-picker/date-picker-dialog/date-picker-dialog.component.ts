import { Component, Inject, ViewChild } from '@angular/core'
import { CalendarFaceComponent } from '../calendar-face/calendar-face.component'
import { DatePickerDialogData, DATE_PICKER_DATA } from '../date-picker-data'

let nextUniqueId: number = 0

@Component({
  selector: 'cc-date-picker-dialog',
  styleUrls: ['./date-picker-dialog.component.scss'],
  host: { class: 'cc-date-picker mat-elevation-z2' },
  template: `
    <span cdkTrapFocus>
      <cc-calendar-controls
        [monthBtnDisabled]="monthBtnDisabled"
        [monthBtnDate]="focusDate"
        (prevBtn)="direction(-1)"
        (nextBtn)="direction(1)"
        (monthBtn)="monthBtnChange()"
      ></cc-calendar-controls>

      <ng-container [ngSwitch]="view">
        <cc-calendar-face
          *ngSwitchCase="'days'"
          [focusId]="focusId"
          [(selectedDate)]="selectedDate"
          [(focusDate)]="focusDate"
          (dayClick)="data.select($event)"
        ></cc-calendar-face>

        <cc-date-picker-months
          *ngSwitchCase="'months'"
          [selectedDate]="selectedDate"
          [focusDate]="focusDate"
          (monthSelect)="monthSelect($event)"
        ></cc-date-picker-months>

        <cc-date-picker-years
          *ngSwitchCase="'years'"
          [selectedDate]="selectedDate"
          [focusDate]="focusDate"
          (yearSelect)="yearSelect($event)"
        ></cc-date-picker-years>
      </ng-container>

      <button mat-button (click)="data.close()">Close</button>
    </span>
  `,
})
export class DatePickerDialogComponent {
  view: 'days' | 'months' | 'years' = 'days'

  selectedDate: Date = new Date()
  focusDate: Date = new Date()
  focusId!: string
  previousFocus!: HTMLElement
  monthBtnDisabled: boolean = false

  @ViewChild(CalendarFaceComponent) face!: CalendarFaceComponent

  constructor(@Inject(DATE_PICKER_DATA) public data: DatePickerDialogData) {
    this.monthBtnDisabled = data.monthBtnDisabled
    this.focusId = `date-picker-${nextUniqueId++}`
    this.focusDate = this.selectedDate = data.selectedDate || new Date()
  }

  monthBtnChange() {
    switch (this.view) {
      case 'days':
        this.view = 'years'
        break
      case 'months':
        this.view = 'days'
        break
      case 'years':
        this.view = 'months'
        break
    }
  }

  direction(dir: number) {
    switch (this.view) {
      case 'days':
        this.face.changeMonth(dir)
        break
      case 'months':
        this.focusDate = this.focusDate.addMonths(dir)
        break
      case 'years':
        this.focusDate = this.focusDate.addYears(dir * 15)
        break
    }
  }

  monthSelect(monthIndex: number) {
    this.focusDate = new Date(this.focusDate.getFullYear(), monthIndex, 1)
    this.view = 'days'
  }

  yearSelect(year: number) {
    this.focusDate = new Date(year, this.focusDate.getMonth(), 1)
    this.view = 'months'
  }
}
