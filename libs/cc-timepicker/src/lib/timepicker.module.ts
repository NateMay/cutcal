import { A11yModule } from '@angular/cdk/a11y'
import { OverlayModule } from '@angular/cdk/overlay'
import { PortalModule } from '@angular/cdk/portal'
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatDialogModule } from '@angular/material/dialog'
import { AmPmToggleModule, StyleSanitizerModule } from '@cutcal/common-ui'
import { DsTimepicker12HoursFaceComponent } from './12-hours-face'
import { DsTimepicker24HoursFaceComponent } from './24-hours-face'
import { DsTimepickerMinutesFace } from './minutes-face'
import { DsMinutesFormatterPipe } from './minutes-formatter'
import {
  DsTimepicker,
  CC_TIMEPICKER_SCROLL_STRATEGY_FACTORY_PROVIDER
} from './timepicker'
import { DsTimepickerContent, DsTimePickerDialog } from './timepicker-content'
import { DsTimePickerControls } from './timepicker-controls'
import { DsTimepickerFace } from './timepicker-face'
import { DsTimepickerInput } from './timepicker-input'
import { DsTimepickerPeriodComponent } from './timepicker-period'
import { DsTimepickerToggle } from './timepicker-toggle'

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    OverlayModule,
    A11yModule,
    PortalModule,
    AmPmToggleModule,
    StyleSanitizerModule
  ],
  declarations: [
    DsTimepicker,
    DsTimepickerToggle,
    DsTimepickerInput,
    DsTimepickerContent,
    DsTimePickerDialog,
    DsTimepickerMinutesFace,
    DsTimepickerPeriodComponent,
    DsTimepicker12HoursFaceComponent,
    DsTimepicker24HoursFaceComponent,
    DsTimepickerFace,
    DsMinutesFormatterPipe,
    DsTimePickerControls
  ],
  exports: [
    DsTimepicker,
    DsTimepickerToggle,
    DsTimepickerInput,
    DsTimepickerContent,
    DsTimePickerDialog,
    DsTimePickerControls
  ],
  providers: [CC_TIMEPICKER_SCROLL_STRATEGY_FACTORY_PROVIDER]
})
export class DsTimepickerModule {}
