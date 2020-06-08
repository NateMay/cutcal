import { Pipe, PipeTransform } from '@angular/core'
import { devError } from '../../functions/devError'

export interface CCDeepImage {
  id: string
  food_id: string
  src?: string
  img?: string
}

@Pipe({
  name: 'deepImage',
  pure: true
})
export class DeepImagePipe implements PipeTransform {
  transform(
    path: string,
    id: string,
    type: 'usage' | 'meal' = 'usage'
  ): string {
    if (!id) {
      devError('Deep Image pipe did not receive an "_id" for association')
      return path
    }

    const key = `CC_DEEP_IMAGE_${id}`
    const cached = localStorage.getItem(key)

    if (cached) return cached
    else {
      // TODO: get the food for the store and check the id
    }
  }

  // constructor(private Fire)
}
