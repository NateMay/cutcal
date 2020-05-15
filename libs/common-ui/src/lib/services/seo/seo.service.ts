import { Injectable } from '@angular/core'
import { Meta } from '@angular/platform-browser'

// DISTANT (SEO) reconfigure like this:
/**
 * @example
 * const config = {
 *   twitter: {
 *     card: 'string'
 *     site: 'string'
 *     title: 'string'
 *     description: 'string'
 *     image: 'string'
 *   }
 * }
 *
 */
export interface MetaTagConfig {
  title?: string
  description?: string
  image?: string
  slug?: string
}

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  constructor(private meta: Meta) {}

  generateTags(config: MetaTagConfig): void {
    // default values
    // TODO (move) to firebase and keep in localStorage
    config = {
      title: 'CutCal.com',
      description:
        'Nutrition Calendar, Meal Planner, Food & Recipe Database, Grocery List',
      image: 'https:....',
      slug: '',
      ...config
    }

    this.meta.updateTag({ name: 'twitter:card', content: 'summary' })
    this.meta.updateTag({ name: 'twitter:site', content: '@cutcal' })
    if (config.title)
      this.meta.updateTag({ name: 'twitter:title', content: config.title })
    if (config.description)
      this.meta.updateTag({
        name: 'twitter:description',
        content: config.description
      })
    if (config.image)
      this.meta.updateTag({ name: 'twitter:image', content: config.image })

    this.meta.updateTag({ property: 'og:type', content: 'article' })
    this.meta.updateTag({ property: 'og:site_name', content: 'CutCal' })
    if (config.title)
      this.meta.updateTag({ property: 'og:title', content: config.title })
    if (config.description)
      this.meta.updateTag({
        property: 'og:description',
        content: config.description
      })
    if (config.image)
      this.meta.updateTag({ property: 'og:image', content: config.image })
    if (config.slug)
      this.meta.updateTag({
        property: 'og:url',
        content: `https://cutcal.com/${config.slug}`
      })
  }
}
