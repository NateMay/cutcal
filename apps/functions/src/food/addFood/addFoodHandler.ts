/* eslint-disable @typescript-eslint/no-misused-promises */
import { FdcDump } from '@cutcal/api-interfaces'
import * as functions from 'firebase-functions'
import { addFoodToAlgolia } from '../../algolia/addFoodToAlgolia'
import { firestore } from '../../helpers/initializeApp'
import { ScrapedData } from '../scrape/scrapeData'
import { dumpToFood } from './dumpToFood'
import { getFoodFromFDC } from './getFoodFromFDC'

interface CallAddFood {
  fdcId: string
}

export const addFoodHandler = async (
  data: CallAddFood,
  context: functions.https.CallableContext
) => {
  // ensureLoggedIn(context);

  const { fdcId } = data

  const dump = await getFoodFromFDC(fdcId)
  await firestore.collection('fdc-dump').add(dump)

  const scraped = await scrapeFoodData(dump)
  const food = dumpToFood(dump, scraped)
  await firestore.collection('foods').add(food)

  const algolia = await addFoodToAlgolia({ food })

  return { dump, food, algolia }
}

const scrapeFoodData = async (food: FdcDump): Promise<ScrapedData> => {
  // kick them off in parrallel
  const namePromise = scrapeName(food)
  const imagePromise = scrapeDescription(food)
  const descriptionPromise = scrapeImage(food)

  // awiat them all together
  return {
    name: await namePromise,
    description: await imagePromise,
    image: await descriptionPromise
  }
}

const scrapeName = async (food: FdcDump): Promise<string> => {
  const prom = Promise.resolve('')
  return await prom
}

const scrapeDescription = async (food: FdcDump): Promise<string> => {
  const prom = Promise.resolve('')
  return await prom
}

const scrapeImage = async (food: FdcDump): Promise<string> => {
  const prom = Promise.resolve('')
  return await prom
}
