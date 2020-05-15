import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FlexLayoutModule } from '@angular/flex-layout'
import { MatExpansionModule } from '@angular/material/expansion'
import { RouterModule } from '@angular/router'
import {
  DynamicWidthModule,
  IngredientsListItemModule
} from '@cutcal/common-ui'
import { MetricsModule } from '../metrics.module'
import { NutrientTablesModule } from '../nutrient-tables/nutrient-tables.module'
import { DetailPanelsComponent } from './detail-panels.component'

@NgModule({
  declarations: [DetailPanelsComponent],
  exports: [DetailPanelsComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatExpansionModule,
    NutrientTablesModule,
    MetricsModule,
    IngredientsListItemModule,
    FlexLayoutModule,
    DynamicWidthModule
  ]
})
export class DetailPanelsModule {}
