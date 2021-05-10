import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { DsTimepickerModule } from '@cutcal/cc-timepicker'
import { DocUtilModule } from '../doc-utils.module'
import { Doc4DsTimepickerComponent } from './doc4-cc-timepicker.component'

@NgModule({
  declarations: [Doc4DsTimepickerComponent],
  imports: [
    CommonModule,
    DsTimepickerModule,
    DocUtilModule,
    RouterModule.forChild([
      {
        path: '',
        component: Doc4DsTimepickerComponent
      }
    ])
  ]
})
export class Doc4DsTimepickerModule {}
