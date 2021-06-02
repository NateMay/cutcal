import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
import { firestore } from '../../helpers/initializeApp'

interface LikeFoodCall {
  foodId: string
}

export const likeFoodHandler = async (
  callData: LikeFoodCall,
  context: functions.https.CallableContext
): Promise<unknown> =>
  firestore
    .collection('foods')
    .doc(callData.foodId)
    .update({ likes: admin.firestore.FieldValue.increment(1) })
