import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NutrientComponent } from './nutrient.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: NutrientComponent
      }
    ]),
  ],
  declarations: [NutrientComponent],
})
export class NutrientModule {}
