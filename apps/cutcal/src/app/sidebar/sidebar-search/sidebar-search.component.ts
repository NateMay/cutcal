import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cc-sidebar-search',
  templateUrl: './sidebar-search.component.html',
  styleUrls: ['./sidebar-search.component.scss']
})
export class SidebarSearchComponent implements OnInit {

  items = [
    'first',
    'second',
    'third'
  ]

  constructor() { }

  ngOnInit() {
  }

}
