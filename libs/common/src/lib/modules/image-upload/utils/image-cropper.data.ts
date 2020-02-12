import { InjectionToken } from '@angular/core'

export const IMAGE_CROPPER_DATA = new InjectionToken<{}>('ImageCropperData')

export interface ImageCroperData {
  event: any
  closeDialog: () => void
  startCropImage: () => void
  imageCropped: (e) => void
  imageCroppedBase64: (e) => void
  imageCroppedFile: (e) => void
  imageLoaded: () => void
  cropperReady: () => void
  loadImageFailed: () => void
}
