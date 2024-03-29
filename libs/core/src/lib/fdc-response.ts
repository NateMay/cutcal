export type FdcUnit = 'kcal' | 'kj' | 'g' | 'mg' | 'iu' | 'µg' | 'sp_gr'

/**
 * @description FoodData Central API
 * @see {@link https://api.nal.usda.gov/fdc/v1/336711?api_key=#### Response}
 * @see {@link https://fdc.nal.usda.gov/api-spec/fdc_api.html#/ API Ref}
 * @note FNDDS = Food and Nutrient Database for Dietary Studies
 */
export interface FdcFoodDetailResponse {
  foodClass: string
  id: number
  description: string
  lastUpdated: string
  foodNutrients: FdcFoodNutrient[]
  foodMeasures?: FdcFoodMeasure[]
  foodComponents: any[] // ??
  foodAttributes: FdcFoodAttribute[]
  finalFoodInputFoods: FinalFoodInputFoods[]
  foodType: 'Survey (FNDDS)' | 'Branded' | 'Foundation' | 'SR Legacy'
  foodCode: string // FNDDS id
  fnddsFoodCategory: FnddsFoodCategory
  startDate?: string
  endDate?: string
  foodAttributeTypes: any
  totalRefuse: number
  scientificName?: string
  foodGroup?: FdcFoodGroup
  gtinUpc?: string // GTIN or UPC code identifying the food. Only applies to Branded Foods.
  ingredients?: string
  allHighlightFields?: string // ??
  score?: number // search match score
}

export interface FdcFoodGroup {
  code: string
  description: string
  id: number
}

export interface FnddsFoodCategory {
  id: number
  description: string
}
export interface FdcFoodNutrientDerivation {
  id: number
  code: string
  description: string
  foodNutrientSource: {
    id: number
    code: string
    description: string
  }
}

export interface FdcCategory {
  wweiaFoodCategoryCode: number
  wweiaFoodCategoryDescription: string
}

export interface FdcFoodNutrient {
  type: string
  id: number
  nutrient: FdcNutrient
  value?: number
  lastUpdated: string
}

export interface FdcNutrientAnalysisDetail {
  subSampleId: number
  amount: number
  nutrientId: number
  nutrientAcquisitionDetails: any[]
  labMethodDescription: string
  labMethodTechnique: string
  labMethodOriginalDescription: string
  labMethodLink: string
}
export interface FdcNutrientUnit {
  name: string
  conversionToMicroGram?: number
  aliases: string[]
}
export interface FdcNutrient {
  id: number
  number: string
  name: string
  rank: number
  isNutrientLabel: boolean
  indentLevel: number
  shortestName: string
  nutrientUnit: FdcNutrientUnit
}

// TODO (FDC) use as tags
export interface FdcFoodAttribute {
  id: number
  value: string
  foodAttributeType: FdcFoodAttributeType
  sequenceNumber: number
}

export interface FdcFoodAttributeType {
  id: number
  name: string
  description: string
}

export interface FdcFoodMeasure {
  id: number
  measureUnit: FdcMeasureUnit
  modifier: string
  gramWeight: number
  disseminationText: string
  rank?: number
}

export interface FdcMeasureUnit {
  id: number
  name: string
  abbreviation: string
}

export interface FinalFoodInputFoods {
  id: number
  value: number
  unit: string
  portionDescription: string
  portionCode: string
  srCode: number
  srDescription: string
  foodDescription: string
  gramWeight: number
  rank: number
  surveyFlag: number
}
