import { KVP } from '@cutcal/core';

export interface HighChartsDataPoint {
  name: string
  y: number
  date?: Date
  clickable?: boolean
  events?: KVP<any>

  readonly series?: {
    name?: string // Nutrient name returned from the click event
    userOptions?: {
      nutrient?: string
      unit?: string
    }
  }
}
