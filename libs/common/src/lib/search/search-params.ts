
/**
 * Search parameters object
 */
// TODO (search) convert to interface
export class SearchParams {
  term: string;
  maxResults: number;
  foodGroup?: string;
  user_id1?: string; // logged in user
  user_id2?: string; // user who data is benig viewed

  pantry?: boolean;
  recipe?: string; // accept only, reject, undefined
  meal?: string;
  popular?: string;
  trending?: string;
  custom?: string;

  constructor(
    term: string, maxResults: number, foodGroup?: string, user_id1?: string, user_id2?: string,
    pantry?: boolean, recipe?: string, meal?: string, popular?: string, trending?: string, custom?: string) {
    this.term = term;
    this.maxResults = maxResults;
    if (foodGroup) this.foodGroup = foodGroup;
    if (user_id1) this.user_id1 = user_id1;
    if (user_id2) this.user_id2 = user_id2;
    if (pantry) this.pantry = pantry;
    if (recipe) this.recipe = recipe;
    if (meal) this.meal = meal;
    if (popular) this.popular = popular;
    if (trending) this.trending = trending;
    if (custom) this.custom = custom;
  }
}
