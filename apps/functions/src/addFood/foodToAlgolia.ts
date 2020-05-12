import { AlgoliaFood, NewFood } from '@cutcal/api-interfaces'

export const foodToAlgolia = (food: NewFood): AlgoliaFood => ({
  objectID: `${food.fdcId}`,
  name: food.name,
  description: food.description,
  fdcId: food.fdcId,
  highIn: [], // list of nutrients that this food can act as a suppliment for
  ingredients: [],
  isRecipe: false, // whether it has instructions
  usageTier: 0, // for example: 0 - 99, 100 - 999, 1000 - 9999, etc
  creatorName: food.creator.name,
  categories: [],
  imageUrl: 'https://'
})
