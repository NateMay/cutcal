import * as _ from 'lodash'
import { DailyValue } from '../../../models/daily-value'
import { Nutrition } from '../../../models/nutrition'
import { KeysIn } from '../../../types/keys-in'

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
    // a partially applied function for getting daily value percentages
    const dvPercentPartial: (nutruent: string) => number = _.partial(
      getPercentDV,
      nutr,
      dv,
      _
    )

    this.total_calories = nutr.calories || 0
    this.total_fat = nutr.fat || 0
    this.perc_fat = dvPercentPartial('fat')
    this.total_sat_fat = nutr.saturatedFat || 0
    this.perc_sat_fat = dvPercentPartial('saturatedFat')
    this.total_trans_fat = nutr.transUnsaturated || 0
    this.cholesterol = nutr.cholesterol || 0
    this.perc_cholesterol = dvPercentPartial('cholesterol')
    this.sodium = nutr.sodium || 0
    this.perc_sodium = dvPercentPartial('sodium')
    this.total_carb = nutr.carbohydrates || 0
    this.perc_carbs = dvPercentPartial('carbohydrates')
    this.dietary_fiber = nutr.dietary_fiber || 0
    this.perc_dietary_fiber = dvPercentPartial('dietary_fiber')
    this.total_sugar = nutr.sugar || 0
    this.total_protein = nutr.protein || 0
    this.perc_vit_a = dvPercentPartial('vit_A')
    this.perc_vit_c = dvPercentPartial('vit_C')
    this.perc_calcium = dvPercentPartial('calcium')
    this.perc_iron = dvPercentPartial('iron')
  }
}

function getPercentDV(
  nutr: Nutrition<number>,
  dv: DailyValue,
  propName: KeysIn<Nutrition<any>, string>
): number {
  if (!propName) throw new Error('')
  const numerator = nutr[propName]
  const denominator = dv.nutrition[propName]
  if (!numerator || !denominator || !denominator.RDA) throw new Error('')
  else return numerator / denominator.RDA
}
