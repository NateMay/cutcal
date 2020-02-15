import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { BasicsModule } from '@cutcal/common'
import { MetricsModule } from '../metrics.module'
import { CalorieTableComponent } from './calorie-table/calorie-table.component'
import { CarbsTableComponent } from './carbs-table/carbs-table.component'
import { ExcessTableComponent } from './excess-table/excess-table.component'
import { FatsTableComponent } from './fats-table/fats-table.component'
import { InsufficientTableComponent } from './insufficient-table/insufficient-table.component'
import { MineralTableComponent } from './mineral-table/mineral-table.component'
import { OtherTableComponent } from './other-table/other-table.component'
import { ProteinTableComponent } from './protein-table/protein-table.component'
import { SterolsTableComponent } from './sterols-table/sterols-table.component'
import { VitaminTableComponent } from './vitamin-table/vitamin-table.component'

// TEST (tables)
const COMPONENTS = [
  VitaminTableComponent,
  MineralTableComponent,
  CalorieTableComponent,
  ProteinTableComponent,
  SterolsTableComponent,
  OtherTableComponent,
  ExcessTableComponent,
  InsufficientTableComponent,
  FatsTableComponent,
  CarbsTableComponent,
]

@NgModule({
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
  imports: [BasicsModule, MetricsModule, CommonModule],
})
export class NutrientTablesModule {}
