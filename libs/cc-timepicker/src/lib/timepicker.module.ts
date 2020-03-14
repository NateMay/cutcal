import { A11yModule } from '@angular/cdk/a11y'
import { OverlayModule } from '@angular/cdk/overlay'
import { PortalModule } from '@angular/cdk/portal'
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatDialogModule } from '@angular/material/dialog'
import { CcTimepicker, CC_TIMEPICKER_SCROLL_STRATEGY_FACTORY_PROVIDER } from './timepicker'
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
  ],
  declarations: [
    CcTimepicker,
    CcTimepickerToggle,
    CcTimepickerInput,
    CcTimepickerContent,
    CcTimePickerFace,
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
