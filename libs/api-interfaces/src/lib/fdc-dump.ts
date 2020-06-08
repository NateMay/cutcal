import {
  FdcFoodMeasure,
  FdcFoodNutrient,
  FinalFoodInputFoods
} from './fdc-response'

export interface FdcDump {
  fdcId: number
  foodClass?: string
  description?: string
  categories?: string[]
  foodNutrients: FdcFoodNutrient[]
  foodMeasures?: FdcFoodMeasure[]
  foodComponents?: any[] // ??
  finalFoodInputFoods?: FinalFoodInputFoods[]
  foodType?: 'Survey (FNDDS)' | 'Branded' | 'Foundation' | 'SR Legacy'
  foodCode?: string // FNDDS id
  totalRefuse?: number
  ingredients?: string
  scientificName?: string
  gtinUpc?: string // GTIN or UPC code identifying the food. Only applies to Branded Foods.
  updatedAt?: firebase.firestore.Timestamp
}
