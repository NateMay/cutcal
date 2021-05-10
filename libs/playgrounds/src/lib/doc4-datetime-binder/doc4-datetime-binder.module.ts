import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { DocUtilModule } from '../doc-utils.module'
import { Doc4DatetimeBinderComponent } from './doc4-datetime-binder.component'

@NgModule({
  declarations: [Doc4DatetimeBinderComponent],
  imports: [
    CommonModule,
    DocUtilModule,
    RouterModule.forChild([
      {
        path: '',
        component: Doc4DatetimeBinderComponent
      }
    ])
  ]
})
export class Doc4DatetimeBinderModule {}
