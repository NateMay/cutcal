import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MemoizePipe } from './memoize.pipe';

@NgModule({
  declarations: [MemoizePipe],
  exports: [MemoizePipe],
  imports: [ CommonModule ]
})
export class MemoizePipeModule { }
