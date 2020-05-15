import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CCAnimationsModule } from '@cutcal/common-ui'
import { DocUtilModule } from '../doc-utils.module'
import { Doc4AnimateComponent } from './doc4-animate.component'

@NgModule({
  declarations: [Doc4AnimateComponent],
  imports: [
    CommonModule,
    DocUtilModule,
    CCAnimationsModule,
    RouterModule.forChild([
      {
        path: '',
        component: Doc4AnimateComponent
      }
    ])
  ]
})
export class Doc4AnimateModule {}
