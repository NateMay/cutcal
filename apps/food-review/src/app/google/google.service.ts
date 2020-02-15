import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

export interface WikiDetails {
  snippet: string
  link: string
  img: string
}

interface EngineResponse {
  items: EngineItem[]
}
interface EngineItem {
  pagemap: PageMap
  snippet: string
  link: string
}
interface PageMap {
  metatags: any[]
  cse_image: any[]
}

@Injectable({
  providedIn: 'root',
})
export class GoogleService {
  readonly apiKey = 'AIzaSyAspWF0dPGZo9XRlZpTn4j3ZzoAtrJJIpA'
  // https://cse.google.com/cse/all
  readonly engine = '005525034399704142974:oxjpozizj0m'
  readonly endPoint = 'https://www.googleapis.com/customsearch/v1'

  constructor(private http: HttpClient) {}

  getWikiDetails(
    searchTerm: string,
    itemNum: number = 0
  ): Observable<WikiDetails> {
    const modified = searchTerm
      .trim()
      .replace(/\s\s+/g, ' ')
      .replace(' ', '+')
    return this.http
      .get<EngineResponse>(
        `${this.endPoint}?key=${this.apiKey}&cx=${this.engine}&q=${modified}`
      )
      .pipe(
        map((response: EngineResponse) => {
          const item0 = response.items[itemNum]
          let image
          try {
            const meta = item0.pagemap.metatags
            const cse = item0.pagemap.cse_image
            image = meta[0]['og:image'] || cse[0].src
          } catch {
            image = '../../../../assets/svgs/food.svg'
          }
          return {
            snippet: item0.snippet,
            link: item0.link,
            img: image,
          }
        })
      )
  }
}
