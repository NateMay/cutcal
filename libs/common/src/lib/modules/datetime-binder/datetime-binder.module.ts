import { OverlayModule } from '@angular/cdk/overlay'
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FlexLayoutModule } from '@angular/flex-layout'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { DatePickerModule } from '../date-picker/date-picker.module'
import { TimePickerModule } from '../time-picker/time-picker.module'
import { DatetimeBinderComponent } from './datetime-binder.component'

const COMPONENTS = [DatetimeBinderComponent]

const MODULES = [DatePickerModule, TimePickerModule]

const MATERIAL = [
  FlexLayoutModule,
  MatFormFieldModule,
  MatInputModule,
  OverlayModule,
  MatIconModule,
  MatButtonModule,
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ...MATERIAL,
    ...MODULES,
  ],

  declarations: [...COMPONENTS],

  exports: [...COMPONENTS],
})
export class DatetimeBinderModule {}
