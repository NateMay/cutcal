import {
  FdcDump,
  FdcFoodMeasure,
  FdcFoodNutrient,
  FdcUnit,
  NewFood,
  newFoodReviewState, KVP, Nutrition, Portion, createPortion } from '@cutcal/core'
import { NUTRIENTS } from '@cutcal/nutrition'
import { firestore } from 'firebase-admin'
import { keyBy } from 'lodash'
import { ScrapedData } from './scrapeData'

export const dumpToFood = (dump: FdcDump, scraped: ScrapedData): NewFood => ({
  fdcId: dump.fdcId,
  fdcName: dump.description,
  nutrition: nutritionFromResponse(dump.foodNutrients),
  creator: {
    name: 'Food Data Central (USDA)',
    timestamp: firestore.Timestamp.now()
  },
  defaultPortion: createPortion('g', 100),
  portions: portionsFromMeasures(dump.foodMeasures),

  // user entry
  uses: 0,
  likes: 0,

  // encouraged entry
  reviews: [],
  ingredients: [],
  instructions: [],

  // scrapable
  reviewState: newFoodReviewState(),
  images: [
    {
      url: scraped.image,
      path: null,
      votes: 0,
      uploaderId: 'CutCal'
    }
  ],
  name: scraped.name,
  description: scraped.description,
  // TODO: scape this data too
  categories: dump.categories,
  dataQualityScore: 0
})

const nutritionFromResponse = (
  nutrients: FdcFoodNutrient[]
): Nutrition<number> => {
  const base: KVP<number> = {}
  const details = keyBy(NUTRIENTS.allDetails, 'id')

  nutrients.forEach((foodNutrient: FdcFoodNutrient) => {
    const meta = details[foodNutrient.nutrient.id]
    if (meta?.propName) base[meta.propName] = foodNutrient.value || 0
  })

  return base
}

const portionsFromMeasures = (
  measures: FdcFoodMeasure[] = []
): KVP<Portion> => ({
  grams: createPortion('g', 100),
  ...keyBy(
    measures.map((portion: FdcFoodMeasure) =>
      createPortion(unitFromMeasure(portion), portion.gramWeight / 100)
    ),
    'unit'
  )
})

const unitFromMeasure = (portion: FdcFoodMeasure): FdcUnit =>
  portion.disseminationText
    ? (portion.disseminationText.replace(/^(1 )/, '') as FdcUnit)
    : (portion.modifier as FdcUnit)
