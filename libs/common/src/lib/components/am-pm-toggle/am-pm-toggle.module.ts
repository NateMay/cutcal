import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AmPmToggleComponent } from './am-pm-toggle.component'

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [AmPmToggleComponent],
  exports: [AmPmToggleComponent],
})
export class AmPmToggleModule {}
