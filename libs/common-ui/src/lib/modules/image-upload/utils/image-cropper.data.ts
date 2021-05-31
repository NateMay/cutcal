import { InjectionToken } from '@angular/core'
import { ImageCroppedEvent } from '../interfaces/image-cropped-event'
import { HTMLInputEvent } from '../image-cropper/image-cropper.component';

export const IMAGE_CROPPER_DATA = new InjectionToken<unknown>('ImageCropperData')

export interface ImageCroperData {
  event: HTMLInputEvent
  closeDialog: () => void
  startCropImage: () => void
  imageCropped: (e: ImageCroppedEvent) => void
  imageCroppedBase64: (e: string) => void
  imageCroppedFile: (e: Blob) => void
  imageLoaded: () => void
  cropperReady: () => void
  loadImageFailed: () => void
}
