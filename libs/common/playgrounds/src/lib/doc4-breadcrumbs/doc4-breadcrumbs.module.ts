import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DocUtilModule } from '../doc-utils.module';
import { Doc4BreadcrumbComponent } from './doc4-breadcrumb.component';

@NgModule({
  declarations: [Doc4BreadcrumbComponent],
  imports: [
    CommonModule,
    DocUtilModule,
    RouterModule.forChild([
      {
        path: '',
        component: Doc4BreadcrumbComponent,
      },
    ]),
  ],
})
export class Doc4BreadcrumbsModule {}
