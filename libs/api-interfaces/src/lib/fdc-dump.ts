import {
  FdcFoodMeasure,
  FdcFoodNutrient,
  FinalFoodInputFoods
} from './fdc-response'

export interface FdcDump {
  id: number
  foodClass?: string
  description?: string
  lastUpdated?: string
  categories?: string[]
  foodNutrients: FdcFoodNutrient[]
  foodMeasures?: FdcFoodMeasure[]
  foodComponents?: any[] // ??
  finalFoodInputFoods?: FinalFoodInputFoods[]
  foodType?: 'Survey (FNDDS)' | 'Branded' | 'Foundation' | 'SR Legacy'
  foodCode?: string // FNDDS id
  startDate?: string
  endDate?: string
  totalRefuse?: number
  ingredients?: string
  scientificName?: string
  gtinUpc?: string // GTIN or UPC code identifying the food. Only applies to Branded Foods.
}
