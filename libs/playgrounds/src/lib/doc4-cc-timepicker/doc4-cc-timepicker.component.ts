import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'cutcal-doc4-cc-timepicker',
  template: `
    <h2>CC Timepicker</h2>

    <hr />

    <mat-form-field>
      <mat-label>Select a Time</mat-label>
      <input
        matInput
        [ccTimepicker]="picker"
        autocomplete="off"
        placeholder="hh:mm pm"
        type="time"
      />
      <cc-timepicker-toggle matSuffix [for]="picker"></cc-timepicker-toggle>
      <cc-timepicker #picker></cc-timepicker>
      <!-- <cc-timepicker #picker touchUi></cc-timepicker> -->
    </mat-form-field>
  `,
  styleUrls: ['./doc4-cc-timepicker.component.css'],
})
export class Doc4CcTimepickerComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
