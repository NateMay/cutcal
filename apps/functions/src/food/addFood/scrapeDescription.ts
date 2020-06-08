import * as cheerio from 'cheerio'
import * as rp from 'request-promise'
import { ADD_FOOD_DEBUG } from './addFoodDebug'

interface EngineResponse {
  items: EngineItem[]
}
interface EngineItem {
  pagemap: any
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

const apiKey = 'AIzaSyAspWF0dPGZo9XRlZpTn4j3ZzoAtrJJIpA'
const engine = '005525034399704142974:oxjpozizj0m'
const endPoint = 'https://www.googleapis.com/customsearch/v1'

export const scrapeDescription = async (cleanTerm: string): Promise<string> => {
  const jsresponse = await rp({
    method: 'GET',
    uri: `${endPoint}?key=${apiKey}&cx=${engine}&q=${cleanTerm}`
  }).catch(console.error)

  const response: EngineResponse = JSON.parse(jsresponse)
  if (ADD_FOOD_DEBUG) console.log('scrapeDescription', response)

  const link = response.items.map(item => item.link)
  if (ADD_FOOD_DEBUG) console.log('link', link)

  return pluckEarlyParagraphs(await rp(link[0]))
}

const pluckEarlyParagraphs = (html: string): string => {
  let foundSummary = false

  const $ = cheerio.load(html)

  const description = $('.mw-parser-output')
    .children()
    .map((i, e) => {
      if (e.tagName !== 'p' || $(e).hasClass('mw-empty-elt') || foundSummary)
        return ''
      else if (e.tagName == 'p') {
        foundSummary = true
        return $(e).text()
      } else return ''
    })
    .get()
    .join(' ')

  return stripAnnotations(description)
}

const stripAnnotations = (text: string): string =>
  text
    .trim()
    .replace(/\r\n|\n|\r/gm, '')
    .replace(/\s*\[.*?\]s*/gm, '')
    .replace(' (top left)', '')
    .replace(' (top right)', '')
    .replace(' (center left)', '')
    .replace(' (center right)', '')
    .replace(' (lower left)', '')
    .replace(' (lower right)', '')
    .replace('  ', ' ')
