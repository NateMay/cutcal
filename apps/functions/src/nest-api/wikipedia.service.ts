import { Message } from '@cutcal/api-interfaces'
import { HttpService, Injectable } from '@nestjs/common'
import * as cheerio from 'cheerio'
import * as rp from 'request-promise'

@Injectable()
export class WikiService {
  constructor(private readonly http: HttpService) {}

  /**
   * @prod https://us-central1-cutcal.cloudfunctions.net/api/hello
   */
  getData(): Message {
    return { message: 'Welcome to api!' }
  }

  async scrapeDescription(link: string): Promise<Message> {
    return { message: pluckEarlyParagraphs(await rp(link)) }
  }
}

const pluckEarlyParagraphs = (html: string): string => {
  let pastTable = false
  let pastToc = false

  const $ = cheerio.load(html)

  const description = $('.mw-parser-output')
    .children()
    .map((i, e) => {
      if (pastTable) {
        if (e.tagName === 'div') pastToc = true
        if (!pastToc) return $(e).text()
      }
      if (e.tagName === 'table') pastTable = true
      return ''
    })
    .get()
    .join(' ')

  // console.log(description)

  return stripAnnotations(description)
}

const stripAnnotations = (text: string): string =>
  text
    .trim()
    .replace(/\r\n|\n|\r/gm, '')
    .replace(/\s*\[.*?\]s*/gm, '')
    .replace('  ', ' ')