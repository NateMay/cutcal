import { timestamp as newTimestamp } from '@cutcal/fire'
import { Nutrition } from '@cutcal/nutrition'
import { firestore } from 'firebase/app'
import { Image } from './images'
// FEATURE (meal) category / color

/**
 * @description Object representing the notion of a meal
 *
 * All ingredients of a meal (and therefore its nutrition) are composed
 * of a pairing of a food with its Usage.
 *
 * Usages are asscoaiated in Firbase via a subcollection "usages"
 */
export interface Meal {
  _id: string
  userId: string
  name: string
  timestamp: firestore.Timestamp
  nutrition: Nutrition<number>
  instructions?: string[]
  notes?: string
  image?: Image
  // TODO (meal) or does this belong in the usage or both?
  // foodRefs?: string[];
  // TODO (meal)
  // color?: string;
}

export const isMeal = (obj: any): boolean =>
  !!obj.timestamp && !!obj.name && !!obj.nutrition

export const createMeal = (
  name?: string,
  timestamp?: firestore.Timestamp,
  nutrition?: Nutrition<number>,
  description?: string,
  instructions?: string[],
  image?: Image,
  userId?: string
): Meal => ({
  name: name || '',
  timestamp: timestamp || newTimestamp(),
  notes: description || '',
  nutrition: nutrition || {},
  instructions: instructions || [],
  image: image || { url: '' },
  userId: userId || '',
  _id: ''
})

export const createMealWithId = (
  _id: string,
  name?: string,
  timestamp?: firestore.Timestamp,
  nutrition?: Nutrition<number>,
  description?: string,
  instructions?: string[],
  image?: Image,
  userId?: string
): Meal => ({
  _id,
  ...createMeal(
    name,
    timestamp,
    nutrition,
    description,
    instructions,
    image,
    userId
  )
})

/**
 * Passed to the cloud function to delete a meal
 */
export interface DeleteMealPayload {
  mealId: string
}
