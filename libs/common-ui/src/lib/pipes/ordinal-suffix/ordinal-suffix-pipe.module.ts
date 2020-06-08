import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { OrdinalSuffixPipe } from './ordinal-suffix.pipe'

@NgModule({
  declarations: [OrdinalSuffixPipe],
  exports: [OrdinalSuffixPipe],
  imports: [CommonModule]
})
export class OrdinalSuffixPipeModule {}
