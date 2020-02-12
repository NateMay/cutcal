import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'

@Component({
  selector: 'cc-breadcrumb',
  template: `
    <p>
      breadcrumb works!
    </p>
  `,
  styleUrls: ['./breadcrumb.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
