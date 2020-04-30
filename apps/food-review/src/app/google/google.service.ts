import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { get } from 'lodash'
import { Observable } from 'rxjs'
import { map, shareReplay } from 'rxjs/operators'

export interface WikiDetails {
  snippet: string
  link: string
  imgs: string[]
  title: string
}

interface EngineResponse {
  items: EngineItem[]
}
interface EngineItem {
  pagemap: PageMap
  snippet: string
  link: string
  title: string
  cacheId: string
  displayLink: string
  formattedUrl: string
  htmlFormattedUrl: string
  htmlSnippet: string
  htmlTitle: string
  kind: string
}
interface PageMap {
  metatags?: WikiMetaTag[]
  cse_image?: WikiImage[]
  cse_thumbnail?: WikiImage[]
}
interface WikiImage {
  src: string
}
interface WikiMetaTag {
  referrer: string
  'og:image': string
}
/**
 * @see [Custom Search](https://cse.google.com/cse/all)
 */

@Injectable({
  providedIn: 'root'
})
export class GoogleService {
  readonly apiKey = 'AIzaSyAspWF0dPGZo9XRlZpTn4j3ZzoAtrJJIpA'
  readonly engine = '005525034399704142974:oxjpozizj0m'
  readonly endPoint = 'https://www.googleapis.com/customsearch/v1'

  constructor(private readonly http: HttpClient) {}

  endpoint(searchTerm: string): string {
    const cleanTerm = searchTerm
      .trim()
      .replace(/\s\s+/g, ' ')
      .replace(' ', '+')
    return `${this.endPoint}?key=${this.apiKey}&cx=${this.engine}&q=${cleanTerm}`
  }

  getSearchResults(searchTerm: string): Observable<WikiDetails[]> {
    return this.http.get<EngineResponse>(this.endpoint(searchTerm)).pipe(
      map((response: EngineResponse) =>
        response.items.map(item => ({
          snippet: item.snippet,
          link: item.link,
          imgs: this.getImages(item.pagemap),
          title: item.title.replace(' - Wikipedia', '')
        }))
      ),
      shareReplay()
    )
  }

  getImages(pagemap: PageMap): string[] {
    return [
      get(pagemap, 'cse_image[0].src'),
      get(pagemap, 'cse_thumbnail[0].src'),
      get(pagemap, `metatags[0]['og:image']`)
    ]
  }
}
