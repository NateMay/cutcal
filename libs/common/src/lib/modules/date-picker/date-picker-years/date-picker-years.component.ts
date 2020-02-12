import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

interface DatePickerYear {
  year: number;
  color: 'primary' | '';
}
@Component({
  selector: 'cc-date-picker-years',
  template: `
  <div fxLayout="row wrap" fxLayoutAlign="space-evenly center">
    <button
      *ngFor="let year of years | coll"
      mat-button
      [color]="year.color"
      (click)="yearSelect.emit(year.year)"
    >{{ year.year }}</button>
  </div>
  `,
  styleUrls: ['./date-picker-years.component.scss']
})
export class DatePickerYearsComponent implements OnInit {

  // TODO (date-picker) manage focus

  years: DatePickerYear[];

  @Input() selectedDate: Date;

  private _focusDate: Date = new Date();
  @Input() set focusDate(focusDate: Date) {
    this._focusDate = focusDate;
    this.recalculate(focusDate.getFullYear());
  }
  get focusDate() {
    return this._focusDate;
  }

  get selectedYear() {
    return this.selectedDate
      ? this.selectedDate.getFullYear()
      : null;
  }

  @Output() yearSelect = new EventEmitter<number>();

  ngOnInit() {
    this.recalculate(this.selectedYear || this.focusDate.getFullYear())
  }

  recalculate(currentYear: number): void {
    this.years = Array
    .apply(null, { length: 15 })
    .map(Number.call, Number)
      .map(num => {
        const year = currentYear - 7 + num;
        return {
          year,
          color: this.selectedYear == year ? 'primary' : ''
        }
      })
  }

}
