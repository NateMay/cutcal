import * as functions from 'firebase-functions'
import { deleteFoodToAlgolia } from '../../algolia/addFoodToAlgolia'

/**
 * @description called when a user likes a food
 */
export const deleteFoodHandler = async (
  snapshot: functions.firestore.DocumentSnapshot,
  context: functions.EventContext
) => await deleteFoodToAlgolia(snapshot.data().fdcId)
