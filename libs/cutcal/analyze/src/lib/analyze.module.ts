import { OverlayModule } from '@angular/cdk/overlay'
import { NgModule } from '@angular/core'
import { MatCardModule } from '@angular/material/card'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatDialogModule } from '@angular/material/dialog'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatSelectModule } from '@angular/material/select'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { RouterModule, Routes } from '@angular/router'
import {
  BasicsModule,
  CCAnimationsModuls,
  DatePickerModule,
} from '@cutcal/common'
import { CheckableNutrientsModule } from '@cutcal/nutrition'
import { StoreModule } from '@ngrx/store'
import { HighchartsChartModule } from 'highcharts-angular'
import { AnalysisChartComponent } from './analysis-chart/analysis-chart.component'
import { AnalyzeRangePickerComponent } from './analyze-range-picker/analyze-range-picker.component'
import { AnalyzeComponent } from './analyze.component'
import { analyzeReducer } from './analyze.store'

const routes: Routes = [
  {
    path: '',
    component: AnalyzeComponent,
  },
]

const MAT_MODULES = [
  MatSlideToggleModule,
  MatSelectModule,
  MatCheckboxModule,
  MatProgressBarModule,
  MatDialogModule,
  OverlayModule,
  MatCardModule,
]

@NgModule({
  declarations: [
    AnalyzeComponent,
    AnalysisChartComponent,
    AnalyzeRangePickerComponent,
  ],
  imports: [
    BasicsModule,
    ...MAT_MODULES,
    DatePickerModule,
    CheckableNutrientsModule,
    HighchartsChartModule,
    CCAnimationsModuls,
    InspectNutrientModuls.forRoot(),
    StoreModule.forFeature('analyze', analyzeReducer),
    RouterModule.forChild(routes),
  ],
})
export class AnalyzeModule {}
