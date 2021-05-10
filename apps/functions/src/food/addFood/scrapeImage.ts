import { GoogleImageResponse } from '@cutcal/api-interfaces'
import * as rp from 'request-promise'

const apiKey = 'AIzaSyAspWF0dPGZo9XRlZpTn4j3ZzoAtrJJIpA'
const engine = '005525034399704142974:1sy7z2dck5j'
const endPoint = 'https://www.googleapis.com/customsearch/v1'
const STATIC_QUERIES = 'searchType=image&safe=active'

const IMAGE_CACHE: { [key: string]: string } = {}

export const scrapeImage = async (cleanTerm: string): Promise<string> => {
  if (!IMAGE_CACHE[cleanTerm]) {
    const jsresponse: string = await rp({
      method: 'GET',
      uri: `${endPoint}?key=${apiKey}&cx=${engine}&q=${cleanTerm}&${STATIC_QUERIES}`
    }).catch(console.error)

    const response: GoogleImageResponse = JSON.parse(jsresponse)

    IMAGE_CACHE[cleanTerm] = response.items.map((item) => item.link)[0]
  }

  return IMAGE_CACHE[cleanTerm]
}
