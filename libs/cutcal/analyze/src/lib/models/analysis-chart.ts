import { NutrientUnit, NUTRIENT_UNIT_LOOKUP } from '@cutcal/nutrition'
import { Options } from 'highcharts'
import { BASE_ANALYZE_CHART_OPTIONS } from '../constants/analyze.options'
import { ChartControls } from './chart-controls'

/**
 * Object to store information per unit chart on the analysis page
 */
// new Highcharts.Chart(chart.options)
export class AnalysisChartVM {
  unit: string
  options: Options = BASE_ANALYZE_CHART_OPTIONS()
  controls: ChartControls
  update: boolean
  // chart: Highcharts.Chart;

  constructor(
    unit: NutrientUnit,
    options: Options,
    controls: ChartControls
    // chart: Highcharts.Chart
  ) {
    if (!this.options.title) this.options.title = { text: '' }
    this.options.title.text = `Daily Intake - ${NUTRIENT_UNIT_LOOKUP[unit]} (${unit})`
    this.unit = unit
    this.options = options
    this.controls = controls
    this.update = false
    // this.chart = chart;
  }
}
