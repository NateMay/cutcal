import { Nutrition } from '@cutcal/nutrition'
import * as _ from 'lodash'

/**
 * Performs an operation on every member of a Nutrition object
 * @param {Nutrition<number>} object the object over which to iterate
 * @param {Function} predicate the operation to perform on each member
 */
export function modifyNutrition(
  object: Nutrition<number>,
  predicate: (value: any) => any
): Nutrition<number> {
  const result: Nutrition<number> = _.cloneDeep(object)
  // tslint:disable:forin (needs to be fast)
  for (const p in result) {
    result[p] = predicate(result[p])
  }
  return result
}
