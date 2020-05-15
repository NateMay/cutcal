/**
 * Search parameters object
 */
// TODO (search) convert to interface
export class SearchParams {
  term: string
  maxResults: number
  foodGroup?: string
  userID1?: string // logged in user
  userID2?: string // user who data is benig viewed

  pantry?: boolean
  recipe?: string // accept only, reject, undefined
  meal?: string
  popular?: string
  trending?: string
  custom?: string

  constructor(
    term: string,
    maxResults: number,
    foodGroup?: string,
    userID1?: string,
    userID2?: string,
    pantry?: boolean,
    recipe?: string,
    meal?: string,
    popular?: string,
    trending?: string,
    custom?: string
  ) {
    this.term = term
    this.maxResults = maxResults
    if (foodGroup) this.foodGroup = foodGroup
    if (userID1) this.userID1 = userID1
    if (userID2) this.userID2 = userID2
    if (pantry) this.pantry = pantry
    if (recipe) this.recipe = recipe
    if (meal) this.meal = meal
    if (popular) this.popular = popular
    if (trending) this.trending = trending
    if (custom) this.custom = custom
  }
}
