import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { StripHtmlPipe } from './strip-html.pipe'

@NgModule({
  declarations: [StripHtmlPipe],
  exports: [StripHtmlPipe],
  imports: [CommonModule]
})
export class StripHtmlPipeModule {}
