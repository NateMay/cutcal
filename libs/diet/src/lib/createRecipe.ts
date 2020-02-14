import { KVP } from '@cutcal/core'
import { Image } from '../models/images'
import { Ingredient } from '../models/ingredient'
import { Nutrition } from '../models/nutrition'
import { Portion } from '../models/portion'
import { Recipe } from '../models/recipe'

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
