import { Nutrition } from '@cutcal/nutrition'
import * as _ from 'lodash'

/**
 * Stores information about the calorie break down from Fats, Protein, and Carbs
 */
export interface CaloriesFrom {
  carbohydrates: number
  protein: number
  fat: number
  alcohol: number
}

/**
 * Calculates the percent of calories from a given marco-nutrient
 * @param {'fat' | 'carbohydrates' | 'protein' | 'alcohol'} macro the macro nutrient desired
 * @param {Nutrition<number>} nutrition the nutrition object from which to calculate
 */
export function caloriesFrom(
  macro: 'fat' | 'carbohydrates' | 'protein' | 'alcohol',
  nutrition: Nutrition<number>
): number {
  if (!nutrition.calories)
    throw new Error(
      '[CutCal] caloriesFrom() requires a nutrition object with calories'
    )
  const macros: CaloriesFrom = adjustPerGram(nutrition)

  return caloriesFromSingle(
    macros[macro],
    _.sum(_.values(macros)),
    nutrition.calories
  )
}

/**
 * Calculates the percent of calories from a all marco-nutrients
 * @param {Nutrition<number>} nutrition the nutrition object from which to calculate
 */

export function caloriesFromAll(nutr: Nutrition<number>): CaloriesFrom {
  const macros: CaloriesFrom = adjustPerGram(nutr)
  const sum = _.sum(_.values(macros))
  return {
    carbohydrates: caloriesFromSingle(macros.carbohydrates, sum, nutr.calories) || 0,
    protein: caloriesFromSingle(macros.protein, sum, nutr.calories) || 0,
    fat: caloriesFromSingle(macros.fat, sum, nutr.calories) || 0,
    alcohol: caloriesFromSingle(macros.alcohol, sum, nutr.calories) || 0,
  }
}

/**
 * Converts grams into calories for each macro-nutrient
 * @param {Nutrition<number>} nutrition the nutrition object from which to calculate
 * @refrence [USDA] https://www.nal.usda.gov/fnic/how-many-calories-are-one-gram-fat-carbohydrate-or-protein
 * @returns CaloriesFrom
 */
export function adjustPerGram(nutrition: Nutrition<number>): CaloriesFrom {
  return {
    carbohydrates: (nutrition.carbohydrates || 0) * 4,
    protein: (nutrition.protein || 0) * 4,
    fat: (nutrition.fat || 0) * 9,
    alcohol: (nutrition.alcohol || 0) * 7,
  }
}

export function caloriesFromSingle(
  adjustedQuant: number,
  sumOfAdjusted: number,
  totalCalories: number | undefined
): number {
  if (totalCalories === undefined) throw new Error('[CutCal] must have calories to calulcate')
  return (adjustedQuant / sumOfAdjusted) * totalCalories
}
