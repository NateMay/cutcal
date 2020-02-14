import { KVP } from '@cutcal/core'
import { Nutrition } from '@cutcal/nutrition'
import { Image } from './images'
import { Ingredient } from './ingredient'
import { Portion } from './portion'

/**
 * Much like a food, but not from the USDA so it rolls up the nutrition from its children
 */
export interface Recipe {
  _id?: string
  name: string
  defaultPortion: Portion
  foodGroup: string
  nutrition: Nutrition<number>
  portions: KVP<Portion>
  description: string
  primaryImage: Image
  secondaryImages: KVP<Image>
  createdBy: string
  isRecipe: boolean
  isMeal: boolean
  ingredients: Ingredient[]
  instructions?: string[]
}
