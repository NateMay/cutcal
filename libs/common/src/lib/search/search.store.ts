import { Action, createAction, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { headerCloseSearch } from '../../header/header.actions';





// ****** ACTIONS ******* //

export const closeSearch = createAction('[Search] Close Search');

export const openSearch = createAction('[Search] Open Search');





// ****** STATE ******* //

export interface SearchState {
  isOpen: boolean;
};

export const SEARCH_INITIAL: SearchState = {
  isOpen: false
};





// ****** SELECTORS ******* //

export const searchState = createFeatureSelector<SearchState>('search');

export const searchOpen = createSelector(
  searchState,
  (search: SearchState) => search.isOpen
);




// ****** REDUCER ******* //

const reducer = createReducer<SearchState>(

  SEARCH_INITIAL,

  on(openSearch, state => ({
    ...state,
    isOpen: true
  })),

  on(closeSearch, headerCloseSearch, state => ({
    ...state,
    isOpen: false
  }))
);


export function searchReducer(state: SearchState | undefined, action: Action) {
  return reducer(state, action);
}
