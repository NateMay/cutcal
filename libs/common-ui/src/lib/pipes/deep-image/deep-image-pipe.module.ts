import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { DeepImagePipe } from './deep-image.pipe'

@NgModule({
  declarations: [DeepImagePipe],
  exports: [DeepImagePipe],
  imports: [CommonModule]
})
export class DeepImagePipeModule {}
