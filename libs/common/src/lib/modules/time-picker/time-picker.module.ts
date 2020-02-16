import { A11yModule } from '@angular/cdk/a11y'
import { OverlayModule } from '@angular/cdk/overlay'
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FlexLayoutModule } from '@angular/flex-layout'
import { FormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { AmPmToggleModule } from '../../components/am-pm-toggle/am-pm-toggle.module'
import { PipesModule } from '../../pipes/pipes.module'
import { Timepicker12HoursFaceComponent } from './components/time-picker-12-hours-face/time-picker-12-hours-face.component'
import { Timepicker24HoursFaceComponent } from './components/time-picker-24-hours-face/time-picker-24-hours-face.component'
import { TimepickerDialControlComponent } from './components/time-picker-dial-control/time-picker-dial-control.component'
import { TimepickerDialComponent } from './components/time-picker-dial/time-picker-dial.component'
import { TimepickerDialogComponent } from './components/time-picker-dialog/time-picker-dialog.component'
import { TimepickerFaceComponent } from './components/time-picker-face/time-picker-face.component'
import { TimePickerInputComponent } from './components/time-picker-input/time-picker-input.component'
import { TimepickerMinutesFaceComponent } from './components/time-picker-minutes-face/time-picker-minutes-face.component'
import { TimepickerPeriodComponent } from './components/time-picker-period/time-picker-period.component'
import { MinutesFormatterPipe } from './pipes/minutes-formatter.pipe'

/**
 * forked from:
 * @reference [ngx-material-timepicker] {@link https://agranom.github.io/ngx-material-timepicker/}
 */

const COMPONENTS = [
  TimepickerDialogComponent,
  Timepicker24HoursFaceComponent,
  Timepicker12HoursFaceComponent,
  TimepickerMinutesFaceComponent,
  TimepickerFaceComponent,
  TimepickerDialComponent,
  TimepickerDialControlComponent,
  TimepickerPeriodComponent,
  TimePickerInputComponent,
  MinutesFormatterPipe,
]

const MATERIAL = [
  FlexLayoutModule,
  MatFormFieldModule,
  MatInputModule,
  OverlayModule,
  MatIconModule,
  MatButtonModule,
  A11yModule,
]
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PipesModule,
    MatButtonModule,
    AmPmToggleModule,
    ...MATERIAL,
  ],
  exports: [...COMPONENTS],
  declarations: [...COMPONENTS],
  entryComponents: [TimepickerDialogComponent],
})
export class TimePickerModule {}
