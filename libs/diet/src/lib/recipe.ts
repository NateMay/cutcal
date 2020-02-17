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

export function createRecipe(
  name: string,
  description: string,
  defaultPortion: Portion,
  nutrition: Nutrition<number>,
  portions: KVP<Portion>,
  createdBy: string,
  isRecipe: boolean,
  isMeal: boolean,
  instructions: string[],
  foodGroup: string,
  primaryImage: Image,
  secondaryImages: KVP<Image>,
  ingredients: Ingredient[]
): Recipe {
  return {
    name,
    description,
    defaultPortion,
    ingredients,
    nutrition,
    portions,
    createdBy,
    isRecipe,
    isMeal,
    instructions,
    foodGroup,
    primaryImage,
    secondaryImages,
  }
}