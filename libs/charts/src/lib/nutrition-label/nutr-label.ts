import { DailyValue, Nutrient, Nutrition } from '@cutcal/nutrition'

export class NutritionLabel {
  total_calories: number
  total_fat: number
  perc_fat: number
  total_sat_fat: number
  perc_sat_fat: number
  total_trans_fat: number
  cholesterol: number
  perc_cholesterol: number
  sodium: number
  perc_sodium: number
  total_carb: number
  perc_carbs: number
  dietary_fiber: number
  perc_dietary_fiber: number
  total_sugar: number
  total_protein: number
  perc_vit_a: number
  perc_vit_c: number
  perc_calcium: number
  perc_iron: number

  constructor(nutr: Nutrition<number>, dv: DailyValue) {
    this.total_calories = nutr.calories ?? 0
    this.total_fat = nutr.fat ?? 0
    this.perc_fat = getPercentDV(nutr, dv, 'fat')
    this.total_sat_fat = nutr.saturatedFat ?? 0
    this.perc_sat_fat = getPercentDV(nutr, dv, 'saturatedFat')
    this.total_trans_fat = nutr.transUnsaturated ?? 0
    this.cholesterol = nutr.cholesterol ?? 0
    this.perc_cholesterol = getPercentDV(nutr, dv, 'cholesterol')
    this.sodium = nutr.sodium ?? 0
    this.perc_sodium = getPercentDV(nutr, dv, 'sodium')
    this.total_carb = nutr.carbohydrates ?? 0
    this.perc_carbs = getPercentDV(nutr, dv, 'carbohydrates')
    this.dietary_fiber = nutr.dietary_fiber ?? 0
    this.perc_dietary_fiber = getPercentDV(nutr, dv, 'dietary_fiber')
    this.total_sugar = nutr.sugar ?? 0
    this.total_protein = nutr.protein ?? 0
    this.perc_vit_a = getPercentDV(nutr, dv, 'vit_A')
    this.perc_vit_c = getPercentDV(nutr, dv, 'vit_C')
    this.perc_calcium = getPercentDV(nutr, dv, 'calcium')
    this.perc_iron = getPercentDV(nutr, dv, 'iron')
  }
}

function getPercentDV(
  nutr: Nutrition<number>,
  dv: DailyValue,
  nutrient: Nutrient
): number | never {
  if (!nutrient)
    throw Error('[Cutcal] getPercentDV() requires valid nutrient key')
  const numerator = nutr[nutrient] || 0
  const denominator = dv.nutrition[nutrient]
  if (!denominator?.RDA)
    throw Error('[Cutcal] getPercentDV() called with invalid denominator.RDA')
  else return numerator / denominator.RDA
}
