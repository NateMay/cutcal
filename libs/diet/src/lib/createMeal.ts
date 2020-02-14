import { timestamp as timestampFunc } from '@cutcal/core'
import { Nutrition } from '@cutcal/nutrition'
import { firestore } from 'firebase/app'
import { Image } from './images'
import { Meal } from './meal'

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
    timestamp: timestamp || timestampFunc(),
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
