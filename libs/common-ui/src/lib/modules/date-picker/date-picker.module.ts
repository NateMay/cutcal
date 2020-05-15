import { A11yModule } from '@angular/cdk/a11y'
import { OverlayModule } from '@angular/cdk/overlay'
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FlexLayoutModule } from '@angular/flex-layout'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { PipesModule } from '../../pipes/pipes.module'
import { CalendarControlsComponent } from './calendar-controls/calendar-controls.component'
import { CalendarFaceComponent } from './calendar-face/calendar-face.component'
import { DatePickerDialogComponent } from './date-picker-dialog/date-picker-dialog.component'
import { DatePickerInputComponent } from './date-picker-input/date-picker-input.component'
import { DatePickerMonthsComponent } from './date-picker-months/date-picker-months.component'
import { DatePickerYearsComponent } from './date-picker-years/date-picker-years.component'

const COMPONENTS = [
  DatePickerInputComponent,
  DatePickerDialogComponent,
  CalendarFaceComponent,
  CalendarControlsComponent,
  DatePickerMonthsComponent,
  DatePickerYearsComponent
]

const MATERIAL = [
  FlexLayoutModule,
  MatFormFieldModule,
  MatInputModule,
  OverlayModule,
  MatIconModule,
  MatButtonModule,
  A11yModule
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
    ...MATERIAL
  ],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
  entryComponents: [DatePickerDialogComponent]
})
export class DatePickerModule {}
