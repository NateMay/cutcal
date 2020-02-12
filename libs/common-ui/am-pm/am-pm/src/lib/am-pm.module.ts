import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { AmPmToggleComponent } from './am-pm-toggle.component'

@NgModule({
  declarations: [AmPmToggleComponent],
  exports: [AmPmToggleComponent],
  imports: [CommonModule],
})
export class AmPmModule {}
