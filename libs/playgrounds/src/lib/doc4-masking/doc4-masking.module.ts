import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { RouterModule } from '@angular/router'
import { DsMaskingModule } from '@cutcal/common-ui'
import { DocUtilModule } from '../doc-utils.module'
import { Doc4MaskingComponent } from './doc4-masking.component'

@NgModule({
  declarations: [Doc4MaskingComponent],
  imports: [
    CommonModule,
    DsMaskingModule,
    DocUtilModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: Doc4MaskingComponent
      }
    ])
  ]
})
export class Doc4MaskingModule {}
