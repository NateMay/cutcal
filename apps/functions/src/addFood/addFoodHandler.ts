/* eslint-disable @typescript-eslint/no-misused-promises */
import * as algoliasearch from 'algoliasearch'
import * as functions from 'firebase-functions'
import { firestore } from '../helpers/initializeApp'
import { dumpToFood } from './dumpToFood'
import { foodToAlgolia } from './foodToAlgolia'
import { getFoodDump } from './getFoodDump'

const APP_ID = functions.config().algolia.app
const ADMIN_KEY = functions.config().algolia.key

const client = algoliasearch.default(APP_ID, ADMIN_KEY)
const index = client.initIndex('dev_CUTCAL')

interface CallData {
  fdcId: string
}

export const addFoodHandler = async (
  data: CallData,
  context: functions.https.CallableContext
) => {
  // Only allow admin users to execute this function.
  // ensureLoggedIn(context);

  const { fdcId } = data

  const dump = await getFoodDump(fdcId)

  await firestore.collection('fdc-dump').add(dump)

  const food = dumpToFood(dump)

  await firestore.collection('foods').add(food)

  const algolia = foodToAlgolia(food)

  index.saveObject({ ...algolia, objectID: fdcId })

  return {
    dump,
    food,
    algolia
  }
}
