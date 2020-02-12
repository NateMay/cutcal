import * as _ from 'lodash';
import { Food } from '../../models/food';
import { KVP } from '../../models/key-value-pair';
import { Nutrition } from '../../models/nutrition';
import { Usage } from '../../models/usage';
import { scaleNutrition } from '../convertNutrition/convertNutrition';
import { sumNutritions } from '../sumNutritions/sumNutritions';




/**
 * Agggregates the nutrition from among the usages passed in
 * @param {KVP<Usage>} usages
 * @param {KVP<Food>} foods
 * @returns {Nutrition<number>}
 */
export function sumUsagesNutritions(usages: KVP<Usage>, foods: KVP<Food>): Nutrition<number> {
  return sumNutritions(_.map(usages, usage => scaleNutrition(usage, foods[usage.foodId])))
}


