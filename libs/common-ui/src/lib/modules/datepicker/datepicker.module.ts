import { A11yModule } from '@angular/cdk/a11y'
import { OverlayModule } from '@angular/cdk/overlay'
import { PortalModule } from '@angular/cdk/portal'
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatDialogModule } from '@angular/material/dialog'
import {
  CcDatepicker,
  CC_DATEPICKER_SCROLL_STRATEGY_FACTORY_PROVIDER
} from './datepicker'
import { CcDatepickerContent, CcDatePickerFace } from './datepicker-content'
import { CcDatepickerInput } from './datepicker-input'
import { CcDatepickerToggle } from './datepicker-toggle'

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
    CcDatepicker,
    CcDatepickerToggle,
    CcDatepickerInput,
    CcDatepickerContent,
    CcDatePickerFace
  ],
  exports: [
    CcDatepicker,
    CcDatepickerToggle,
    CcDatepickerInput,
    CcDatepickerContent,
    CcDatePickerFace
  ],
  providers: [CC_DATEPICKER_SCROLL_STRATEGY_FACTORY_PROVIDER]
})
export class CcDatepickerModule {}
