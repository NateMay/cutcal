import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'cutcal-doc4-datepicker',
  template: `
    <h2>Date picker</h2>
    <hr />

    <br /><br />

    <div fxLayout="row" fxLayoutAlign="space-around center" fxLayoutGap="20px">
      <ds-date-picker
        #datePicker
        [(date)]="date"
        [label]="label.value"
        [width]="(width.value || 205) + 'px'"
        [placeholder]="placeholder.value"
        [idStr]="idStr.value"
        [disabled]="disabled.checked"
        [dateFormat]="dateFormat.value"
      ></ds-date-picker>
    </div>

    <br /><br />
    <pre>Value: <b>{{ date | date: 'longDate' }}</b></pre>
    <hr />

    <div fxLayout="row wrap" fxLayoutGap="20px">
      <button
        style="height: 50px;"
        mat-raised-button
        color="primary"
        (click)="addMonth()"
      >
        Add Month <sub>(programatically)</sub>
      </button>

      <mat-form-field>
        <mat-label>label</mat-label>
        <input #label matInput value="Pick a Date" />
      </mat-form-field>

      <mat-form-field>
        <mat-label>placeholder</mat-label>
        <input #placeholder matInput value="mm/dd/yyyy" />
      </mat-form-field>

      <mat-form-field>
        <mat-label>idStr</mat-label>
        <input #idStr matInput />
      </mat-form-field>

      <mat-form-field>
        <mat-label>dateFormat</mat-label>
        <input #dateFormat matInput value="shortDate" />
        <mat-hint>
          <a href="https://angular.io/api/common/DatePipe" target="_blank"
            >Date Pipe</a
          >
        </mat-hint>
      </mat-form-field>

      <mat-slide-toggle style="padding: 40px 0" #disabled
        >Disabled</mat-slide-toggle
      >

      <div fxLayout="column" style="padding: 12px">
        <h5 style="margin:0">Width</h5>
        <mat-slider #width [value]="205" [max]="500" [min]="200" [step]="5">
        </mat-slider>
      </div>
    </div>
  `,
  styleUrls: ['./doc4-datepicker.component.css']
})
export class Doc4DatepickerComponent implements OnInit {
  date: Date = new Date()

  constructor() {}

  ngOnInit(): void {}

  addMonth(): void {
    this.date = this.date.addMonth()
  }
}
