import { NutrCheckable, Nutrition, nutrtionSelections } from '@cutcal/nutrition'
import { Action, createAction, createReducer, on } from '@ngrx/store'

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

export const analyzeReducer = (
  state: AnalyzeState | undefined,
  action: Action
): AnalyzeState => reducer(state, action)
