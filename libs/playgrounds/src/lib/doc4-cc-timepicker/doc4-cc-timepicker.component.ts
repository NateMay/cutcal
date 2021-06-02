import { Component } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'

@Component({
  selector: 'ds-doc4-cc-timepicker',
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
        <ds-timepicker-toggle
          matSuffix
          [forAttr]="picker"
        ></ds-timepicker-toggle>
        <ds-timepicker #picker></ds-timepicker>
        <!-- <ds-timepicker #picker touchUi></ds-timepicker> -->
      </mat-form-field>
    </form>
    <pre>form.get('time').value = {{ form.value | json }}</pre>
  `,
  styleUrls: ['./doc4-cc-timepicker.component.css']
})
export class Doc4DsTimepickerComponent {
  format = 12
  form: FormGroup

  constructor(private readonly fb: FormBuilder) {
    this.form = this.fb.group({ time: null })
  }
}
