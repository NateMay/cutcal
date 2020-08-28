import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { LazyImgDirective } from './lazy-img'

@NgModule({
  imports: [CommonModule],
  declarations: [LazyImgDirective],
  exports: [LazyImgDirective]
})
export class LazyImgModule {}
