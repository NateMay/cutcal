import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { DocUtilModule } from '../doc-utils.module'
import { Doc4ImgUploadComponent } from './doc4-img-upload.component'

@NgModule({
  declarations: [Doc4ImgUploadComponent],
  imports: [
    CommonModule,
    DocUtilModule,
    RouterModule.forChild([
      {
        path: '',
        component: Doc4ImgUploadComponent,
      },
    ]),
  ],
})
export class Doc4ImgUploadModule {}
