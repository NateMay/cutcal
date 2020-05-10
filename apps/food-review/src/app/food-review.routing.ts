import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AlgoliaComponent } from './algolia/algolia'
import { CreateComponent } from './create/create.component'

const FOOD_REVIEW_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'algolia',
    pathMatch: 'full'
  },
  {
    path: 'google',
    component: CreateComponent
  },
  {
    path: 'algolia',
    component: AlgoliaComponent
  }
]

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(FOOD_REVIEW_ROUTES, { initialNavigation: 'enabled' })
  ]
})
export class FoodReviewRouting {}
