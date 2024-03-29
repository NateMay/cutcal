import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { Router } from '@angular/router'
import { BreadCrumb } from './breadcrumb'

// FEATURE (breadcrumbs) home button should navigate to a dashboard page
@Component({
  selector: 'ds-breadcrumbs',
  styleUrls: ['./breadcrumbs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'ds-breadcrumbs' },
  template: `
    <a routerLink="/profile" class="breadcrumb dark">
      <i class="material-icons">home</i>
    </a>

    <a
      *ngFor="let crumb of crumbs"
      (click)="goTo(crumb)"
      [ngClass]="{ 'no-route': !crumb.route }"
      class="breadcrumb dark"
      >{{ crumb.label }}</a
    >
  `
})
export class BreadcrumbsComponent {
  @Input() crumbs: BreadCrumb[] = []

  constructor(private readonly router: Router) {}

  goTo(crumb: BreadCrumb): void {
    if (crumb.route) void this.router.navigate(crumb.route)
  }
}
