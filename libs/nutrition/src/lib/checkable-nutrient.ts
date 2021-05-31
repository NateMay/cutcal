import { groupBy } from 'lodash'
import { ZERO_NUTRITION } from './base-nutrition'
import { NUTRIENTS } from './nutrient-metadata'
import { NutrientUnit } from './nutrient-units'
import { Nutrition } from '@cutcal/core'

/**
 * @description Object to manage the data about which nutrients are selected
 */
export type NutrCheckableMap = { [key in NutrientUnit]: NutrCheckable[] }
export interface NutrCheckable {
  label: string
  propName: string
  isChecked?: boolean
  unit?: string
}

/**
 * @description Groups a NutrCheckable object by unit for use in a single chart
 */
export function createNutrCheckableMap(
  checkables: Nutrition<NutrCheckable>
): NutrCheckableMap {
  const result = groupBy(checkables, 'unit')
  return result as NutrCheckableMap
}

/**
 * @description Creates the object to be passed to the CheckableNutrients Component
 * @param {string[]} selected array of nutrient properties to be selected upon creation
 */
export function nutrtionSelections(
  selected?: string[]
): Nutrition<NutrCheckable> {
  const result: Nutrition<NutrCheckable> = {}
  for (const nutrient of Object.keys(
    ZERO_NUTRITION
  ) as (keyof Nutrition<any>)[]) {
    result[nutrient] = {
      label: NUTRIENTS.shortNames[nutrient] || nutrient,
      propName: nutrient,
      unit: NUTRIENTS.units[nutrient],
      isChecked: selected ? selected.includes(nutrient) : false
    }
  }
  return result
}
