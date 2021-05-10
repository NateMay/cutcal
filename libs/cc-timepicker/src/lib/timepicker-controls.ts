import { Component } from '@angular/core'

@Component({
  selector: 'ds-timepicker-controls',
  host: { class: 'cc-timepicker-controls' },
  template: `
    <input #hour value="12" />
    <span>:</span>
    <input value="30" />
    <ds-timepicker-period></ds-timepicker-period>
  `
})
export class DsTimePickerControls {}
