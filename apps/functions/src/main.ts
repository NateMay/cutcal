/* eslint-disable @typescript-eslint/no-misused-promises */
import * as functions from 'firebase-functions'
import { addFoodHandler } from './food/addFood/addFoodHandler'
import { deleteFoodHandler } from './food/deleteFood/deleteFoodHandler'
import { editFoodHandler } from './food/editFood/editFoodHandler'
import { likeFoodHandler } from './food/likeFood/likeFoodHandler'
import { useFoodHandler } from './food/useFood/useFoodHandler'
import { createServer } from './nest-api/createServer'

/**
 * @description nestjs REST API for Food Data Central, Google, & Wikipedia
 */
export const api = functions.region('us-central1').https.onRequest(createServer)

/**
 * @description callable function to request a new food, dump it in
 * a firestore collection, modify it into the applicaion Food interface,
 * and push to the alglia index
 */
export const addFood = functions.https.onCall(addFoodHandler)

// TODO (onUpdate) https://fireship.io/lessons/algolia-cloud-functions/
// usages, likes, etc

/**
 * @description called when the food is added to a user's calendar
 */
export const useFood = functions.https.onCall(useFoodHandler)

/**
 * @description called when a user likes a food
 */
export const likeFood = functions.https.onCall(likeFoodHandler)

/**
 * @description when a food is edited, updated algolia
 */
export const editFood = functions.firestore
  .document('foods/{foodId}')
  .onUpdate(editFoodHandler)

/**
 * @description called when a user likes a food
 */
export const deleteFood = functions.firestore
  .document('foods/{foodId}')
  .onDelete(deleteFoodHandler)
