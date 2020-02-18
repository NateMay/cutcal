import { Nutrient, Nutrition } from '../nutrition'

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
  for (const nutrient of Object.keys(nutrition) as Nutrient[]) {
    result[nutrient] = (nutrition[nutrient] || 0) * multipler
  }
  return result
}
