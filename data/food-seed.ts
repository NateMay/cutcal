// import { sumUsagesNutritions } from '../../src/app/shared/functions/sumUsagesNutritions/sumUsagesNutritions';
import { KVP, uniqueID } from '@cutcal/core'
import { Food, Usage } from '@cutcal/diet'
import * as _ from 'lodash'

export const FOODS: KVP<Food> = {}

// Peanut Butter
export const peanutButter_id = uniqueID()
export const peanutButter = {
  _id: peanutButter_id,
  NDBNO: '16098',
  USDAName:
    'Peanut butter, smooth style, with salt (Includes foods for USDAs Food Distribution Program)',
  name: 'Peanut Butter',
  foodGroup: 'Legumes and Legume Products',
  primaryImage: {
    url:
      'https://firebasestorage.googleapis.com/v0/b/test-app-8dc99.appspot.com/o/foods%2Fpeanut_butter2.png?alt=media&token=2a6cdf5c-40a0-462e-b69b-7f135b76e1d4',
  },
  portions: {
    g: {
      unit: 'g',
      quantity: 258,
    },
    cup: {
      unit: 'cup',
      quantity: 1,
    },
    tbsp: {
      quantity: 16.125,
      unit: 'tbsp',
    },
  },
  defaultPortion: {
    quantity: 2,
    unit: 'tbsp',
  },
  nutrition: {
    kj: 6453,
    _14$0: 0.052,
    _15$0: 0.015,
    _16$0: 12.232,
    _16$1_undif: 0.077,
    _16$1c: 0.077,
    _17$0: 0.119,
    _17$1: 0.075,
    _18$0: 5.627,
    _18$1_undif: 64.015,
    _18$1c: 63.901,
    _18$1t: 0.111,
    _18$2_CLAs: 0.028,
    _18$2_undif: 31.641,
    _18$2n6: 31.515,
    _18$2t_nfd: 0.075,
    _18$3_undif: 0.072,
    _18$3n3: 0.07,
    _18$3n6: 0.003,
    _20$0: 1.855,
    _20$1: 1.494,
    _20$2n6: 0.021,
    _20$3_undif: 0.026,
    _20$4_undif: 0.046,
    _22$0: 4.394,
    _22$1_undif: 0.119,
    _22$1c: 0.114,
    _22$1t: 0.003,
    _24$0: 1.886,
    alanine: 2.363,
    arginine: 7.141,
    ash: 7.46,
    aspartic_acid: 7.879,
    beta_tocopherol: 1.34,
    betaine: 2.1,
    calcium: 126,
    calories: 1543,
    carbohydrates: 57.56,
    choline: 162.5,
    copper: 1.089,
    cystine: 0.591,
    delta_tocopherol: 1.91,
    dietary_fiber: 12.9,
    dietary_folate_equiv: 224,
    fat: 132.51,
    folate: 224,
    food_folate: 224,
    fructose: 0.31,
    gamma_tocopherol: 19.66,
    glucose: 0.34,
    glutamic_acid: 13.137,
    glycine: 3.707,
    histidine: 1.437,
    iron: 4.49,
    isoleucine: 1.589,
    leucine: 3.989,
    lysine: 1.757,
    magnesium: 433,
    manganese: 4.296,
    methionine: 0.684,
    monoUnsaturated: 66.928,
    monoenoic: 0.119,
    niacin: 33.829,
    pantothenic_acid: 2.933,
    phenylalanine: 3.101,
    phosphorus: 864,
    polyUnsaturated: 32.34,
    potassium: 1440,
    proline: 3.633,
    protein: 57.3,
    riboflavin: 0.495,
    saturatedFat: 26.639,
    selenium: 10.6,
    serine: 3.821,
    sodium: 1099,
    starch: 9.18,
    sucrose: 26.45,
    sugar: 27.06,
    thiamin: 0.387,
    threonine: 1.355,
    transUnsaturated: 0.193,
    tryptophan: 0.596,
    tyrosine: 2.139,
    valine: 2.018,
    vit_B6: 1.138,
    vit_E: 23.48,
    vit_K: 0.8,
    water: 3.17,
    zinc: 6.48,
  },
  uses: 0,
}
FOODS[peanutButter_id] = peanutButter

// Jam
export const jam_id = uniqueID()
export const jam: Food = {
  _id: jam_id,
  NDBNO: '19920',
  USDAName: 'Jams, preserves, marmalades, sweetened with fruit juice',
  portions: {
    g: {
      quantity: 19,
      unit: 'g',
    },
    tablespoon: {
      quantity: 1,
      unit: 'tablespoon',
    },
  },
  foodGroup: 'Sweets',
  name: 'Jam',
  nutrition: {
    kj: 168,
    ash: 0.04,
    beta_carotene: 2,
    calcium: 2,
    calories: 40,
    carbohydrates: 10.06,
    choline: 0.5,
    copper: 0.006,
    dietary_fiber: 0.2,
    dietary_folate_equiv: 1,
    fluoride: 0.2,
    folate: 1,
    food_folate: 1,
    iron: 0.06,
    lutein_zeaxanthin: 2,
    magnesium: 1,
    manganese: 0.03,
    niacin: 0.039,
    pantothenic_acid: 0.01,
    phosphorus: 1,
    potassium: 12,
    riboflavin: 0.004,
    selenium: 0.2,
    sugar: 7.98,
    thiamin: 0.005,
    vit_A: 4,
    vit_B6: 0.002,
    vit_C: 3.4,
    vit_E: 0.02,
    vit_K: 0.2,
    water: 8.9,
    zinc: 0.04,
  },
  defaultPortion: {
    quantity: 2,
    unit: 'g',
  },
  primaryImage: {
    url:
      'https://firebasestorage.googleapis.com/v0/b/test-app-8dc99.appspot.com/o/foods%2Fjam.png?alt=media&token=15c9a34f-fe94-4568-99c2-3246f0185b35',
  },
  uses: 0,
}
FOODS[jam_id] = jam

