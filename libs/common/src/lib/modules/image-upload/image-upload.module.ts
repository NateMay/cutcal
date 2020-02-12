import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { BasicsModule } from '../../basics.module';
import { ImageCropperComponent } from './image-cropper/image-cropper.component';
import { UploadButtonComponent } from './upload-button/upload-button.component';
import { UploadDialogComponent } from './upload-dialog/upload-dialog.component';

const COMPONENTS = [
  ImageCropperComponent,
  UploadButtonComponent,
  UploadDialogComponent
];

@NgModule({
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
  imports: [
    CommonModule,
    BasicsModule,
    FlexLayoutModule,
    OverlayModule,
    MatCardModule
  ]
})
export class ImageUploadModule { }
