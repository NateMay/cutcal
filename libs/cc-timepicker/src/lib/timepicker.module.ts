import { A11yModule } from '@angular/cdk/a11y'
import { OverlayModule } from '@angular/cdk/overlay'
import { PortalModule } from '@angular/cdk/portal'
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatDialogModule } from '@angular/material/dialog'
import { AmPmToggleModule, StyleSanitizerModule } from '@cutcal/common'
import { MinutesFormatterPipe } from './pipes/minutes-formatter.pipe'
import { Timepicker12HoursFaceComponent } from './time-picker-12-hours-face/time-picker-12-hours-face.component'
import { Timepicker24HoursFaceComponent } from './time-picker-24-hours-face/time-picker-24-hours-face.component'
import { TimepickerFaceComponent } from './time-picker-face/time-picker-face.component'
import { TimepickerMinutesFaceComponent } from './time-picker-minutes-face/time-picker-minutes-face.component'
import { TimepickerPeriodComponent } from './time-picker-period/time-picker-period.component'
import {
  CcTimepicker,
  CC_TIMEPICKER_SCROLL_STRATEGY_FACTORY_PROVIDER,
} from './timepicker'
import { CcTimepickerContent, CcTimePickerFace } from './timepicker-content'
import { CcTimepickerInput } from './timepicker-input'
import { CcTimepickerToggle } from './timepicker-toggle'

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    OverlayModule,
    A11yModule,
    PortalModule,
    AmPmToggleModule,
    StyleSanitizerModule,
  ],
  declarations: [
    CcTimepicker,
    CcTimepickerToggle,
    CcTimepickerInput,
    CcTimepickerContent,
    CcTimePickerFace,
    TimepickerMinutesFaceComponent,
    TimepickerPeriodComponent,
    Timepicker12HoursFaceComponent,
    Timepicker24HoursFaceComponent,
    TimepickerFaceComponent,
    MinutesFormatterPipe,
  ],
  exports: [
    CcTimepicker,
    CcTimepickerToggle,
    CcTimepickerInput,
    CcTimepickerContent,
    CcTimePickerFace,
  ],
  providers: [CC_TIMEPICKER_SCROLL_STRATEGY_FACTORY_PROVIDER],
})
export class CcTimepickerModule {}
