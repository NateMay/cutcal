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

  // getFdcFood(fdcId: number | string, uid?: string): Observable<Food2> {
  //   // ?api_key=${this.apiKey}
  //   return this.http
  //     .get<FdcFoodDetailResponse>(`${this.endPoint2}/${fdcId}`)
  //     .pipe(
  //       map((response: FdcFoodDetailResponse) =>
  //         createFood2(
  //           response.description,
  //           this.nutritionFromResponse(response),
  //           response.description,
  //           response.id,
  //           response.description,
  //           this.portionsFromResponse(response),
  //           createPortion('g', 100),
  //           uid,
  //           this.tagsFromResponse(response),
  //           {},
  //           {}
  //         )
  //       ),
  //       shareReplay()
  //     )
  // }

  // queryFood(
  //   searchStr: string,
  //   page: number = 1
  // ): Observable<FDCFoodSearchResponse> {
  //   // https://DEMO_KEY@api.nal.usda.gov/fdc/v1/search
  //   return this.http.post<FDCFoodSearchResponse>(
  //     'https://fdc.nal.usda.gov/portal-data/external/search',
  //     {
  //       exactBrandOwner: null,
  //       generalSearchInput: searchStr,
  //       includeDataTypes: {
  //         'Survey (FNDDS)': true,
  //         Foundation: true,
  //         Branded: false,
  //         'SR Legacy': true
  //       },
  //       pageNumber: page.toString(),
  //       referenceFoodsCheckBox: 'true',
  //       sortCriteria: {
  //         sortColumn: 'description',
  //         sortDirection: 'asc'
  //       }
  //     }
  //   )
  // }

  // private nutritionFromResponse(
  //   response: FdcFoodDetailResponse
  // ): Nutrition<number> {
  //   const base: KVP<number> = {}
  //   const details = keyBy(NUTRIENTS.allDetails, 'id')
  //   response.foodNutrients.forEach((foodNutrient: FdcFoodNutrient) => {
  //     const meta = details[foodNutrient.nutrient.id]
  //     if (meta?.propName) base[meta.propName] = foodNutrient.value || 0
  //   })
  //   return base
  // }

  // private portionsFromResponse(response: FdcFoodDetailResponse): KVP<Portion> {
  //   return {
  //     grams: {
  //       unit: 'grams',
  //       quantity: 100
  //     },
  //     ...keyBy(
  //       response.foodMeasures ||
  //         [].map((portion: FdcFoodMeasure) =>
  //           createPortion(
  //             this.unitFromMeasure(portion),
  //             portion.gramWeight / 100
  //           )
  //         ),
  //       'unit'
  //     )
  //   }
  // }

  // private unitFromMeasure(portion: FdcFoodMeasure): string {
  //   return portion.disseminationText
  //     ? portion.disseminationText.replace(/^(1 )/, '')
  //     : portion.modifier
  // }

  // private tagsFromResponse(response: FdcFoodDetailResponse): string[] {
  //   return response.foodAttributes.map(att => att.value)
  // }
}
