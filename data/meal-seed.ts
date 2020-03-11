import { sumUsagesNutritions } from '@cutcal/common'
import { KVP, uniqueID } from '@cutcal/core'
import { Food, Meal, Usage } from '@cutcal/diet'
import { firestore } from 'firebase/app'
import { forEach } from 'lodash'
import { breadID, FOODS, jamID, peanutButterID } from './food-seed'
const USER_ID = 'ELYrdCulPrd9z8eHgyNgibmhnlH2'

// Meals
export const MEALS: KVP<Meal> = {}

// Breakfast
export const breakfast1ID = uniqueID()
export const breakfast1 = {
  _id: breakfast1ID,
  name: 'Breakfast',
  timestamp: firestore.Timestamp.fromDate(new Date(2019, 7, 23)),
  description: 'breakfast description',
  nutrition: {},
  instructions: [],
  image: {},
  userId: USER_ID,
}
MEALS[breakfast1ID] = breakfast1

// lunch
export const lunch1ID = uniqueID()
export const lunch1 = {
  _id: lunch1ID,
  name: 'Lunch',
  timestamp: firestore.Timestamp.fromDate(new Date(2019, 7, 23)),
  description: 'lunch description',
  nutrition: {},
  instructions: [],
  image: {},
  userId: USER_ID,
}
MEALS[lunch1ID] = lunch1

// Meal Usages
export const MEAL_USAGES: KVP<Usage> = {}

// Lunch Peanut Butter
export const lunch1PBID = uniqueID()
export const lunch1PB = {
  _id: lunch1PBID,
  unit: 'tbsp',
  quantity: 2,
  foodId: peanutButterID,
  parentId: lunch1ID,
  rootId: lunch1ID,
}
MEAL_USAGES[lunch1PBID] = lunch1PB

// Lunch Jam
export const lunch1JamID = uniqueID()
export const lunch1Jam = {
  _id: lunch1JamID,
  unit: 'tablespoon',
  quantity: 2,
  foodId: jamID,
  parentId: lunch1ID,
  rootId: lunch1ID,
}
MEAL_USAGES[lunch1JamID] = lunch1Jam

// Lunch Bread
export const lunch1BreadID = uniqueID()
export const lunch1Bread = {
  _id: lunch1BreadID,
  unit: 'slice',
  quantity: 2,
  foodId: breadID,
  parentId: lunch1ID,
  rootId: lunch1ID,
}
MEAL_USAGES[lunch1BreadID] = lunch1Bread

lunch1.nutrition = sumUsagesNutritions(MEAL_USAGES, FOODS)

// ID reassignment function
export const findUsagesForMeal = (mealId: string): Usage[] =>
  Object.values(MEAL_USAGES).filter(usage => usage.parentId == mealId)

export const assignMealParentId = (meal: Meal, dbID: string): void => {
  forEach(MEAL_USAGES, usage => {
    if (usage.parentId == meal._id) {
      usage.parentId = dbID
      usage.rootId = dbID
    }
  })
}

export const assignMealUsagesFoodIds = (food: Food, dbID: string): void => {
  forEach(MEAL_USAGES, usage => {
    if (usage.foodId == food._id) {
      usage.foodId = dbID
    }
  })
}
