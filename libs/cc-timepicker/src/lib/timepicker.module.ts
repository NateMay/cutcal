import { A11yModule } from '@angular/cdk/a11y'
import { OverlayModule } from '@angular/cdk/overlay'
import { PortalModule } from '@angular/cdk/portal'
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatDialogModule } from '@angular/material/dialog'
import { AmPmToggleModule, StyleSanitizerModule } from '@cutcal/common'
import { CcTimepicker12HoursFaceComponent } from './12-hours-face'
import { CcTimepicker24HoursFaceComponent } from './24-hours-face'
import { CcTimepickerMinutesFace } from './minutes-face'
import { CcMinutesFormatterPipe } from './minutes-formatter'
import { CcTimepicker, CC_TIMEPICKER_SCROLL_STRATEGY_FACTORY_PROVIDER } from './timepicker'
import { CcTimepickerContent, CcTimePickerDialog } from './timepicker-content'
import { CcTimePickerControls } from './timepicker-controls'
import { CcTimepickerFace } from './timepicker-face'
import { CcTimepickerInput } from './timepicker-input'
import { CcTimepickerPeriodComponent } from './timepicker-period'
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
    CcTimePickerDialog,
    CcTimepickerMinutesFace,
    CcTimepickerPeriodComponent,
    CcTimepicker12HoursFaceComponent,
    CcTimepicker24HoursFaceComponent,
    CcTimepickerFace,
    CcMinutesFormatterPipe,
    CcTimePickerControls
  ],
  exports: [
    CcTimepicker,
    CcTimepickerToggle,
    CcTimepickerInput,
    CcTimepickerContent,
    CcTimePickerDialog,
    CcTimePickerControls
  ],
  providers: [CC_TIMEPICKER_SCROLL_STRATEGY_FACTORY_PROVIDER],
})
export class CcTimepickerModule {}
