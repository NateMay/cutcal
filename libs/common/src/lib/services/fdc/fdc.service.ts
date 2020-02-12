import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import * as _ from 'lodash'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { NUTRIENTS } from '../../classes/nutrientMetadata/nutrientMetadata'
import { createPortion } from '../../functions/createPortion'
import {
  FdcFoodDetailResponse,
  FdcFoodMeasure,
  FdcFoodNutrient,
} from '../../models/fdc-detail'
import { FDCFoodSearchResponse } from '../../models/fdc-search'
import { Image } from '../../models/images'
import { KVP } from '../../models/key-value-pair'
import { Nutrition } from '../../models/nutrition'
import { Portion } from '../../models/portion'
import { AuthService } from '../auth/auth.service'

export interface Food2 {
  _id?: any

  /* FDC + crowd source */
  name: string // should populate from the FDC name until crowdsourced
  defaultPortion: Portion
  description?: string // should populate from the usda name until crowdsourced
  link?: string

  createdBy?: string
  primaryImage?: Image
  secondaryImages?: KVP<Image>

  /* recipe form */
  isRecipe?: boolean
  isMeal?: boolean
  isEntre?: boolean
  isAppetizer?: boolean
  isDessert?: boolean
  foodRefs?: string[]
  instructions?: string[]

  /* from FDC */
  fdcName?: string
  tags?: string[] // food groups
  nutrition?: Nutrition<number>
  fdcId?: number
  portions: KVP<Portion>
  scientificName?: string

  /* calculated fields */
  uses?: number
}

export function createFood2(
  name?: string,
  nutrition?: Nutrition<number>,
  fdcName?: string,
  fdcId?: number,
  description?: string,
  portions?: KVP<Portion>,
  defaultPortion?: Portion,
  createdBy?: string,
  tags?: string[],
  primaryImage?: Image,
  secondaryImages?: KVP<Image>,
  isRecipe?: boolean,
  isMeal?: boolean,
  isEntre?: boolean,
  isAppetizer?: boolean,
  isDessert?: boolean,
  foodRefs?: string[],
  instructions?: string[]
): Food2 {
  if (!name || !defaultPortion || !portions)
    throw new Error(
      '[CutCal] createFood2() requires name, defaultPortion, & portions'
    )
  return {
    name,
    defaultPortion,
    description,
    createdBy,
    primaryImage,
    secondaryImages,
    isRecipe,
    isMeal,
    isEntre,
    isAppetizer,
    isDessert,
    foodRefs,
    instructions,
    fdcName,
    tags,
    nutrition,
    fdcId,
    portions,
    uses: 0,
  }
}

@Injectable({ providedIn: 'root' })
export class FdcService {
  readonly endPoint = 'https://api.nal.usda.gov/fdc/v1'
  readonly endPoint2 = 'https://fdc.nal.usda.gov/portal-data/external/'
  readonly apiKey = 'vWDhyXr0dktjb2xa7p8R2CockacoIMFEWDl8jx0R'

  constructor(private http: HttpClient, private auth: AuthService) {}

  getFdcFood(fdcId: number | string): Observable<Food2> {
    // ?api_key=${this.apiKey}
    return this.http
      .get(`${this.endPoint2}/${fdcId}`)
      .pipe(
        map((response: FdcFoodDetailResponse) =>
          createFood2(
            response.description,
            this.nutritionFromResponse(response),
            response.description,
            response.id,
            response.description,
            this.portionsFromResponse(response),
            createPortion('grams', 100),
            this.auth.trueUid,
            this.tagsFromResponse(response),
            {},
            {}
          )
        )
      )
  }

  private nutritionFromResponse(
    response: FdcFoodDetailResponse
  ): Nutrition<number> {
    const base = {}
    const details = _.keyBy(NUTRIENTS.allDetails, 'id')
    response.foodNutrients.forEach((foodNutrient: FdcFoodNutrient) => {
      const meta = details[foodNutrient.nutrient.id]
      if (meta && meta.propName) base[meta.propName] = foodNutrient.value
    })
    return base
  }

  private portionsFromResponse(response: FdcFoodDetailResponse): KVP<Portion> {
    return {
      grams: {
        unit: 'grams',
        quantity: 100,
      },
      ..._.keyBy(
        response.foodMeasures ||
          [].map((portion: FdcFoodMeasure) =>
            createPortion(
              this.unitFromMeasure(portion),
              portion.gramWeight / 100
            )
          ),
        'unit'
      ),
    }
  }

  private unitFromMeasure(portion: FdcFoodMeasure): string {
    return portion.disseminationText
      ? portion.disseminationText.replace(/^(1 )/, '')
      : portion.modifier
  }

  private tagsFromResponse(response: FdcFoodDetailResponse): string[] {
    return response.foodAttributes.map(att => att.value)
  }

  queryFood(
    searchStr: string,
    page: number = 1
  ): Observable<FDCFoodSearchResponse> {
    // https://DEMO_KEY@api.nal.usda.gov/fdc/v1/search
    return this.http.post<FDCFoodSearchResponse>(
      'https://fdc.nal.usda.gov/portal-data/external/search',
      {
        exactBrandOwner: null,
        generalSearchInput: searchStr,
        includeDataTypes: {
          'Survey (FNDDS)': true,
          Foundation: true,
          Branded: false,
          'SR Legacy': true,
        },
        pageNumber: page.toString(),
        referenceFoodsCheckBox: 'true',
        sortCriteria: {
          sortColumn: 'description',
          sortDirection: 'asc',
        },
      }
    )
  }
}
