import { Nutrition } from '@cutcal/core'
import { sum, values } from 'lodash'

/**
 * Stores information about the calorie break down from Fats, Protein, and Carbs
 */
export interface CaloriesFrom {
  carbohydrates: number
  protein: number
  fat: number
  alcohol: number
}
export type CaloriesSource = keyof CaloriesFrom

/**
 * @description Calculates the percent of calories from a given marco-nutrient
 * @param {'fat' | 'carbohydrates' | 'protein' | 'alcohol'} macro the macro nutrient desired
 * @param {Nutrition<number>} nutrition the nutrition object from which to calculate
 */
export function caloriesFrom(
  macro: 'fat' | 'carbohydrates' | 'protein' | 'alcohol',
  nutrition: Nutrition<number>
): number | never {
  if (!nutrition.calories)
    throw Error(
      '[CutCal] caloriesFrom() requires a nutrition object with calories'
    )
  const macros: CaloriesFrom = adjustPerGram(nutrition)

  return caloriesFromSingle(
    macros[macro],
    sum(values(macros)),
    nutrition.calories
  )
}

/**
 * @description Calculates the percent of calories from a all marco-nutrients
 * @param {Nutrition<number>} nutrition the nutrition object from which to calculate
 */

export function caloriesFromAll(nutr: Nutrition<number>): CaloriesFrom {
  const macros: CaloriesFrom = adjustPerGram(nutr)
  const total = sum(values(macros))
  return {
    carbohydrates:
      caloriesFromSingle(macros.carbohydrates, total, nutr.calories) ?? 0,
    protein: caloriesFromSingle(macros.protein, total, nutr.calories) ?? 0,
    fat: caloriesFromSingle(macros.fat, total, nutr.calories) ?? 0,
    alcohol: caloriesFromSingle(macros.alcohol, total, nutr.calories) ?? 0
  }
}

/**
 * @description Converts grams into calories for each macro-nutrient
 * @param {Nutrition<number>} nutrition the nutrition object from which to calculate
 * @see {@link https://www.nal.usda.gov/fnic/how-many-calories-are-one-gram-fat-carbohydrate-or-protein USDA}
 * @returns CaloriesFrom
 */
export const adjustPerGram = (nutrition: Nutrition<number>): CaloriesFrom => ({
  carbohydrates: (nutrition.carbohydrates ?? 0) * 4,
  protein: (nutrition.protein ?? 0) * 4,
  fat: (nutrition.fat ?? 0) * 9,
  alcohol: (nutrition.alcohol ?? 0) * 7
})

export function caloriesFromSingle(
  adjustedQuant: number,
  sumOfAdjusted: number,
  totalCalories: number | undefined
): number | never {
  if (totalCalories === undefined)
    throw Error('[CutCal] must have calories to calulcate')
  return (adjustedQuant / sumOfAdjusted) * totalCalories
}
