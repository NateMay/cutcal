/* eslint-disable @typescript-eslint/no-misused-promises */
import { AddFoodReponse, FdcDump } from '@cutcal/core'
import * as functions from 'firebase-functions'
import { addFoodToAlgolia } from '../../algolia/addFoodToAlgolia'
import { firestore } from '../../helpers/initializeApp'
import { ADD_FOOD_DEBUG } from './addFoodDebug'
import { createSearchTerm } from './createSearchTerm'
import { dumpToFood } from './dumpToFood'
import { getFoodFromFDC } from './getFoodFromFDC'
import { ScrapedData } from './scrapeData'
import { scrapeDescription } from './scrapeDescription'
import { scrapeImage } from './scrapeImage'

interface CallAddFood {
  fdcId: string
}

export const addFoodHandler = async (
  data: CallAddFood,
  context: functions.https.CallableContext
): Promise<AddFoodReponse> => {
  // ensureLoggedIn(context);

  const { fdcId } = data
  console.log('fdcId', fdcId)

  // dump the moreorless raw data into FireStore
  const dump = await getFoodFromFDC(fdcId)
  if (ADD_FOOD_DEBUG) console.log('dump', dump)
  await firestore.collection('fdc-dump').add(dump)

  // get custom search results
  const scraped = await scrapeFoodData(dump)
  if (ADD_FOOD_DEBUG) console.log('scraped', scraped)

  // create the food entity
  const food = dumpToFood(dump, scraped)
  await firestore.collection('foods').add(food)

  // add to the algolia index
  const algolia = await addFoodToAlgolia({ food })

  return { dump, food, algolia }
}

const scrapeFoodData = async (food: FdcDump): Promise<ScrapedData> => {
  const cleanTerm = createSearchTerm(food)

  // kick them off custom searches in parrallel
  const descriptionPromise = scrapeDescription(cleanTerm)
  const imagePromise = scrapeImage(cleanTerm)

  // await them all together
  return {
    name: cleanTerm,
    description: await descriptionPromise,
    image: await imagePromise
  }
}
