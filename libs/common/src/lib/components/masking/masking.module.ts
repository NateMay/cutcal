import { ClipboardModule } from '@angular/cdk/clipboard'
import { PlatformModule } from '@angular/cdk/platform'
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { NAVIGATOR_PROVIDER } from '../../services/navigator.service'
import { CcCurrencyMask } from './currency-mask'
import { CcFixedMask } from './fixed-mask'
import { CcMaskedInput } from './masking-base'

const COMPONENTS = [CcMaskedInput, CcFixedMask, CcCurrencyMask]

const MODULES = [
  CommonModule,
  ReactiveFormsModule,
  PlatformModule,
  ClipboardModule
]

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...MODULES],
  exports: [...COMPONENTS],
  providers: [NAVIGATOR_PROVIDER]
})
export class CcMaskingModule {}
