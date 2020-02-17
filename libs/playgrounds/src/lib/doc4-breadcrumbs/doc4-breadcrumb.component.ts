import { Component } from '@angular/core'
import { BreadCrumb } from '@cutcal/common'

@Component({
  selector: 'cutcal-doc4-breadcrumb',
  template: `
    <h2>Breadcrumbs</h2>
    <hr />

    <cc-breadcrumbs [crumbs]="crumbs"></cc-breadcrumbs>
  `,
  styleUrls: ['./doc4-breadcrumb.component.css'],
})
export class Doc4BreadcrumbComponent {
  crumbs: BreadCrumb[] = [
    new BreadCrumb('Admin', ['admin']),
    new BreadCrumb('Common UI', ['admin', 'common-ui']),
    new BreadCrumb('Bread Crumbs'),
  ]
}
