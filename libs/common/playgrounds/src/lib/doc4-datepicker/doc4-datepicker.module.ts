import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { DatePickerModule } from '../../../../src/lib/modules/date-picker/date-picker.module'
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
        component: Doc4DatepickerComponent,
      },
    ]),
  ],
})
export class Doc4DatepickerModule {}
