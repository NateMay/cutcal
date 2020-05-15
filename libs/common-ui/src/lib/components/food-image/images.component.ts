import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { KVP } from '@cutcal/core'
import { Image } from '@cutcal/diet'

// TODO (images) if no image, give option to select from a list of google images of the same name

/**
 * Presents primary and secondary images
 */
@Component({
  selector: 'cc-images',
  styleUrls: ['./images.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'cc-images' },
  template: `
    <img
      class="primary-image"
      aria-hidden="true"
      [attr.src]="primaryImage?.url || '../../../../assets/svgs/meal.svg'"
      [attr.alt]="foodAltText"
    />
  `
})
export class ImagesComponent {
  @Input() primaryImage: Image
  @Input() secondaryImages: KVP<Image>

  @Input() foodAltText: string

  constructor() {}
}
