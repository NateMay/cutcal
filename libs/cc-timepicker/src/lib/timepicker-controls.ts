import { Component } from '@angular/core';

@Component({
  selector: 'cc-timepicker-controls',
  host: { class: 'cc-timepicker-controls' },
  template: `
    <input #hour value="12" />
    <span>:</span>
    <input value="30" />
    <cc-timepicker-period></cc-timepicker-period>
  `,
})
export class CcTimePickerControls {

}
