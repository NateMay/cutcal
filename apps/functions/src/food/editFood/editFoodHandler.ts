import { NewFood } from '@cutcal/api-interfaces'
import * as functions from 'firebase-functions'
import { addFoodToAlgolia } from '../../algolia/addFoodToAlgolia'

/**
 * @description called when a user likes a food
 */
export const editFoodHandler = async (
  snapshot: functions.Change<functions.firestore.DocumentSnapshot>
) => {
  const food = snapshot.after.data() as NewFood
  const algolia = await addFoodToAlgolia({ food })
  return { food, algolia }
}
