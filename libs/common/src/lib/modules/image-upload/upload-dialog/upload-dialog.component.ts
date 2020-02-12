import { Component, Inject, ViewChild } from '@angular/core'
import { ImageCropperComponent } from '../image-cropper/image-cropper.component'
import { ImageCroppedEvent } from '../interfaces/image-cropped-event'
import {
  ImageCroperData,
  IMAGE_CROPPER_DATA,
} from '../utils/image-cropper.data'

@Component({
  selector: 'cc-upload-dialog',
  styleUrls: ['./upload-dialog.component.scss'],
  template: `
    <mat-card class="example-card">
      <mat-card-header>
        <img mat-card-avatar [src]="croppedImage" />
        <mat-card-title>Title</mat-card-title>
        <mat-card-subtitle>Subtitle</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <div>
          <cc-image-cropper
            [imageChangedEvent]="imageChangedEvent"
            [maintainAspectRatio]="true"
            [aspectRatio]="1 / 1"
            [resizeToWidth]="128"
            [cropperMinWidth]="128"
            [onlyScaleDown]="true"
            [roundCropper]="false"
            format="png"
            outputType="base64"
            (imageCropped)="cropped($event)"
            (imageLoaded)="data.imageLoaded()"
            (cropperReady)="data.cropperReady()"
            (startCropImage)="data.startCropImage()"
            (loadImageFailed)="data.loadImageFailed()"
            (imageCroppedFile)="data.imageCroppedFile($event)"
            (imageCroppedBase64)="data.imageCroppedBase64($event)"
          ></cc-image-cropper>
        </div>

        <div fxLayout="row">
          <img [src]="croppedImage" />

          <div
            class="controls"
            fxLayout="column"
            fxLayoutAlign="space-evenly center"
            fxFlex="1 1 auto"
          >
            <div class="flip" fxLayout="row">
              <button mat-button (click)="flipVertical()">
                <mat-icon aria-label="Rotate Horizontal">swap_horiz</mat-icon>
                Flip Vertically
              </button>
            </div>

            <div class="rotate" fxLayout="row">
              <button mat-button (click)="rotateLeft()">
                <mat-icon aria-label="Rotate Left">rotate_left</mat-icon>
                Rotate Left
              </button>

              <button mat-button (click)="rotateRight()">
                <mat-icon aria-label="Rotate Right">rotate_right</mat-icon>
                Rotate Right
              </button>
            </div>

            <div class="flip" fxLayout="row">
              <button mat-button (click)="flipHorizontal()">
                <mat-icon aria-label="Rotate Horizontal">swap_horiz</mat-icon>
                Flip Horiztonally
              </button>
            </div>
          </div>
        </div>
      </mat-card-content>

      <mat-card-actions>
        <button mat-button (click)="data.closeDialog()">DONE</button>
      </mat-card-actions>
    </mat-card>
  `,
})
export class UploadDialogComponent {
  imageChangedEvent: any = ''
  croppedImage: any = ''

  @ViewChild(ImageCropperComponent, { static: true })
  imageCropper: ImageCropperComponent

  constructor(@Inject(IMAGE_CROPPER_DATA) public data: ImageCroperData) {
    this.imageChangedEvent = data.event
  }

  cropped(event: ImageCroppedEvent) {
    this.data.imageCropped(event)
    this.croppedImage = event.base64
  }

  rotateLeft() {
    this.imageCropper.rotateLeft()
  }
  rotateRight() {
    this.imageCropper.rotateRight()
  }
  flipHorizontal() {
    this.imageCropper.flipHorizontal()
  }
  flipVertical() {
    this.imageCropper.flipVertical()
  }
}
