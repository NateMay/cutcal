import { Action, createAction, createReducer, on } from '@ngrx/store'
import { Nutrition } from '../shared/models/nutrition'
import { NutrCheckable, nutrtionSelections } from './models/checkable-nutrient'

// ****** ACTIONS ******* //

export const resetToDefualt = createAction('[Analyze] reset to default')

// ****** STATE ******* //

export interface AnalyzeState {
  selectedNutrients: Nutrition<NutrCheckable>
}

export const ANALYZE_INITIAL: AnalyzeState = {
  selectedNutrients: nutrtionSelections(),
}

// ****** SELECTORS ******* //

// ****** REDUCER ******* //

const reducer = createReducer<AnalyzeState>(
  ANALYZE_INITIAL,

  on(resetToDefualt, state => ({
    ...state,
    selectedNutrients: nutrtionSelections(),
  }))
)

export function analyzeReducer(
  state: AnalyzeState | undefined,
  action: Action
) {
  return reducer(state, action)
}