// Bread
export const bread_id = uniqueID()
export const bread: Food = {
  _id: bread_id,
  NDBNO: '18064',
  USDAName: 'Bread, wheat',
  portions: {
    g: {
      quantity: 29,
      unit: 'g',
    },
    slice: {
      quantity: 1,
      unit: 'slice',
    },
  },
  foodGroup: 'Baked Products',
  name: 'Bread, wheat',
  nutrition: {
    kj: 332,
    _12$0: 0.002,
    _14$0: 0.002,
    _15$0: 0.001,
    _16$0: 0.128,
    _16$1_undif: 0.006,
    _16$1c: 0.006,
    _17$0: 0.002,
    _17$1: 0.001,
    _18$0: 0.062,
    _18$1_undif: 0.167,
    _18$1c: 0.16,
    _18$1t: 0.008,
    _18$2_undif: 0.42,
    _18$2n6: 0.418,
    _18$2t_nfd: 0.002,
    _18$3_undif: 0.047,
    _18$3n3: 0.045,
    _18$3n6: 0.001,
    _20$0: 0.002,
    _20$1: 0.004,
    _20$5n3: 0.001,
    _22$0: 0.002,
    _24$0: 0.001,
    alpha_tocotrienol: 0.03,
    ash: 0.58,
    beta_tocopherol: 0.02,
    betaine: 24.7,
    calcium: 36,
    calories: 79,
    carbohydrates: 13.79,
    choline: 5.4,
    copper: 0.043,
    delta_tocopherol: 0.1,
    dietary_fiber: 1.2,
    dietary_folate_equiv: 29,
    fat: 1.31,
    folate: 25,
    folic_acid: 6,
    food_folate: 19,
    fructose: 0.68,
    gamma_tocopherol: 0.45,
    glucose: 0.48,
    iron: 1.04,
    lutein_zeaxanthin: 13,
    magnesium: 12,
    maltose: 0.5,
    manganese: 0.298,
    monoUnsaturated: 0.177,
    monoenoic: 0.008,
    niacin: 1.621,
    pantothenic_acid: 0.238,
    phosphorus: 37,
    polyUnsaturated: 0.468,
    potassium: 41,
    protein: 3.09,
    riboflavin: 0.073,
    saturatedFat: 0.202,
    selenium: 8.4,
    sodium: 137,
    starch: 10.54,
    sugar: 1.66,
    thiamin: 0.119,
    transUnsaturated: 0.01,
    vit_A: 1,
    vit_B6: 0.032,
    vit_C: 0.1,
    vit_E: 0.06,
    vit_K: 1.4,
    water: 10.22,
    zinc: 0.3,
  },
  defaultPortion: {
    quantity: 29,
    unit: 'g',
  },
  primaryImage: {
    url:
      'https://firebasestorage.googleapis.com/v0/b/test-app-8dc99.appspot.com/o/foods%2Fbread.png?alt=media&token=142097b0-6d03-4480-b810-b1849e5d5d7a',
  },
  uses: 0,
}
FOODS[bread_id] = bread

// PBJ
export const pbj_id = uniqueID()
export const pbj: Food = {
  _id: pbj_id,
  name: 'Peanut Butter and Jelly Sandwich',
  defaultPortion: {
    quantity: 1,
    unit: 'sandwich',
  },
  portions: {
    sandwich: {
      quantity: 1,
      unit: 'sandwich',
    },
  },
  nutrition: {},
  primaryImage: {},
  uses: 0,
}
FOODS[pbj_id] = pbj

// Food Usages
export const FOOD_USAGES: KVP<Usage> = {}

// PBJ Peanut Butter
export const pbj_pb_id = uniqueID()
export const pbj_pb = {
  _id: pbj_pb_id,
  unit: 'tbsp',
  quantity: 2,
  foodId: peanutButter_id,
  parentId: pbj_id,
  rootId: pbj_id,
}
FOOD_USAGES[pbj_pb_id] = pbj_pb

// PBJ Jam
export const pbj_jam_id = uniqueID()
export const pbj_jam = {
  _id: pbj_jam_id,
  unit: 'tablespoon',
  quantity: 2,
  foodId: jam_id,
  parentId: pbj_id,
  rootId: pbj_id,
}
FOOD_USAGES[pbj_jam_id] = pbj_jam

// PBJ Bread
export const pbj_bread_id = uniqueID()
export const pbj_bread = {
  _id: pbj_bread_id,
  unit: 'slice',
  quantity: 2,
  foodId: bread_id,
  parentId: pbj_id,
  rootId: pbj_id,
}
FOOD_USAGES[pbj_bread_id] = pbj_bread

// pbj.nutrition = sumUsagesNutritions(FOOD_USAGES, FOODS);

/**
 * Gets all of the usages for a food
 * @param {string} parentFoodId
 * @returns {Usage[]}
 */
export function findUsagesForFood(parentFoodId: string): Usage[] {
  return Object.values(FOOD_USAGES).filter(
    usage => usage.parentId == parentFoodId
  )
}

/**
 * Gets all of the usages for a food
 * @param {Food} food
 */
export function assignFoodRefAndParentId(food: Food, dbID: string): void {
  _.forEach(FOOD_USAGES, usage => {
    if (usage.parentId == food._id) {
      usage.parentId = dbID
      usage.foodId = dbID
      usage.rootId = dbID
    }
  })
}
