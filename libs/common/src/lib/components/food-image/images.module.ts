import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ImagesComponent } from './images.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ImagesComponent],
  exports: [ImagesComponent ]
})
export class ImagesModule {}
