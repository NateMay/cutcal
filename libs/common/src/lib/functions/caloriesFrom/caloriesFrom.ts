import * as _ from 'lodash'
import { Nutrition } from '../../models/nutrition'

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

  const calculate: (macro: number) => number = _.partial(
    caloriesFromSingle,
    _,
    _.sum(_.values(macros)),
    nutr.calories
  )

  return {
    carbohydrates: calculate(macros.carbohydrates) || 0,
    protein: calculate(macros.protein) || 0,
    fat: calculate(macros.fat) || 0,
    alcohol: calculate(macros.alcohol) || 0,
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
  totalCalories: number
): number {
  return (adjustedQuant / sumOfAdjusted) * totalCalories
}
