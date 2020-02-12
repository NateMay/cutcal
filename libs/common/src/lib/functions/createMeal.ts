import { firestore } from 'firebase/app'
import { Image } from '../models/images'
import { Meal } from '../models/meal'
import { Nutrition } from '../models/nutrition'
import { timestamp as newTimestamp } from './timestamp/timestamp'

export function createMeal(
  name?: string,
  timestamp?: firestore.Timestamp,
  nutrition?: Nutrition<number>,
  description?: string,
  instructions?: string[],
  image?: Image,
  userId?: string
): Meal {
  return {
    name: name || '',
    timestamp: timestamp || newTimestamp(),
    notes: description || '',
    nutrition: nutrition || {},
    instructions: instructions || [],
    image: image || { url: '' },
    userId: userId || '',
    _id: '',
  }
}

export function createMealWithId(
  _id: string,
  name?: string,
  timestamp?: firestore.Timestamp,
  nutrition?: Nutrition<number>,
  description?: string,
  instructions?: string[],
  image?: Image,
  userId?: string
): Meal {
  return {
    _id,
    ...createMeal(
      name,
      timestamp,
      nutrition,
      description,
      instructions,
      image,
      userId
    ),
  }
}
