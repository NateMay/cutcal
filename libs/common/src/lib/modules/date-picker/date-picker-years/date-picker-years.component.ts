import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

interface DatePickerYear {
  year: number
  color: 'primary' | ''
}
@Component({
  selector: 'cc-date-picker-years',
  template: `
    <div fxLayout="row wrap" fxLayoutAlign="space-evenly center">
      <button
        *ngFor="let year of years | keyvalue"
        mat-button
        [color]="year.color"
        (click)="yearSelect.emit(year.year)"
      >
        {{ year.year }}
      </button>
    </div>
  `,
  styleUrls: ['./date-picker-years.component.scss'],
})
export class DatePickerYearsComponent implements OnInit {
  // TODO (date-picker) manage focus

  years!: DatePickerYear[]

  @Input() selectedDate!: Date | null

  private _focusDate: Date = new Date()
  @Input() set focusDate(focusDate: Date) {
    this._focusDate = focusDate
    this.recalculate(focusDate.getFullYear())
  }
  get focusDate() {
    return this._focusDate
  }

  get selectedYear() {
    return this.selectedDate ? this.selectedDate.getFullYear() : null
  }

  @Output() yearSelect = new EventEmitter<number>()

  ngOnInit() {
    this.recalculate(this.selectedYear || this.focusDate.getFullYear())
  }

  recalculate(currentYear: number): void {
    this.years = Array(15)
      .fill(null)
      .map((x, i) => i)
      .map((num: number) => {
        const year = currentYear - 7 + num
        return {
          year,
          color: this.selectedYear == year ? 'primary' : '',
        }
      })
  }
}
