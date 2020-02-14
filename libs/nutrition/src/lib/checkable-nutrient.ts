import { KVP } from '@cutcal/core'
import * as _ from 'lodash'
import { ZERO_NUTRITION } from './base-nutrition'
import { NUTRIENTS } from './nutrient-metadata'
import { Nutrition } from './nutrition'

/**
 * Object to manage the data about which nutrients are selected
 */
export interface NutrCheckable {
  label: string
  propName: string
  isChecked?: boolean
  unit?: string
}

/**
 * Groups a NutrCheckable object by unit for use in a single chart
 */
export function createNutrCheckableMap(
  checkables: Nutrition<NutrCheckable>
): KVP<NutrCheckable[]> {
  const result = _.groupBy(
    checkables,
    (checkable: NutrCheckable) => checkable.unit
  )
  if (!result) throw new Error('')
  return result as KVP<NutrCheckable[]>
}

/**
 * Creates the object to be passed to the CheckableNutrients Component
 * @param {string[]} selected array of nutrient properties to be selected upon creation
 */
export function nutrtionSelections(
  selected?: string[]
): Nutrition<NutrCheckable> {
  return _.keyBy(
    _.map(
      ZERO_NUTRITION,
      (value: number, prop: string) =>
        ({
          label: NUTRIENTS.shortNames[prop] || prop,
          propName: prop,
          unit: NUTRIENTS.units[prop],
          isChecked: selected ? selected.includes(prop) : false,
        } as NutrCheckable)
    ),
    'propName'
  )
}
