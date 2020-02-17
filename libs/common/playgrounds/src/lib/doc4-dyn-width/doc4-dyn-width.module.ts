import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DocUtilModule } from '../doc-utils.module';
import { Doc4DynWidthComponent } from './doc4-dyn-width.component';

@NgModule({
  declarations: [Doc4DynWidthComponent],
  imports: [
    CommonModule,
    DocUtilModule,
    RouterModule.forChild([
      {
        path: '',
        component: Doc4DynWidthComponent,
      },
    ]),
  ],
})
export class Doc4DynWidthModule {}
