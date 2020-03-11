import { get } from 'lodash'
import { NUTRIENTS } from './../nutrient-metadata'

/**
 * @description Gets the USDA id for a nutrient given its name
 * @param {string} nutrientName
 */

export const getNutrientID = (nutrientName: string): number =>
  get(NUTRIENTS.ids, nutrientName)
