import { Component, OnInit } from '@angular/core'

@Component({
  template: `
    <h2>AM / PM Toggle</h2>
    <hr />

    <ds-am-pm-toggle [(isPM)]="isPM"></ds-am-pm-toggle>

    <br />
    <br />

    <pre>is PM: {{ isPM }}</pre>
  `,
  styleUrls: ['./doc4-am-pm.component.css']
})
export class Doc4AmPmComponent implements OnInit {
  isPM = true

  constructor() {}

  ngOnInit(): void {}
}
