import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { AnimateComponent } from './animate.component'

@NgModule({
  declarations: [AnimateComponent],
  exports: [AnimateComponent],
  imports: [CommonModule],
})
export class CCAnimationsModule {}
