import { InjectionToken } from '@angular/core'
import { ImageCroppedEvent } from '../interfaces/image-cropped-event'

export const IMAGE_CROPPER_DATA = new InjectionToken<{}>('ImageCropperData')

export interface ImageCroperData {
  event: any
  closeDialog: () => void
  startCropImage: () => void
  imageCropped: (e: ImageCroppedEvent) => void
  imageCroppedBase64: (e: string) => void
  imageCroppedFile: (e: Blob) => void
  imageLoaded: () => void
  cropperReady: () => void
  loadImageFailed: () => void
}
