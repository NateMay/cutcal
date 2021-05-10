import { CommonModule } from '@angular/common'
import { ModuleWithProviders } from '@angular/compiler/src/core'
import { NgModule } from '@angular/core'
import { MatCardModule } from '@angular/material/card'
import { HighchartsChartModule } from 'highcharts-angular'
import { InspectNutrientDialogComponent } from './inspect-nutrient-dialog.component'

@NgModule({
  declarations: [InspectNutrientDialogComponent],
  exports: [InspectNutrientDialogComponent],
  imports: [CommonModule, MatCardModule, HighchartsChartModule]
})
export class InspectNutrientModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: InspectNutrientModule,
      providers: []
    }
  }
}
