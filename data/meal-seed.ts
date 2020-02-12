import { firestore } from 'firebase/app'
import * as _ from 'lodash'
import { sumUsagesNutritions } from '../../src/app/shared/functions/sumUsagesNutritions/sumUsagesNutritions'
import { uniqueID } from '../../src/app/shared/functions/uniqueID/uniqueID'
import { Food, KVP, Meal, Usage } from '../../src/app/shared/models'
import { bread_id, FOODS, jam_id, peanutButter_id } from './food-seed'

const USER_ID = 'ELYrdCulPrd9z8eHgyNgibmhnlH2'

// Meals
export const MEALS: KVP<Meal> = {}

// Breakfast
export const breakfast1_id = uniqueID()
export const breakfast1 = {
  _id: breakfast1_id,
  name: 'Breakfast',
  timestamp: firestore.Timestamp.fromDate(new Date(2019, 7, 23)),
  description: 'breakfast description',
  nutrition: {},
  instructions: [],
  image: {},
  userId: USER_ID,
}
MEALS[breakfast1_id] = breakfast1

// lunch
export const lunch1_id = uniqueID()
export const lunch1 = {
  _id: lunch1_id,
  name: 'Lunch',
  timestamp: firestore.Timestamp.fromDate(new Date(2019, 7, 23)),
  description: 'lunch description',
  nutrition: {},
  instructions: [],
  image: {},
  userId: USER_ID,
}
MEALS[lunch1_id] = lunch1

// Meal Usages
export const MEAL_USAGES: KVP<Usage> = {}

// Lunch Peanut Butter
export const lunch1_pb_id = uniqueID()
export const lunch1_pb = {
  _id: lunch1_pb_id,
  unit: 'tbsp',
  quantity: 2,
  foodId: peanutButter_id,
  parentId: lunch1_id,
  rootId: lunch1_id,
}
MEAL_USAGES[lunch1_pb_id] = lunch1_pb

// Lunch Jam
export const lunch1_jam_id = uniqueID()
export const lunch1_jam = {
  _id: lunch1_jam_id,
  unit: 'tablespoon',
  quantity: 2,
  foodId: jam_id,
  parentId: lunch1_id,
  rootId: lunch1_id,
}
MEAL_USAGES[lunch1_jam_id] = lunch1_jam

// Lunch Bread
export const lunch1_bread_id = uniqueID()
export const lunch1_bread = {
  _id: lunch1_bread_id,
  unit: 'slice',
  quantity: 2,
  foodId: bread_id,
  parentId: lunch1_id,
  rootId: lunch1_id,
}
MEAL_USAGES[lunch1_bread_id] = lunch1_bread

lunch1.nutrition = sumUsagesNutritions(MEAL_USAGES, FOODS)

// ID reassignment function
export function findUsagesForMeal(mealId: string) {
  return Object.values(MEAL_USAGES).filter(usage => usage.parentId == mealId)
}

export function assignMealParentId(meal: Meal, dbID: string): void {
  _.forEach(MEAL_USAGES, usage => {
    if (usage.parentId == meal._id) {
      usage.parentId = dbID
      usage.rootId = dbID
    }
  })
}

export function assignMealUsagesFoodIds(food: Food, dbID: string): void {
  _.forEach(MEAL_USAGES, usage => {
    if (usage.foodId == food._id) {
      usage.foodId = dbID
    }
  })
}
