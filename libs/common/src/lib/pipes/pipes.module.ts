import { NgModule } from '@angular/core'
import { DocPipeModule } from './doc/doc-pipe.module'
import { MemoizePipeModule } from './memoize/memoize-pipe.module'
import { PluralPipeModule } from './plural/plural-pipe.module'
import { StripHtmlPipe } from './strip-html/strip-html.pipe'
import { StyleSanitizerModule } from './style-sanitizer/style-sanitizer-pipe.module'
import { UnitPipeModule } from './unit/unit-pipe.module'

const PIPE_MODULES = [
  PluralPipeModule,
  MemoizePipeModule,
  DocPipeModule,
  StyleSanitizerModule,
  UnitPipeModule,
]

@NgModule({
  imports: [...PIPE_MODULES],
  exports: [...PIPE_MODULES],
  declarations: [StripHtmlPipe],
})
export class PipesModule {}
