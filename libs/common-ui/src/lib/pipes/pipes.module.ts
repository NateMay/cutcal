import { NgModule } from '@angular/core'
import { DeepImagePipeModule } from './deep-image/deep-image-pipe.module'
import { DocPipeModule } from './doc/doc-pipe.module'
import { MemoizePipeModule } from './memoize/memoize-pipe.module'
import { OrdinalSuffixPipeModule } from './ordinal-suffix/ordinal-suffix-pipe.module'
import { PluralPipeModule } from './plural/plural-pipe.module'
import { StripHtmlPipeModule } from './strip-html/strip-html-pipe.module'
import { StyleSanitizerModule } from './style-sanitizer/style-sanitizer-pipe.module'
import { UnitPipeModule } from './unit/unit-pipe.module'

const PIPE_MODULES = [
  PluralPipeModule,
  MemoizePipeModule,
  DocPipeModule,
  StyleSanitizerModule,
  UnitPipeModule,
  OrdinalSuffixPipeModule,
  DeepImagePipeModule,
  StripHtmlPipeModule
]

@NgModule({
  imports: [...PIPE_MODULES],
  exports: [...PIPE_MODULES]
})
export class PipesModule {}
