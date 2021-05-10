import { A11yModule } from '@angular/cdk/a11y'
import { OverlayModule } from '@angular/cdk/overlay'
import { PortalModule } from '@angular/cdk/portal'
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatDialogModule } from '@angular/material/dialog'
import {
  DsDatepicker,
  CC_DATEPICKER_SCROLL_STRATEGY_FACTORY_PROVIDER
} from './datepicker'
import { DsDatepickerContent, DsDatePickerFace } from './datepicker-content'
import { DsDatepickerInput } from './datepicker-input'
import { DsDatepickerToggle } from './datepicker-toggle'

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    OverlayModule,
    A11yModule,
    PortalModule
  ],
  declarations: [
    DsDatepicker,
    DsDatepickerToggle,
    DsDatepickerInput,
    DsDatepickerContent,
    DsDatePickerFace
  ],
  exports: [
    DsDatepicker,
    DsDatepickerToggle,
    DsDatepickerInput,
    DsDatepickerContent,
    DsDatePickerFace
  ],
  providers: [CC_DATEPICKER_SCROLL_STRATEGY_FACTORY_PROVIDER]
})
export class DsDatepickerModule {}
