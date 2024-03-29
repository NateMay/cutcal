import { Component, Input } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { analyzeParams, CCValidators } from '@cutcal/common-ui'
import { isDate } from 'lodash'

@Component({
  selector: 'ds-analyze-range-picker',
  template: `
    <form fxLayout="row" fxLayout="space-between center" [formGroup]="form">
      <mat-form-field fxFlex="49%">
        <mat-label>Start</mat-label>
        <input
          type="text"
          #start
          matInput
          value="{{ startDate | date: 'mediumDate' }}"
          autocomplete="off"
          placeholder="Start Date"
          attr.aria-label="Start Date"
          (keyup.enter)="changeDate(start.value, 'start')"
          (blur)="changeDate(start.value, 'start')"
        />
      </mat-form-field>
      <input hidden formControlName="startDate" />

      <div fxFlex="2%"></div>

      <mat-form-field fxFlex="49%">
        <mat-label>End</mat-label>
        <input
          type="text"
          #end
          matInput
          value="{{ endDate | date: 'mediumDate' }}"
          autocomplete="off"
          placeholder="End Date"
          attr.aria-label="End Date"
          (keyup.enter)="changeDate(end.value, 'end')"
          (blur)="changeDate(end.value, 'end')"
        />
      </mat-form-field>
      <input hidden formControlName="endDate" />
    </form>

    <div class="error" *ngIf="form.invalid">Invalid Date Range</div>

    <ds-calendar-controls
      [monthBtnDate]="focusDate"
      (prevBtn)="changeMonth(-1)"
      (nextBtn)="changeMonth(1)"
      (monthBtn)="monthBtnChange()"
    ></ds-calendar-controls>

    <ng-container [ngSwitch]="calView">
      <ds-calendar-face
        *ngSwitchCase="'days'"
        [range]="true"
        [(focusDate)]="focusDate"
        [(startDate)]="startDate"
        [(endDate)]="endDate"
        (endDateChange)="updateUrl()"
        (startDateChange)="updateUrl()"
        [focusId]="'calFocusID'"
      ></ds-calendar-face>

      <ds-date-picker-months
        *ngSwitchCase="'months'"
        [focusDate]="focusDate"
        (monthSelect)="monthSelect($event)"
      ></ds-date-picker-months>

      <ds-date-picker-years
        *ngSwitchCase="'years'"
        [focusDate]="focusDate"
        (yearSelect)="yearSelect($event)"
      ></ds-date-picker-years>
    </ng-container>
  `,
  styleUrls: ['./analyze-range-picker.component.scss']
})
export class AnalyzeRangePickerComponent {
  calView: 'days' | 'months' | 'years' = 'days'

  focusDate: Date = new Date()

  form: FormGroup

  _startDate: Date = new Date()
  @Input() set startDate(startDate: Date) {
    this._startDate = this.focusDate = startDate
    this.form.patchValue({ startDate })
  }
  get startDate(): Date {
    return this._startDate
  }

  _endDate: Date = new Date()
  @Input() set endDate(endDate: Date) {
    this._endDate = this.focusDate = endDate
    this.form.patchValue({ endDate })
  }
  get endDate(): Date {
    return this._endDate
  }

  constructor(
    private readonly router: Router,
    private readonly fb: FormBuilder
  ) {
    this.focusDate = this.startDate

    this.form = this.fb.group(
      {
        startDate: [this.startDate, Validators.required],
        endDate: [this.endDate, Validators.required]
      },
      { validator: CCValidators.dateRange('startDate', 'endDate') }
    )
  }

  changeDate(dateString: string, which: 'start' | 'end'): void {
    const newDate = new Date(Date.parse(dateString))

    if (which == 'start' && this.startDate.isSameDay(newDate)) {
      this.startDate = newDate
      this.updateUrl()
    } else if (which == 'end' && this.endDate.isSameDay(newDate)) {
      this.endDate = newDate
      this.updateUrl()
    }
  }

  updateUrl(): void {
    if (this.validRange())
      void this.router.navigate(
        ['analyze'],
        analyzeParams(this.startDate, this.endDate)
      )
  }

  validRange(): boolean {
    return (
      isDate(this.startDate) &&
      isDate(this.endDate) &&
      this.startDate < this.endDate
    )
  }

  changeMonth(dir: number): void {
    this.focusDate = this.focusDate.addMonths(dir)
  }

  monthSelect(monthIndex: number): void {
    this.focusDate = new Date(this.focusDate.getFullYear(), monthIndex, 1)
    this.calView = 'days'
  }

  yearSelect(year: number): void {
    this.focusDate = new Date(year, this.focusDate.getMonth(), 1)
    this.calView = 'months'
  }

  monthBtnChange(): void {
    switch (this.calView) {
      case 'days':
        this.calView = 'years'
        break
      case 'months':
        this.calView = 'days'
        break
      case 'years':
        this.calView = 'months'
        break
    }
  }
}
