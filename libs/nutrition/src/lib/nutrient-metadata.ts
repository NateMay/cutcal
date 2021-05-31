import { FdcUnit } from '@cutcal/core'
import { assertIsDefined, Nutrition, Nutrient } from '@cutcal/core'
import { NUTRIENT_KEYS } from './base-nutrition'
import { NutrientMetaData, USDA_NUTRIENT_DETAILS } from './nutrient-details'

class NutrientMetadataStore {
  private _nutrients: Nutrition<string>
  private _shortNames: Nutrition<string>
  private _units: Nutrition<FdcUnit>
  private _ids: Nutrition<number>

  constructor() {
    this._ids = this.nutrientData<number>('id')
    this._shortNames = this.nutrientData<string>('shortName')
    this._units = this.nutrientData<FdcUnit>('unit')
    this._nutrients = this.nutrientData<string>('nutrient')
  }

  get allDetails(): Nutrition<NutrientMetaData> {
    const details = Object.assign({}, USDA_NUTRIENT_DETAILS)

    for (const nutrient of Object.keys(details) as Nutrient[]) {
      const detail = details[nutrient]
      assertIsDefined(detail)
      detail.propName = nutrient
    }
    return details
  }

  get ids(): Nutrition<number> {
    return this._ids
  }
  getId(key: keyof Nutrition<number>): number {
    const id = this._ids[key]
    assertIsDefined(id)
    return id
  }

  get nutrients(): Nutrition<string> {
    return this._nutrients
  }
  getNutrient(key: keyof Nutrition<string>): string {
    const nutrient = this._nutrients[key]
    assertIsDefined(nutrient)
    return nutrient
  }

  get shortNames(): Nutrition<string> {
    return this._shortNames
  }
  getShortName(key: keyof Nutrition<string>): string {
    const name = this._shortNames[key]
    assertIsDefined(name)
    return name
  }

  get units(): Nutrition<FdcUnit> {
    return this._units
  }
  getUnit(key: keyof Nutrition<string>): string {
    const unit = this._units[key]
    assertIsDefined(unit)
    return unit
  }

  // @Memoize()
  nutrientData<T extends string | number>(
    whichDetail: 'id' | 'nutrient' | 'unit' | 'shortName'
  ): Nutrition<T> {
    const result: Nutrition<string | number> = {}

    NUTRIENT_KEYS.forEach((nutrient: keyof Nutrition<NutrientMetaData>) => {
      if (!USDA_NUTRIENT_DETAILS[nutrient])
        console.warn(
          `details needed for "${nutrient}". https://ndb.nal.usda.gov/ndb/nutrients/index`
        )
      else {
        const detail = USDA_NUTRIENT_DETAILS[nutrient]
        assertIsDefined(detail)
        result[nutrient] = detail[whichDetail]
      }
    })

    return result as Nutrition<T>
  }
}

export const NUTRIENTS = new NutrientMetadataStore()
