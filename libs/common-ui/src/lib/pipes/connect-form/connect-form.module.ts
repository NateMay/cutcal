import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ConnectFormDirective } from './connect-form.dir'

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [ConnectFormDirective],
  exports: [ConnectFormDirective]
})
export class ConnectFormModule {}
