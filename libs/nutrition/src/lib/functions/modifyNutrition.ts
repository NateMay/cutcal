import { Nutrient, Nutrition } from '@cutcal/core'

/**
 * @description Performs an operation on every member of a Nutrition object
 * @param {Nutrition<number>} nutrition the object over which to iterate
 * @param {Function} predicate the operation to perform on each member
 */
export function modifyNutrition(
  nutrition: Nutrition<number>,
  predicate: (value: any) => number
): Nutrition<number> {
  const result: Nutrition<number> = {}
  for (const nutrient of Object.keys(nutrition) as Nutrient[]) {
    result[nutrient] = predicate(nutrition[nutrient])
  }
  return result
}
