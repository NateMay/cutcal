import { DailyValue, Nutrient, Nutrition } from '@cutcal/nutrition'

export class NutritionLabel {
  totalCalories: number
  totalFat: number
  percFat: number
  totalSatFat: number
  percSatFat: number
  totalTransFat: number
  cholesterol: number
  percCholesterol: number
  sodium: number
  percSodium: number
  totalCarb: number
  percCarbs: number
  dietaryFiber: number
  percDietaryFiber: number
  totalSugar: number
  totalProtein: number
  percVitA: number
  percVitC: number
  percCalcium: number
  percIron: number

  constructor(nutr: Nutrition<number>, dv: DailyValue) {
    this.totalCalories = nutr.calories ?? 0
    this.totalFat = nutr.fat ?? 0
    this.percFat = getPercentDV(nutr, dv, 'fat')
    this.totalSatFat = nutr.saturatedFat ?? 0
    this.percSatFat = getPercentDV(nutr, dv, 'saturatedFat')
    this.totalTransFat = nutr.transUnsaturated ?? 0
    this.cholesterol = nutr.cholesterol ?? 0
    this.percCholesterol = getPercentDV(nutr, dv, 'cholesterol')
    this.sodium = nutr.sodium ?? 0
    this.percSodium = getPercentDV(nutr, dv, 'sodium')
    this.totalCarb = nutr.carbohydrates ?? 0
    this.percCarbs = getPercentDV(nutr, dv, 'carbohydrates')
    this.dietaryFiber = nutr.dietaryFiber ?? 0
    this.percDietaryFiber = getPercentDV(nutr, dv, 'dietaryFiber')
    this.totalSugar = nutr.sugar ?? 0
    this.totalProtein = nutr.protein ?? 0
    this.percVitA = getPercentDV(nutr, dv, 'vitA')
    this.percVitC = getPercentDV(nutr, dv, 'vitC')
    this.percCalcium = getPercentDV(nutr, dv, 'calcium')
    this.percIron = getPercentDV(nutr, dv, 'iron')
  }
}

const getPercentDV = (
  nutr: Nutrition<number>,
  dv: DailyValue,
  nutrient: Nutrient
): number | never => {
  if (!nutrient)
    throw Error('[Cutcal] getPercentDV() requires valid nutrient key')
  const numerator = nutr[nutrient] || 0
  const denominator = dv.nutrition[nutrient]
  if (!denominator?.RDA)
    throw Error('[Cutcal] getPercentDV() called with invalid denominator.RDA')
  else return numerator / denominator.RDA
}
