import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { AmPmToggleModule } from '@cutcal/common-ui'
import { DocUtilModule } from '../doc-utils.module'
import { Doc4AmPmComponent } from './doc4-am-pm.component'

@NgModule({
  declarations: [Doc4AmPmComponent],
  imports: [
    CommonModule,
    DocUtilModule,
    AmPmToggleModule,
    RouterModule.forChild([
      {
        path: '',
        component: Doc4AmPmComponent
      }
    ])
  ]
})
export class Doc4AmPmModule {}
