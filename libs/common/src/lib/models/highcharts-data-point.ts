import { SeriesPointClickCallbackFunction } from 'highcharts'
import { KVP } from './key-value-pair'
export interface HighChartsDataPoint {
  name: string
  y: number
  date?: Date
  clickable?: boolean
  events?: KVP<SeriesPointClickCallbackFunction>

  readonly series?: {
    name?: string // Nutrient name returned from the click event
    userOptions?: {
      nutrient?: string
      unit?: string
    }
  }
}
