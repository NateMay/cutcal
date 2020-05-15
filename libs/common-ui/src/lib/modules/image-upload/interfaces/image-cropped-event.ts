import { CropperPosition } from './cropper-position'

export interface ImageCroppedEvent {
  base64?: string | null
  file?: Blob | null
  width: number
  height: number
  cropperPosition: CropperPosition
  imagePosition: CropperPosition
}
