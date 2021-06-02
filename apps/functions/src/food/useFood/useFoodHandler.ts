import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
import { firestore } from '../../helpers/initializeApp'

interface UseFoodCall {
  foodId: string
}

export const useFoodHandler = async (
  callData: UseFoodCall,
  context: functions.https.CallableContext
): Promise<unknown> =>
  firestore
    .collection('foods')
    .doc(callData.foodId)
    .update({ usage: admin.firestore.FieldValue.increment(1) })
