/* eslint-disable @typescript-eslint/no-misused-promises */
import * as functions from 'firebase-functions'
import { addFoodHandler } from './addFood/addFoodHandler'
import { createServer } from './nest-api/createServer'

/**
 * @description nestjs REST API for Food Data Central, Google, & Wikipedia
 */
export const api = functions.region('us-central1').https.onRequest(createServer)

/**
 * @enpoint https://us-central1-cutcal.cloudfunctions.net/helloWorld
 */
export const helloWorld = functions.https.onRequest((request, response) => {
  response.send('Hello from Firebase 2!')
})

/**
 * @description callable function to request a new food, dump it in
 * a firestore collection, modify it into the applicaion Food interface,
 * and push to the alglia index
 */
export const addFood = functions.https.onCall(addFoodHandler)

// TODO (onUpdate) https://fireship.io/lessons/algolia-cloud-functions/
// usages, likes, etc
