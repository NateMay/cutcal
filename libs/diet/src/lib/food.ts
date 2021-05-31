import { KVP, Nutrition, Image, Portion } from '@cutcal/core'
import { Meal } from './meal';

/**
 * @description An Object storing information about an abstract notion of a Food, Recipe,
 * or Meal, but not a specific consumption of it. Think of it as metadata
 *
 * It is used to present abstract food information (like on the food page, or in search)
 * or tangible moments of food consumption when paired with a Usage
 *
 * The foundation Foods came from the
 * Built mainly from USDA data, this object stores basic information for a food
 */
export interface Food {
  _id?: string

  /* USDA + crowd source */

  name: string // should populate from the usda name until crowdsourced
  defaultPortion: Portion
  description?: string // should populate from the usda name until crowdsourced

  /* recipe form */

  isRecipe?: boolean
  isMeal?: boolean
  // isEntre
  // isAppetizer
  // isDessert
  foodRefs?: string[]
  instructions?: string[]

  /* from usda */

  // TODO (FDC) deprecate
  footnotes?: string[]
  // TODO (FDC) change to fdcName
  USDAName?: string
  // TODO (FDC) convert to categories array
  foodGroup?: string
  // TODO (FDC) update for FDC
  sources?: FoodSource[]
  nutrition: Nutrition<number>
  // TODO (FDC) deprecate
  // TODO (FDC) update for FDC
  NDBNO?: string
  portions: KVP<Portion>

  /* calculated fields */

  uses?: number
  createdBy?: string
  primaryImage?: Image
  secondaryImages?: KVP<Image>
}

export const createFood = (
  name: string,
  nutrition: Nutrition<number>,
  portions: KVP<Portion>,
  defaultPortion: Portion,
  foodGroup?: string,
  USDAName?: string,
  description?: string,
  footnotes?: string[],
  sources?: FoodSource[],
  createdBy?: string,
  NDBNO?: string,
  isRecipe?: boolean,
  isMeal?: boolean,
  instructions?: string[],
  primaryImage?: Image,
  secondaryImages?: KVP<Image>,
  foodRefs?: string[]
): Food => ({
  name,
  USDAName,
  description,
  defaultPortion,
  foodRefs,
  nutrition,
  portions,
  footnotes,
  sources,
  createdBy,
  NDBNO,
  isRecipe,
  isMeal,
  instructions,
  foodGroup,
  uses: 0,
  primaryImage,
  secondaryImages
})

export interface FoodSource {
  // usda
  id?: number
  authors?: string
  iss?: string
  title?: string
  vol?: string
  year?: string
  // user
  comments?: string
  referenceUrl?: string
}

// TEST (food)
export const isFood = (obj: Meal | Food): boolean =>
  'NDBNO' in obj || 'foodGroup' in obj || 'USDAName' in obj || 'portions' in obj
