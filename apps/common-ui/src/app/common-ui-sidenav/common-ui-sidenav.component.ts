import { Component, OnInit } from '@angular/core'

class TesterLink {
  label: string
  route: string
  constructor(label: string, route: string) {
    this.label = label
    this.route = route
  }
}

@Component({
  selector: 'cc-common-ui-sidenav',
  templateUrl: './common-ui-sidenav.component.html',
  styleUrls: ['./common-ui-sidenav.component.scss'],
})
export class CommonUiSidenavComponent implements OnInit {
  links: TesterLink[] = [
    // new TesterLink('Classes', 'classes'),
    new TesterLink('Date Picker', 'date-picker'),
    new TesterLink('Time Picker', 'time-picker'),
    new TesterLink('Datetime Binder', 'datetime-binder'),
    new TesterLink('AM PM Toggle', 'am-pm-toggle'),
    new TesterLink('Breadcrumbs', 'breadcrumbs'),
    new TesterLink('Nutrition Label', 'nutrition-label'),
    new TesterLink('Holdable', 'holdable'),
    new TesterLink('Drag and Drop', 'dnd'),
    new TesterLink('Image Upload / Crop', 'upload'),
    new TesterLink('Flip Card', 'flip'),
    new TesterLink('Animate', 'animate'),
    new TesterLink('Carousel', 'carousel'),
    new TesterLink('Dynamic Width', 'dyn-width'),
  ]

  constructor() {}

  ngOnInit() {}
}
