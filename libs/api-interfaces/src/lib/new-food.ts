import { KVP } from '@cutcal/core'
import { Image, Portion } from '@cutcal/diet'
import { Nutrition } from '@cutcal/nutrition'
import { firestore } from 'firebase/app'
import { maxBy } from 'lodash'

export interface FoodBase {
  name: string
  description: string
  fdcId: number
  fdcName: string
}

export interface AlgoliaFood extends FoodBase {
  objectID: string
  highIn: string[] // list of nutrients that this food can act as a suppliment for
  ingredients: string[]
  isRecipe: boolean // whether it has instructions
  usageTier: number // for example: 0 - 99, 100 - 999, 1000 - 9999, etc
  likesTier: number // for example: 0 - 99, 100 - 999, 1000 - 9999, etc
  creatorName: string
  categories: string[]
  image: string
}

export interface NewFood extends FoodBase {
  _id?: string
  nutrition: Nutrition<number>
  creator: NewFoodCreator
  defaultPortion: Portion
  portions: KVP<Portion>
  ingredients: NewFoodIngredient[]
  uses: number
  likes: number
  images: Image[]
  instructions: NewFoodInstruction[]
  reviews: NewFoodReview[]
  categories?: string[]
  reviewState?: NewFoodReviewState
  dataQualityScore: number
}

interface NewFoodReviewState {
  image: boolean
  description: boolean
  name: boolean
  ingredients: boolean
  instructions: boolean
  categories: boolean
}

export const newFoodReviewState = () => ({
  image: false,
  description: false,
  name: false,
  ingredients: false,
  instructions: false,
  categories: false
})

interface NewFoodIngredient extends Portion {
  name: string
  fdcId: number
  image: string
  parentId: string
  rootId: string
  userId?: string
}

interface NewFoodReview {
  stars: 1 | 2 | 3 | 4 | 5
  date: firebase.firestore.Timestamp
  username: string
  text: string
}

interface NewFoodInstruction {
  steps?: string[]
  prep?: Duration
  cook?: Duration
  duration?: Duration
  additional?: Duration
  servings?: number
  yield?: Portion
}

interface Duration {
  quantity: number
  unit: string
}

interface NewFoodCreator {
  name: string
  timestamp: firestore.Timestamp
}

export const primaryImage = (images: Image[]) =>
  maxBy(images, (image: Image) => image.votes)
