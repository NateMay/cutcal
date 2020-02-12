import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import * as _ from 'lodash'
import { Observable } from 'rxjs'
import { first, map, shareReplay } from 'rxjs/operators'
import { NUTRIENTS } from '../../classes/nutrientMetadata/nutrientMetadata'
import { createPortion } from '../../functions/createPortion'
import { Food } from '../../models/food'
import { KVP } from '../../models/key-value-pair'
import { Nutrition } from '../../models/nutrition'
import { Portion } from '../../models/portion'
import { newNonScaler, USDAFood, USDANutrient } from '../../models/usda'
import { KeysIn } from './../../../../typings.d'
import { USDAResponse } from './../../models/usda'

export interface UsdaApiConfig {
  ndbno?: string
  endPoint?: string
  apiKey?: string
  /**
   * @note [b]asic or [f]ull or [s]tats
   */
  type?: 'b' | 'f' | 's'
  format?: 'xml' | 'json'
}

/**
 * Service which queires the USDA database
 * @reference [USDA-API] {@link https://ndb.nal.usda.gov/ndb/doc/apilist/API-FOOD-REPORTV2.md}
 */
@Injectable()
export class USDAService {
  // private readonly endPoint: string = 'https://api.nal.usda.gov/ndb/reports/';
  // private readonly apiKey: string = 'NVguQkLzba5lX36C0GNpZBCyBAvtHZ5lLbxE5RKp';
  // private readonly type: 'b' | 'f' | 's' = 'f';
  // private readonly format: 'xml' | 'json' = 'json';

  private readonly config: UsdaApiConfig = {
    // TODO (env) move apiKey to environment file and remove from git history
    // TODO (usda) get a few more API keys: {@link https://ndb.nal.usda.gov/ndb/doc/index}
    endPoint: 'https://api.nal.usda.gov/ndb/reports/',
    apiKey: 'NVguQkLzba5lX36C0GNpZBCyBAvtHZ5lLbxE5RKp',
    type: 'f',
    format: 'json',
  }

  constructor(private http: HttpClient) {
    Object.freeze(this.config)
  }

  /**
   * Constructs the USDA enpoint
   * @param {UsdaApiConfig} config
   * @returns {string}
   */
  createUrl(config: UsdaApiConfig): string {
    return `${config.endPoint}?ndbno=${config.ndbno}&type=${config.type}&format=${config.format}&api_key=${config.apiKey}`
  }

  /**
   * Makes a call to the USDA API to get the nutrition information for a food
   * @param {string} ndbno (nutritional database number) USDA database food id for the target food
   * @returns {USDAResponse}
   */
  getUsdaFoodResponse(
    ndbno: string,
    config: UsdaApiConfig = {}
  ): Observable<USDAResponse> {
    return this.http
      .get<USDAResponse>(this.createUrl({ ndbno, ...this.config, ...config }))
      .pipe(first(), shareReplay())
  }

  /**
   * Hits the USDA API and reforms into a CutCal Food (interface) as best as it can
   * @param {string} ndbno (nutritional database number) USDA database food id
   * @note
   *   This should be used to populate forms only
   *   some manual selections must be made for:
   *    - name, primary portion, isRecipe, isMeal, instructions, Description,
   */
  convertUSDAFoodToCCFood(
    ndbno: string,
    config: UsdaApiConfig = {}
  ): Observable<Partial<Food>> {
    return this.getUsdaFoodResponse(ndbno, config).pipe(
      map(response => this.createCutCalFood(response))
    )
  }

  createCutCalFood(usda: USDAResponse): Partial<Food> {
    const r = usda.report
    return {
      name: r.food.name,
      USDAName: r.food.name,
      defaultPortion: createPortion('g', 100),
      portions: _.keyBy(this.getPortions(r.food), 'unit'),
      nutrition: this.getNutrition(r.food),
      footnotes: r.footnotes ? r.footnotes.map(fn => fn.desc) : undefined,
      sources: r.sources,
      NDBNO: r.food.ndbno,
      foodGroup: r.food.fg,
      usdaNonScalars: newNonScaler(r.food),
    }
  }

