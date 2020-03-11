import { Component, EventEmitter, Input, Output } from '@angular/core'
import { KVP, MonthMetaData, MONTHS } from '@cutcal/core'

@Component({
  selector: 'cc-date-picker-months',
  template: `
    <div fxLayout="row wrap" fxLayoutAlign="space-evenly center">
      <button
        *ngFor="let month of months | keyvalue"
        [color]="color(month.index)"
        mat-button
        (click)="monthSelect.emit(month.index)"
      >
        {{ month.short }}
      </button>
    </div>
  `,
  styleUrls: ['./date-picker-months.component.scss'],
})
export class DatePickerMonthsComponent {
  // TODO (date-picker) manage focus

  months: KVP<MonthMetaData> = MONTHS

  @Input() selectedDate: Date = new Date()
  @Input() focusDate: Date = new Date()

  @Output() monthSelect = new EventEmitter<number>()

  color(index: number): string {
    if (!this.selectedDate) return ''
    return this.isSelected(index) ? 'primary' : ''
  }

  isSelected(index: number): boolean {
    return (
      this.selectedDate.getMonth() == index &&
      this.selectedDate.getFullYear() == this.focusDate.getFullYear()
    )
  }
}
