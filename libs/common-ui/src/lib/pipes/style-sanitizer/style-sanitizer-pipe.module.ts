import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { StyleSanitizerPipe } from './style-sanitizer.pipe'

@NgModule({
  declarations: [StyleSanitizerPipe],
  exports: [StyleSanitizerPipe],
  imports: [CommonModule]
})
export class StyleSanitizerModule {}
