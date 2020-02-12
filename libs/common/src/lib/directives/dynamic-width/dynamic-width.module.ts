import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { DynamicWidthDirective } from './dynamic-width.directive'

@NgModule({
  declarations: [DynamicWidthDirective],
  exports: [DynamicWidthDirective],
  imports: [CommonModule],
})
export class DynamicWidthModule {}
