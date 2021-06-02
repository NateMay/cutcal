import * as functions from 'firebase-functions'
import { deleteFoodToAlgolia } from '../../algolia/addFoodToAlgolia'
import { DeleteResponse } from '@algolia/client-search'

/**
 * @description called when a user likes a food
 */
export const deleteFoodHandler = async (
  snapshot: functions.firestore.DocumentSnapshot,
  context: functions.EventContext
): Promise<DeleteResponse> => await deleteFoodToAlgolia(snapshot.data().fdcId)
