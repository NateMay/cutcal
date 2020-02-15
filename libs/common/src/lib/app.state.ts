import { BaseRouterStoreState, routerReducer, RouterReducerState } from '@ngrx/router-store'
import { ActionReducerMap } from '@ngrx/store'


export interface AppState {
  // search: Search.SearchState;
  router: RouterReducerState<BaseRouterStoreState>
  // recipes: Recipe.RecipeState
}

export const reducers: ActionReducerMap<AppState> = {
  // search: Search.searchReducer,
  router: routerReducer,
  // recipes: Recipe.recipeReducer
}

