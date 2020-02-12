import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { DocPipe } from './doc.pipe'

@NgModule({
  declarations: [DocPipe],
  exports: [DocPipe],
  imports: [CommonModule],
})
export class DocPipeModule {}
