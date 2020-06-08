import { SaveObjectResponse } from '@algolia/client-search'
import { FdcDump } from './fdc-dump'
import { NewFood } from './new-food'

export interface AddFoodRequest {
  fdcId: string
}

export interface AddFoodReponse {
  dump: FdcDump
  food: NewFood
  algolia: SaveObjectResponse
}
