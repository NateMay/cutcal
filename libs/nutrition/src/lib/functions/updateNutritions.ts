import { Nutrition } from '@cutcal/nutrition'

export function updateNutritions(
  operation: 'add' | 'subtract',
  start: Nutrition<number>,
  adjust: Nutrition<number>
): Nutrition<number> {
  const result = { ...start }
  const dir = operation == 'add' ? 1 : -1

  for (const nutrient in adjust) {
    if (adjust.hasOwnProperty(nutrient))
      result[nutrient] = Math.max(
        (start[nutrient] || 0) + adjust[nutrient] * dir,
        0
      )
  }

  return result
}