  /**
   * Maps the usda nutrition value into a CutCal Nutrition object
   * @param {string} ndbno (nutritional database number) USDA database food id
   * @returns {Observable<Nutrition<number>>}
   */
  getUsdaNutrition(
    ndbno: string,
    config: UsdaApiConfig = {}
  ): Observable<Nutrition<number>> {
    return this.getUsdaFoodResponse(ndbno, config).pipe(
      map((usda: USDAResponse) => this.getNutrition(usda.report.food))
    )
  }

  /**
   * Maps the usda nutrition value into a CutCal Nutrition object
   * @param {USDAFood} food
   * @returns {Nutrition<number>}
   */
  getNutrition(food: USDAFood): Nutrition<number> {
    // ensure nutrient ID exists
    this.checkForUnkownNutrients(food)

    const valueMap: Nutrition<number> = {}
    const nutrients = _.keyBy(food.nutrients, 'nutrient_id')

    _.forEach(NUTRIENTS.ids, (prop, key: keyof Nutrition<string>) => {
      this.createNullNutrientForUnprovided(nutrients, key)
      this.catchUnitMismatch(nutrients, key)

      const NDBNO: number = NUTRIENTS.getId(key)
      const usdaNutrientObj: USDANutrient = nutrients[NDBNO]
      valueMap[key] = !!usdaNutrientObj ? usdaNutrientObj.value : 0
    })
    return valueMap
  }

  /**
   * Warns if a new nutrient is found
   * @param {USDAFood} food
   */
  checkForUnkownNutrients(food: USDAFood): void {
    const known = _.values(NUTRIENTS.ids)

    food.nutrients.forEach(nutr => {
      if (!known.includes(nutr.nutrient_id)) {
        alert(
          `Hey, we found a nutrient not in your Nutrient interface. See console output and tell N8. `
        )
        console.warn(`New Nutrient "${nutr.nutrient_id}" is unknown: `, nutr)
      }
    })
  }

  /**
   * Assigns a zero value USDANutrient to the passed in object to protect
   *  against undefined nutrient values
   * @param {KVP<USDANutrient>} nutrients array of USDA nutirion data in their form
   * @param {string} key nutrient property name
   */
  createNullNutrientForUnprovided(
    nutrients: KVP<USDANutrient>,
    key: KeysIn<Nutrition<any>, string>
  ): void {
    if (!key) throw new Error('[CutCal] ')
    const NDBNO: number | undefined = NUTRIENTS.ids[key]
    if (!NDBNO) throw new Error('[CutCal] ')

    if (!nutrients[NDBNO]) {
      if (!NUTRIENTS.nutrients[key])
        throw new Error(
          `[CutCal] createNullNutrientForUnprovided() No Property ${key}`
        )

      nutrients[NDBNO] = {
        nutrient_id: NDBNO,
        name: <any>NUTRIENTS.nutrients[key],
        unit: <any>NUTRIENTS.units[key],
        value: 0,
        measures: [],
      }
    }
  }

  /**
   * This method will throw an error is the unit provided by the USDA does not
   *   match the unit that we expect. If the USDA begins offering a nutrient in a nther unit
   *   then our application is not currently structured to accomodate that. Please tell N8.
   * @param {KVP<USDANutrient>} nutrients array of USDA nutirion data in their form
   * @param {string} key nutrient property name
   */
  catchUnitMismatch(nutrients: KVP<USDANutrient>, key: string): void {
    const ccUnit: string = NUTRIENTS.units[key]

    const usdaNutr: USDANutrient = nutrients[NUTRIENTS.ids[key]]

    if (usdaNutr.unit != ccUnit) {
      const error: string = `[CutCal] Unit mismatch for ${NUTRIENTS.nutrients[key]}. Our unit: ${ccUnit}. Their unit ${usdaNutr.unit}. Please inform N8.`
      alert(error)
      throw new Error(error)
    }
  }

  /**
   * Extracts and reforms the unit and quantity information
   * @param {USDAFood} food The USDA food object
   * @returns {Portion[]}
   */
  getPortions(food: USDAFood): Portion[] {
    return [
      createPortion('g', 100),
      ...food.nutrients[0].measures.map(meas =>
        createPortion(meas.label, 100 / meas.eqv)
      ),
    ]
  }
}
