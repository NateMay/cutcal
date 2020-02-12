import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UnitPipe } from './unit.pipe';

@NgModule({
  declarations: [UnitPipe],
  exports: [UnitPipe],
  imports: [
    CommonModule
  ]
})
export class UnitPipeModule { }
