import { KVP } from '@cutcal/core'
import { AnalysisChartVM } from './analysis-chart'

export interface ViewMap {
  name: string
  selections: string[]
  charts: KVP<AnalysisChartVM>
}
