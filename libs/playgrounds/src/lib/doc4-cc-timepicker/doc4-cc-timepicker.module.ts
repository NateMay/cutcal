import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CcTimepickerModule } from '@cutcal/cc-timepicker';
import { DocUtilModule } from '../doc-utils.module';
import { Doc4CcTimepickerComponent } from './doc4-cc-timepicker.component';



@NgModule({
  declarations: [Doc4CcTimepickerComponent],
  imports: [
    CommonModule,
    CcTimepickerModule,
    DocUtilModule,
    RouterModule.forChild([
      {
        path: '',
        component: Doc4CcTimepickerComponent,
      },
    ]),
  ],
})
export class Doc4CcTimepickerModule { }
