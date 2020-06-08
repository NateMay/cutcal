import {
  FdcDump,
  FdcFoodAttribute,
  FdcFoodDetailResponse,
  FdcFoodGroup,
  FnddsFoodCategory
} from '@cutcal/api-interfaces'
import { purifyObject } from '@cutcal/core'
import { firestore } from 'firebase-admin'
import * as rp from 'request-promise'

export const getFoodFromFDC = async (fdcId: string): Promise<FdcDump> => {
  const avocado = await rp(
    `https://fdc.nal.usda.gov/portal-data/external/${fdcId}`
  )

  const {
    foodClass,
    id,
    description,
    foodNutrients,
    foodMeasures,
    foodComponents,
    foodAttributes,
    finalFoodInputFoods,
    foodType,
    foodCode,
    fnddsFoodCategory,
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

  return purifyObject<FdcDump>({
    foodClass,
    ingredients,
    fdcId: id,
    description,
    foodNutrients,
    foodMeasures,
    foodComponents,
    finalFoodInputFoods,
    foodType,
    foodCode,
    totalRefuse,
    scientificName,
    gtinUpc,
    categories: getCategories(foodAttributes, fnddsFoodCategory, foodGroup),
    updatedAt: firestore.Timestamp.now()
  })
}

function getCategories(
  foodAttributes: FdcFoodAttribute[],
  fnddsFoodCategory: FnddsFoodCategory,
  foodGroup: FdcFoodGroup
): string[] {
  const categories = []
  if (foodAttributes)
    foodAttributes.forEach(att =>
      categories.push(att.foodAttributeType.description)
    )
  if (fnddsFoodCategory) categories.push(fnddsFoodCategory.description)
  if (foodGroup) categories.push(foodGroup.description)
  return categories
}
