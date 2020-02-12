import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CollectionPipe } from './collection.pipe';

@NgModule({
  declarations: [CollectionPipe],
  exports: [CollectionPipe],
  imports: [ CommonModule]
})
export class CollectionPipeModule { }
