/* eslint-disable @typescript-eslint/no-misused-promises */
import { AlgoliaFood, NewFood, primaryImage } from '@cutcal/core'
import * as algoliasearch from 'algoliasearch'
import * as functions from 'firebase-functions'
import { SaveObjectResponse, DeleteResponse } from '@algolia/client-search';

/**
 * Set consifg data like this:
 *
 * @example
 * firebase functions:config:set algolia.appid="YOUR_APP_ID" algolia.apikey="YOUR_API_KEY"
 *
 * @question Do I need the "SEARCH_KEY" for any reason?
 * https://www.algolia.com/apps/OB2L36C5AS/api-keys/all
 */

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const { appid, apikey } = functions.config().algolia

const client = algoliasearch.default(appid, apikey)
const index = client.initIndex('dev_CUTCAL')

/**
 * @description write a new object or overwrite an Algolia index
 */

export const addFoodToAlgolia = async ({ food }: { food: NewFood }): Promise<SaveObjectResponse> => {
  const algolia = foodToAlgolia(food)
  return await index.saveObject({ ...algolia, objectID: algolia.fdcId })
}

export const foodToAlgolia = (food: NewFood): AlgoliaFood => ({
  objectID: `${food.fdcId}`,
  fdcId: food.fdcId,
  fdcName: food.fdcName,

  usageTier: getUsageTier(food.uses),
  likesTier: getLikeTier(food.likes),
  creatorName: food.creator.name,
  categories: [...new Set(food.categories)],
  name: food.name,
  description: food.description,
  image: primaryImage(food.images).url,

  // should only have content when created as a receipe
  isRecipe: false,
  ingredients: [],

  // TODO calculate
  highIn: [] // list of nutrients that this food can act as a suppliment for
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

export const deleteFoodToAlgolia = async (fdcId: number): Promise<DeleteResponse> =>
  await index.deleteObject(fdcId.toString())
