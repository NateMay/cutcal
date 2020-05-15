import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FlipCardComponent } from './flip-card.component'

@NgModule({
  declarations: [FlipCardComponent],
  exports: [FlipCardComponent],
  imports: [CommonModule]
})
export class FlipCardModule {}
