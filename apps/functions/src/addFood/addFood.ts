/* eslint-disable @typescript-eslint/no-misused-promises */
import { FdcFoodDetailResponse } from '@cutcal/api-interfaces'
import * as functions from 'firebase-functions'
import { identity, pickBy } from 'lodash'
import * as rp from 'request-promise'
import { firestore } from '../helpers/initializeApp'

export const addFood = async (
  data: any,
  context: functions.https.CallableContext
) => {
  // Only allow admin users to execute this function.
  // ensureLoggedIn(context);

  const { fdcId } = data

  const avocado = await rp(
    `https://fdc.nal.usda.gov/portal-data/external/${fdcId}`
  )

  const {
    foodClass,
    id,
    description,
    lastUpdated,
    foodNutrients,
    foodMeasures,
    foodComponents,
    foodAttributes,
    finalFoodInputFoods,
    foodType,
    foodCode,
    fnddsFoodCategory,
    startDate,
    endDate,
    totalRefuse,
    scientificName,
    foodGroup,
    gtinUpc,
    ingredients
  } = JSON.parse(avocado) as FdcFoodDetailResponse

  const categories = []
  if (foodAttributes)
    foodAttributes.forEach(att =>
      categories.push(att.foodAttributeType.description)
    )
  if (fnddsFoodCategory) categories.push(fnddsFoodCategory.description)
  if (foodGroup) categories.push(foodGroup.description)

  const result = await firestore.collection('fdc-dump').add(
    pickBy(
      {
        foodClass,
        ingredients,
        fdcId: id,
        description,
        lastUpdated,
        categories: [...new Set(categories)],
        foodNutrients,
        foodMeasures,
        foodComponents,
        finalFoodInputFoods,
        foodType,
        foodCode,
        startDate,
        endDate,
        totalRefuse,
        scientificName,
        gtinUpc
      },
      identity
    )
  )

  return `FDC item:: ${result.id}`
}
