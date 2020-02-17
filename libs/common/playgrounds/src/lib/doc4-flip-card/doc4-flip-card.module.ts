import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DocUtilModule } from '../doc-utils.module';
import { Doc4FlipCardComponent } from './doc4-flip-card.component';

@NgModule({
  declarations: [Doc4FlipCardComponent],
  imports: [
    CommonModule,
    DocUtilModule,
    RouterModule.forChild([
      {
        path: '',
        component: Doc4FlipCardComponent,
      },
    ]),
  ],
})
export class Doc4FlipCardModule {}
