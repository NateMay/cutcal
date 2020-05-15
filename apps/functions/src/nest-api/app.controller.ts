import { WikiDescription } from '@cutcal/api-interfaces'
import { Body, Controller, Get, Post } from '@nestjs/common'
import { WikiService } from './wikipedia.service'

@Controller()
export class AppController {
  constructor(private readonly wikipedia: WikiService) {}

  /**
   * @prod https://us-central1-cutcal.cloudfunctions.net/api/hello
   */
  @Get('hello')
  getData(): any {
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
