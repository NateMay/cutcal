import {
  BaseRouterStoreState,
  routerReducer,
  RouterReducerState,
} from '@ngrx/router-store'
import { ActionReducerMap, MetaReducer } from '@ngrx/store'
import { environment } from '../environments/environment'

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

export const metaReducers: Array<
  MetaReducer<AppState>
> = !environment.production ? [] : []
