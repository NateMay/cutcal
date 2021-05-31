import { WikiDescription } from '@cutcal/core'
import { Body, Controller, Get, Post } from '@nestjs/common'
import { WikiService, DumbResponse } from './wikipedia.service'

@Controller()
export class AppController {
  constructor(private readonly wikipedia: WikiService) {}

  /**
   * @prod https://us-central1-cutcal.cloudfunctions.net/api/hello
   */
  @Get('hello')
  getData(): DumbResponse {
    return this.wikipedia.getData()
  }

  /**
   * @prod https://us-central1-cutcal.cloudfunctions.net/api/wikipedia-description
   */
  @Post('wikipedia-description')
  async getDescription(@Body('link') link: string): Promise<WikiDescription> {
    return this.wikipedia.scrapeDescription(link)
  }
}
