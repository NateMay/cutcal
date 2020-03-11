import { FdcUnit } from '@cutcal/fdc'
import { Nutrition } from '../nutrition'

/**
 * @description Metadata for Nutrtion<NutritionRange>
 */
export interface DailyValue {
  id: number
  name: string
  description: string
  // nutrition: Nutrition<NutritionRange>;
  nutrition: Nutrition<NutritionRange>
}

/**
 * @description Information about intake ranges for any nutrient
 * @see {@link https://www.nap.edu/read/10925/chapter/3#23 National Academies Press}
 */

export interface NutritionRange {
  EAR?: number // EAR - Estimated Average Requirement
  RDA?: number // RDA - Recomended Daily Allowance
  UL?: number // UL - Upper Limit recommended for preventing disease
  AI?: number // AI - Adequate Intake (when EAR isn't available)
  // EER? - Estimated Energy Requirement
  unit?: FdcUnit
}

export function createNutritionRange(
  EAR: number,
  AI: number,
  unit?: FdcUnit,
  RDA?: number,
  high?: number
): NutritionRange {
  const range = AI - EAR
  return {
    unit,
    EAR,
    RDA: RDA || EAR + 0.2 * range,
    AI,
    UL: high ? high : EAR + 0.8 * range,
  }
}
