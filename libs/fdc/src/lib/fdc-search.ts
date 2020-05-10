/**
 * @description FoodData Central API
 * @see {@link https://api.nal.usda.gov/fdc/v1/336711?api_key=#### Response}
 * @see {@link https://fdc.nal.usda.gov/api-spec/fdc_api.html#/ API Ref}
 * @note FNDDS = Food and Nutrient Database for Dietary Studies
 */

export type FdcDataType =
  | 'Branded'
  | 'Survey (FNDDS)'
  | 'SR Legacy'
  | 'Foundation'

export interface FDCFoodSearchResponse {
  foodSearchCriteria: FdcFoodSearchCriteria
  totalHits: number
  currentPage: number
  totalPages: number
  pageList: number[]
  foods: FdcFoodSearchFood[]
  aggregations: {
    dataType: { [key in FdcDataType]: number }
  }
}
export interface FdcFoodSearchCriteria {
  includeDataTypes: { [key: string]: boolean }
  generalSearchInput: string
  pageNumber: number
  requireAllWords: boolean
  foodTypes: string[]
}

export interface FdcFoodSearchFood {
  fdcId: number
  description: string
  lowercaseDescription: string
  additionalDescriptions?: string
  ndbNumber?: string
  dataType: string
  foodCode?: string
  publishedDate: string
  allHighlightFields: string
  score: number
}
