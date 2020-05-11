import { HttpService, Injectable } from '@nestjs/common'

@Injectable()
export class FdcService {
  readonly endPoint = 'https://api.nal.usda.gov/fdc/v1'
  readonly searchEndPoint = 'https://fdc.nal.usda.gov/portal-data/external/'
  readonly apiKey = 'vWDhyXr0dktjb2xa7p8R2CockacoIMFEWDl8jx0R'

  constructor(private readonly http: HttpService) {}

  /**
   * @prod https://us-central1-cutcal.cloudfunctions.net/api/hello
   */
  // dumpFood(fdcId: number | string): Message {
  //   this.http.get(`${this.searchEndPoint}/${fdcId}`).
  //   return { message: 'Welcome to api!' }
  // }

  // async scrapeDescription(link: string): Promise<Message> {
  //   return { message: pluckEarlyParagraphs(await rp(link)) }
  // }
}
