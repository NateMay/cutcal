import { NewFood } from '@cutcal/core'
import * as functions from 'firebase-functions'
import { addFoodToAlgolia } from '../../algolia/addFoodToAlgolia'
import { SaveObjectResponse } from '@algolia/client-search';

export interface FoodAlgoliaPair {
  food: NewFood,
  algolia: SaveObjectResponse
}
/**
 * @description called when a user likes a food
 */
export const editFoodHandler = async (
  snapshot: functions.Change<functions.firestore.DocumentSnapshot>
): Promise<FoodAlgoliaPair> => {
  const food = snapshot.after.data() as NewFood
  const algolia = await addFoodToAlgolia({ food })
  return { food, algolia }
}
