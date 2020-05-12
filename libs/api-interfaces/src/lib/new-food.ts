import { KVP } from '@cutcal/core'
import { Image, Portion } from '@cutcal/diet'
import { Nutrition } from '@cutcal/nutrition'
import { firestore } from 'firebase/app'

// export interface FDCFoodDump  { }
// use FdcFoodDetailResponse

export interface FoodBase {
  name: string
  description: string
  fdcId: number
}

export interface AlgoliaFood extends FoodBase {
  objectID: string
  highIn: string[] // list of nutrients that this food can act as a suppliment for
  ingredients: string[]
  isRecipe: boolean // whether it has instructions
  usageTier: number // for example: 0 - 99, 100 - 999, 1000 - 9999, etc
  creatorName: string
  categories: string[]
  imageUrl: string
}

export interface NewFood extends FoodBase {
  nutrition: Nutrition<number>
  creator: NewFoodCreator
  defaultPortion: Portion
  portions: KVP<Portion>
  ingredients: Food2Ingredient[]
  fdcName: string
  usage: number
  images: Image[]
  // instructions
}

interface Food2Ingredient {
  name: string
  fdcId: number
}

interface NewFoodCreator {
  name: string
  timestamp: firestore.Timestamp
}
