import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DocUtilModule } from '../doc-utils.module';
import { Doc4CarouselComponent } from './doc4-carousel.component';

@NgModule({
  declarations: [Doc4CarouselComponent],
  imports: [
    CommonModule,
    DocUtilModule,
    RouterModule.forChild([
      {
        path: '',
        component: Doc4CarouselComponent,
      },
    ]),
  ],
})
export class Doc4CarouselModule {}
