import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { BreadCrumbsModule } from '@cutcal/common-ui'
import { DocUtilModule } from '../doc-utils.module'
import { Doc4BreadcrumbComponent } from './doc4-breadcrumb.component'

@NgModule({
  declarations: [Doc4BreadcrumbComponent],
  imports: [
    CommonModule,
    DocUtilModule,
    BreadCrumbsModule,
    RouterModule.forChild([
      {
        path: '',
        component: Doc4BreadcrumbComponent
      }
    ])
  ]
})
export class Doc4BreadcrumbsModule {}
