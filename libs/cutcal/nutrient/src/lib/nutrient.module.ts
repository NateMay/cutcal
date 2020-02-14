import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { BasicsModule } from '@cutcal/common'
import { NutrientComponent } from './nutrient.component'

const routes: Routes = [
  {
    path: '',
    component: NutrientComponent,
  },
  {
    path: ':nutrient',
    component: NutrientComponent,
  },
]
@NgModule({
  declarations: [NutrientComponent],
  imports: [
    CommonModule,
    BasicsModule,
    CheckableNutrientsModule,
    RouterModule.forChild(routes),
  ],
})
export class NutrientModule {}
