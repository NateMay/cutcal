import { NgModule } from '@angular/core';
import { HighchartsChartModule } from 'highcharts-angular';
import { BasicsModule } from '../../basics.module';
import { CaloriesChartComponent } from './calories-chart/calories.component';
import { NutrientWindRoseComponent } from './nutrient-wind-rose/nutrient-wind-rose.component';
import { NutrLabelComponent } from './nutrition-label/nutr-label.component';

const COMPONENTS = [
  CaloriesChartComponent,
  NutrLabelComponent,
  NutrientWindRoseComponent
];

@NgModule({
  imports: [
    BasicsModule,
    HighchartsChartModule
  ],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS]
})
export class MetricsModule {}

