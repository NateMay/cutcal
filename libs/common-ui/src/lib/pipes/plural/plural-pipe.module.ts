import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { PluralPipe } from './plural.pipe'

@NgModule({
  declarations: [PluralPipe],
  exports: [PluralPipe],
  imports: [CommonModule]
})
export class PluralPipeModule {}
