import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'cc-am-pm-plaground',
  template: `
    <h1>AM PM Toggle</h1>
    <cc-am-pm-toggle [isPM]="isPM" [disabled]="disabled"></cc-am-pm-toggle>
  `,
  styleUrls: ['./am-pm-plaground.component.scss'],
})
export class AmPmPlagroundComponent implements OnInit {
  isPM = true
  disabled = false
  constructor() {}

  ngOnInit() {}
}
