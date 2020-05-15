import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { DatePickerModule } from '@cutcal/common-ui'
import { DocUtilModule } from '../doc-utils.module'
import { Doc4DatepickerComponent } from './doc4-datepicker.component'

@NgModule({
  declarations: [Doc4DatepickerComponent],
  imports: [
    CommonModule,
    DatePickerModule,
    DocUtilModule,
    RouterModule.forChild([
      {
        path: '',
        component: Doc4DatepickerComponent
      }
    ])
  ]
})
export class Doc4DatepickerModule {}
