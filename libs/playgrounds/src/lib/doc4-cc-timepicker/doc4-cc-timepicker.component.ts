import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'

@Component({
  selector: 'cutcal-doc4-cc-timepicker',
  template: `
    <h2>CC Timepicker</h2>

    <hr />

    <form [formGroup]="form">
      <mat-form-field>
        <mat-label>Select a Time</mat-label>
        <input
          matInput
          formControlName="time"
          [ccTimepicker]="picker"
          autocomplete="off"
          placeholder="hh:mm pm"
        />
        <cc-timepicker-toggle matSuffix [for]="picker"></cc-timepicker-toggle>
        <cc-timepicker #picker></cc-timepicker>
        <!-- <cc-timepicker #picker touchUi></cc-timepicker> -->
      </mat-form-field>
    </form>
    <pre>form.get('time').value = {{ form.value | json }}</pre>
  `,
  styleUrls: ['./doc4-cc-timepicker.component.css']
})
export class Doc4CcTimepickerComponent implements OnInit {
  format = 12
  form: FormGroup

  constructor(private readonly fb: FormBuilder) {
    this.form = this.fb.group({ time: null })
  }

  ngOnInit() {}
}
