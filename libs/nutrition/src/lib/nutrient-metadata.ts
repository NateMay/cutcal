import * as _ from 'lodash'
import { BASE_NUTRITION } from './base-nutrition'
import { NutrientMetaData, USDA_NUTRIENT_DETAILS } from './nutrient-details'
import { Nutrition } from './nutrition'

class NutrientMetadataStore {
  private _nutrients: Nutrition<string>
  private _shortNames: Nutrition<string>
  private _units: Nutrition<string>

  get allDetails(): Nutrition<NutrientMetaData> {
    const details = Object.assign({}, USDA_NUTRIENT_DETAILS)
    _.forEach(details, (X, propName) => (details[propName].propName = propName))
    return details
  }

  private _ids: Nutrition<number>
  get ids(): Nutrition<number> {
    return this._ids
  }
  getId(key: keyof Nutrition<number>): number {
    return <number>this._ids[key]
  }

  get nutrients(): Nutrition<string> {
    return this._nutrients
  }
  getNutrient(key: keyof Nutrition<string>): string {
    return <string>this._nutrients[key]
  }

  get shortNames(): Nutrition<string> {
    return this._shortNames
  }
  getShortName(key: keyof Nutrition<string>): string {
    return <string>this._shortNames[key]
  }

  get units(): Nutrition<string> {
    return this._units
  }
  getUnit(key: keyof Nutrition<string>): string {
    return <string>this._units[key]
  }

  constructor() {
    this._ids = this.nutrientData('id')
    this._shortNames = this.nutrientData('shortName')
    this._units = this.nutrientData('unit')
    this._nutrients = this.nutrientData('nutrient')
  }

  // @Memoize()
  nutrientData(
    whichDetail: 'id' | 'nutrient' | 'unit' | 'shortName'
  ): Nutrition<any> {
    const nutrObject = BASE_NUTRITION(null)

    // tslint:disable:forin (needs to be fast)
    for (const nutrient in nutrObject) {
      if (!USDA_NUTRIENT_DETAILS[nutrient])
        console.warn(
          `details needed for "${nutrient}". https://ndb.nal.usda.gov/ndb/nutrients/index`
        )
      else nutrObject[nutrient] = USDA_NUTRIENT_DETAILS[nutrient][whichDetail]
    }

    return nutrObject
  }
}

export const NUTRIENTS = new NutrientMetadataStore()
