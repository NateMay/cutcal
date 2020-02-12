import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatRadioModule } from '@angular/material/radio'
import { BasicsModule } from '../../basics.module'
import { CheckableNutrientsComponent } from './checkable-nutrients.component'

@NgModule({
  declarations: [CheckableNutrientsComponent],
  imports: [
    CommonModule,
    BasicsModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatRadioModule,
  ],
  exports: [CheckableNutrientsComponent],
})
export class CheckableNutrientsModule {}
