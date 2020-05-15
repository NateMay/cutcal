/* eslint-disable @typescript-eslint/no-misused-promises */
import { AlgoliaFood, NewFood } from '@cutcal/api-interfaces'
import * as algoliasearch from 'algoliasearch'
import * as functions from 'firebase-functions'

/**
 * Set consifg data like this:
 *
 * @example
 * firebase functions:config:set algolia.APP_ID="#################"
 *
 * @question Do I need the "SEARCH_KEY" for any reason?
 * https://www.algolia.com/apps/OB2L36C5AS/api-keys/all
 */
const { APP_ID, ADMIN_KEY } = functions.config().algolia

const client = algoliasearch.default(APP_ID, ADMIN_KEY)
const index = client.initIndex('dev_CUTCAL')

/**
 * @description write a new object or overwrite an Algolia index
 */

export const addFoodToAlgolia = async ({ food }: { food: NewFood }) => {
  const algolia = foodToAlgolia(food)
  return await index.saveObject({ ...algolia, objectID: algolia.fdcId })
}

export const foodToAlgolia = (food: NewFood): AlgoliaFood => ({
  objectID: `${food.fdcId}`,
  fdcId: food.fdcId,

  usageTier: getUsageTier(food.uses),
  likesTier: getLikeTier(food.likes),
  creatorName: food.creator.name,
  categories: food.categories,

  // TODO scrape
  name: food.name,
  description: food.description,
  image: 'https://',

  // TODO calculate
  highIn: [], // list of nutrients that this food can act as a suppliment for

  // TODO Gather from food-review
  ingredients: [],
  isRecipe: false
})

/**
 * @description for now, "tier" is based on the number of digits in a number
 */
const getUsageTier = (uses: number): number =>
  uses ? uses.toString().length : 0

const getLikeTier = (likes: number): number => getUsageTier(likes)

/**
 * @description write a new object or overwrite an Algolia index
 */

export const deleteFoodToAlgolia = async (fdcId: number) =>
  await index.deleteObject(fdcId.toString())
