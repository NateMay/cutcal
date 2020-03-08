import { get } from 'lodash'
import { NUTRIENTS } from './../nutrient-metadata'

/**
 * Gets the USDA id for a nutrient given its name
 * @param {string} nutrientName
 */

export function getNutrientID(nutrientName: string): number {
  return get(NUTRIENTS.ids, nutrientName)
}
