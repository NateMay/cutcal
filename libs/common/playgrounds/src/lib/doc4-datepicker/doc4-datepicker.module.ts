import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { Doc4DatepickerComponent } from './doc4-datepicker.component'

@NgModule({
  declarations: [Doc4DatepickerComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: Doc4DatepickerComponent,
      },
    ]),
  ],
})
export class Doc4DatepickerModule {}
