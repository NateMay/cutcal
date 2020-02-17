import { Nutrition } from '../nutrition'

/**
 * Multiplies every member of a Nutrition object
 * @param {Nutrition<number>} nutrition
 * @param {number} multipler
 */
export function multiplyNutrition(
  nutrition: Nutrition<number>,
  multipler: number
): Nutrition<number> {
  const result: Nutrition<number> = {}
  for (const nutrient in nutrition) {
    result[nutrient] = nutrition[nutrient] * multipler
  }
  return result
}
