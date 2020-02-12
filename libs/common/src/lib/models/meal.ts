import { firestore } from 'firebase/app'
import { Image } from './images'
import { Nutrition } from './nutrition'

// FEATURE (meal) category / color

/**
 * Object representing the notion of a meal
 *
 * All ingredients of a meal (and therefore its nutrition) are composed
 *   of a pairing of a food with its Usage.
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

export function isMeal(obj: any): boolean {
  return !!obj.timestamp && !!obj.name && !!obj.nutrition
}
