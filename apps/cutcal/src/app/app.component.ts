import { Component, OnInit } from '@angular/core'
import { Meta } from '@angular/platform-browser'

@Component({
  selector: 'cc-root',
  template: `
    <router-outlet></router-outlet>
  `,
})
export class AppComponent implements OnInit {
  // private sw: ServiceWorkerService,
  constructor(private meta: Meta) {
    this.meta.addTags([
      { charset: 'UTF-8' },
      { name: 'description', content: 'CutCal Nutrition Planner' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        name: 'keywords',
        content:
          'Meal planner, Nutrition, Nutrition aggregator, Calorie counter',
      },
    ])
  }

  ngOnInit() {
    // Check service worker update
    // this.sw.checkSWUpdate();
  }
}
