import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './layout1.component.html',
  styleUrls: ['./layout1.component.scss']
})
export class Layout1Component implements OnInit {

  constructor() {
    console.count('Layout1Component')
  }

  ngOnInit() {
  }

}
