import * as functions from 'firebase-functions'

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

/**
 * @enpoint https://us-central1-cutcal.cloudfunctions.net/helloWorld
 */
export const helloWorld = functions.https.onRequest((request, response) => {
  response.send('Hello from Firebase!')
})

export const addFood = functions.https.onCall(
  (data, context) => `FDC item:: ${data.fdcId}`
)
