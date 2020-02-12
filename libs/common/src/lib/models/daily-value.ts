// nx

import { Nutrition } from './nutrition'

/**
 * Metadata for Nutrtion<NutritionRange>
 */
export interface DailyValue {
  id: number
  name: string
  description: string
  // nutrition: Nutrition<NutritionRange>;
  nutrition: Nutrition<NutritionRange>
}

/**
 * Information about intake ranges for any nutrient
 * @refernce [National-Academies-Press] {@link https://www.nap.edu/read/10925/chapter/3#23}
 */

export class NutritionRange {
  EAR?: number // EAR - Estimated Average Requirement
  RDA?: number // RDA - Recomended Daily Allowance
  UL?: number // UL - Upper Limit recommended for preventing disease
  AI?: number // AI - Adequate Intake (when EAR isn't available)
  // EER? - Estimated Energy Requirement
  unit?: string
  constructor(
    min: number,
    max: number,
    unit?: string,
    low?: number,
    high?: number
  ) {
    if (unit) this.unit = unit
    this.EAR = min
    this.AI = max
    const range = max - min
    this.RDA = low ? low : min + 0.2 * range
    this.UL = high ? high : min + 0.8 * range
  }
}
