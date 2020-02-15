import { Nutrition } from '@cutcal/nutrition';
import { NUTRIENT_KEYS } from '../base-nutrition';

export function updateNutritions(
  operation: 'add' | 'subtract',
  start: Nutrition<number>,
  adjust: Nutrition<number>
): Nutrition<number> {
  const result = { ...start }
  const dir = operation == 'add' ? 1 : -1

  NUTRIENT_KEYS.forEach(nutrient => {
    if (typeof adjust[nutrient] === 'number')
    result[nutrient] = Math.max(
      (start[nutrient] || 0) + adjust[nutrient] * dir,
      0
    )
  })

  return result
}
