import { Message } from '@cutcal/api-interfaces';
import { HttpService, Injectable } from '@nestjs/common';
import * as cheerio from 'cheerio';
import * as rp from 'request-promise';
@Injectable()
export class AppService {

  constructor(private readonly http: HttpService) { }

  getData(): Message {
    return { message: 'Welcome to api!3' }
  }

  async scrapeDescription(link: string): Promise<Message>  {
    return { message: pluckEarlyParagraphs(await rp(link))}
  }
}

function pluckEarlyParagraphs(html: string): string {

  let pastTable = false
  let pastToc = false

  const $ = cheerio.load(html)

  const description = $('.mw-parser-output').children().map((i, e) => {
    if (pastTable) {
      if (e.tagName === 'div') pastToc = true
      if (!pastToc) return $(e).text()
    }
    if (e.tagName === 'table') pastTable = true
    return ''
  }).get().join(' ')
  console.log(description)

  return stripAnnotations(description)
}


function stripAnnotations(text: string): string {
  return text.trim()
    .replace(/\r\n|\n|\r/gm, '')
    .replace(/\s*\[.*?\]s*/gm, '')
    .replace('  ', ' ')
}
