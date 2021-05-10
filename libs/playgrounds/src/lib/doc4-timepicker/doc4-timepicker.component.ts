import { Component } from '@angular/core'

@Component({
  selector: 'ds-doc4-timepicker',
  template: `
    <h2>Time picker</h2>
    <hr />

    <br /><br />

    <div fxLayout="row" fxLayoutAlign="space-around center" fxLayoutGap="20px">
      <ds-time-picker-input
        #timePicker
        label="Select a time"
        [(time)]="time"
        (timeChange)="timeChange($event)"
        [label]="label.value"
        [width]="(width.value || 205) + 'px'"
        [placeholder]="placeholder.value"
        [idStr]="idStr.value"
        [format]="format.checked ? 24 : 12"
        [disabled]="disabled.checked"
      ></ds-time-picker-input>
    </div>

    <br /><br />
    <pre>Value: <b>{{ time }}</b></pre>
    <hr />

    <div fxLayout="row" fxLayoutGap="20px">
      <div fxLayout="column" fxLayoutGap="20px" fxFlex="50">
        <mat-form-field>
          <mat-label>Change Time Programatically</mat-label>

          <input
            #input
            value="07:45 pm"
            matInput
            placeholder="hh:mm am"
            placeholder="Input"
          />

          <button
            style="top: -6px;"
            matSuffix
            mat-raised-button
            color="primary"
            (click)="changeTimeProg(input.value)"
          >
            Update
          </button>
        </mat-form-field>

        <mat-form-field>
          <mat-label>label</mat-label>
          <input #label matInput value="Select a time" />
        </mat-form-field>

        <mat-slide-toggle #disabled>Disabled</mat-slide-toggle>

        <mat-slide-toggle #format
          >Format {{ format.checked ? '24' : '12' }}</mat-slide-toggle
        >
      </div>

      <div fxLayout="column" fxLayoutGap="20px" fxFlex="50">
        <mat-form-field>
          <mat-label>placeholder</mat-label>
          <input #placeholder matInput value="hh:mm pm" />
        </mat-form-field>

        <mat-form-field>
          <mat-label>idStr</mat-label>
          <input #idStr matInput />
        </mat-form-field>

        <div fxLayout="column">
          <h5 style="margin:0">Width</h5>
          <mat-slider #width [value]="205" [max]="500" [min]="200" [step]="5">
          </mat-slider>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./doc4-timepicker.component.css']
})
export class Doc4TimepickerComponent {
  time = '03:15 pm'

  constructor() {}

  timeChange(time: string): void {
    console.log(time)
  }

  changeTimeProg(time: string): void {
    this.time = time
  }
}
