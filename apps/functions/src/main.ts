/* eslint-disable @typescript-eslint/no-misused-promises */
import * as functions from 'firebase-functions'
import { getFoodDump } from './addFood/getFoodDump'
import { firestore } from './helpers/initializeApp'
import { createServer } from './nest-api/createServer'

export const api = functions.region('us-central1').https.onRequest(createServer)

/**
 * @enpoint https://us-central1-cutcal.cloudfunctions.net/helloWorld
 */
export const helloWorld = functions.https.onRequest((request, response) => {
  response.send('Hello from Firebase 2!')
})

export const addFood = functions.https.onCall(async (data, context) => {
  // Only allow admin users to execute this function.
  // ensureLoggedIn(context);

  const dump = await getFoodDump(data)

  const result = await firestore.collection('fdc-dump').add(dump)

  return `FDC item:: ${result.id}`
})
