import * as _ from 'lodash'
import { Nutrition } from '../nutrition'

/**
 * Multiplies every member of a Nutrition object
 * @param {Nutrition<number>} object
 * @param {number} multipler
 */
export function multiplyNutrition(
  object: Nutrition<number>,
  multipler: number
): Nutrition<number> {
  const result: Nutrition<number> = _.cloneDeep(object)
  // tslint:disable:forin (needs to be fast)
  for (const p in result) {
    result[p] = result[p] * multipler
  }
  return result
}
