import { Component, OnInit } from '@angular/core'
import { Meta } from '@angular/platform-browser'

@Component({
  selector: 'ds-root',
  template: ` <router-outlet></router-outlet> `
})
export class CutCalComponent implements OnInit {
  // private sw: ServiceWorkerService,
  constructor(private readonly meta: Meta) {
    this.meta.addTags([
      { charset: 'UTF-8' },
      { name: 'description', content: 'CutCal Nutrition Planner' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        name: 'keywords',
        content:
          'Meal planner, Nutrition, Nutrition aggregator, Calorie counter'
      }
    ])
  }

  ngOnInit(): void {
    // Check service worker update
    // this.sw.checkSWUpdate();
  }
}
