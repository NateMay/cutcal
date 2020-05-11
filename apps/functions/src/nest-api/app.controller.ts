import { Message } from '@cutcal/api-interfaces'
import { Body, Controller, Get, Post } from '@nestjs/common'
import { WikiService } from './wikipedia.service'

@Controller()
export class AppController {
  constructor(private readonly appService: WikiService) {}

  @Get('hello')
  getData(): Message {
    return this.appService.getData()
  }

  @Post('wikipedia')
  async getFood(@Body('link') link: string): Promise<Message> {
    return this.appService.scrapeDescription(link)
  }
}
