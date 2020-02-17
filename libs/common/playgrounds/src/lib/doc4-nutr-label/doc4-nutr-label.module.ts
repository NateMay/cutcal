import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DocUtilModule } from '../doc-utils.module';
import { Doc4NutrLabelComponent } from './doc4-nutr-label.component';

@NgModule({
  declarations: [Doc4NutrLabelComponent],
  imports: [
    CommonModule,
    DocUtilModule,
    RouterModule.forChild([
      {
        path: '',
        component: Doc4NutrLabelComponent,
      },
    ]),
  ],
})
export class Doc4NutrLabelModule {}
