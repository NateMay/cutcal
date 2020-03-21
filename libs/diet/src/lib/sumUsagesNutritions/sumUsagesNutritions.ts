import { KVP } from '@cutcal/core'
import { Food, Usage } from '@cutcal/diet'
import { Nutrition, sumNutritions } from '@cutcal/nutrition'
import { map } from 'lodash'
import { scaleNutrition } from '../convertNutrition/convertNutrition'

/**
 * @description Agggregates the nutrition from among the usages passed in
 * @param {KVP<Usage>} usages
 * @param {KVP<Food>} foods
 * @returns {Nutrition<number>}
 */
export const sumUsagesNutritions = (
  usages: KVP<Usage>,
  foods: KVP<Food>
): Nutrition<number> =>
  sumNutritions(
    map(usages, usage => scaleNutrition(usage, foods[usage.foodId]))
  )
