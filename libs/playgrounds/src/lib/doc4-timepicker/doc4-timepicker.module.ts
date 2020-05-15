import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { TimePickerModule } from '@cutcal/common-ui'
import { DocUtilModule } from '../doc-utils.module'
import { Doc4TimepickerComponent } from './doc4-timepicker.component'

@NgModule({
  declarations: [Doc4TimepickerComponent],
  imports: [
    CommonModule,
    DocUtilModule,
    TimePickerModule,
    RouterModule.forChild([
      {
        path: '',
        component: Doc4TimepickerComponent
      }
    ])
  ]
})
export class Doc4TimepickerModule {}
