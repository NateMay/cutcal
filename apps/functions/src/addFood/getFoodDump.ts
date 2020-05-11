import { FdcDump, FdcFoodDetailResponse } from '@cutcal/api-interfaces'
import * as rp from 'request-promise'

export const getFoodDump = async (fdcId: string): Promise<FdcDump> => {
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

  return JSON.parse(
    JSON.stringify({
      foodClass,
      ingredients,
      id,
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
    })
  )
}
