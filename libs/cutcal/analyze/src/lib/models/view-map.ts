import { KVP } from '../../shared/models/key-value-pair'
import { AnalysisChartVM } from './analysis-chart'

export interface ViewMap {
  name: string
  selections: string[]
  charts: KVP<AnalysisChartVM>
}
