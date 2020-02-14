import * as _ from 'lodash';
import { NUTRIENTS } from './../nutrient-metadata';

/**
 * Gets the USDA id for a nutrient given its name
 * @param {string} nutrientName
 */

export function getNutrientID(nutrientName: string): number {
  return _.get(NUTRIENTS.ids, nutrientName)
}
