import {
  FdcDump,
  FdcFoodMeasure,
  FdcFoodNutrient,
  NewFood
} from '@cutcal/api-interfaces'
import { KVP } from '@cutcal/core'
import { createPortion, Portion } from '@cutcal/diet'
import { NUTRIENTS, Nutrition } from '@cutcal/nutrition'
import { keyBy } from 'lodash'

export const dumpToFood = (dump: FdcDump): NewFood => ({
  name: dump.description,
  description: dump.description,
  fdcId: dump.id,
  nutrition: nutritionFromResponse(dump.foodNutrients),
  creator: null,
  defaultPortion: createPortion('grams', 100),
  portions: portionsFromResponse(dump.foodMeasures),
  ingredients: [],
  fdcName: dump.description,
  usage: 0,
  images: null
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

const portionsFromResponse = (measures: FdcFoodMeasure[]): KVP<Portion> => ({
  grams: {
    unit: 'grams',
    quantity: 100
  },
  ...keyBy(
    measures ||
      [].map((portion: FdcFoodMeasure) =>
        createPortion(unitFromMeasure(portion), portion.gramWeight / 100)
      ),
    'unit'
  )
})

const unitFromMeasure = (portion: FdcFoodMeasure): string =>
  portion.disseminationText
    ? portion.disseminationText.replace(/^(1 )/, '')
    : portion.modifier
