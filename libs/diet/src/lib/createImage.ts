import { Image } from './images'

export function createImage(url: string, uploaderId?: string): Image {
  return {
    url,
    votes: 0,
    uploaderId,
  }
}
