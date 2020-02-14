import { Options } from 'highcharts'
import { BASE_ANALYZE_CHART_OPTIONS } from '../constants/analyze.options'
import { ChartControls } from './chart-controls'

// TODO (move) into a unitsMetadata class like the nutrientsMetaData
export interface NutrientUnitLookup {
  g: string
  kcal: string
  mg: string
  µg: string
  iu: string
  kj: string
}

export const NUTRIENT_UNIT_LOOKUP: NutrientUnitLookup = {
  g: 'Grams',
  kcal: 'Calories',
  mg: 'Milligrams',
  µg: 'Micrograms',
  iu: 'International Units',
  kj: 'Kilojoules',
}

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
    unit: string,
    options: Options,
    controls: ChartControls
    // chart: Highcharts.Chart
  ) {
    if (!this.options.title) this.options.title = { text: '' }
    // tslint:disable-next-line:no-non-null-assertion
    this.options!.title!.text = `Daily Intake - ${NUTRIENT_UNIT_LOOKUP[unit]} (${unit})`
    this.unit = unit
    this.options = options
    this.controls = controls
    this.update = false
    // this.chart = chart;
  }
}
