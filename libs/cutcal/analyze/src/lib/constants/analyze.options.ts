import {
  ChartOptions,
  LegendOptions,
  PlotAreaOptions,
  PlotBarOptions,
  PlotColumnOptions,
  PlotLineOptions,
  PlotOptions,
  ResponsiveOptions,
  ResponsiveRulesOptions,
  SeriesOptionsType,
  SeriesPointClickCallbackFunction,
  TitleOptions,
  TooltipOptions,
} from 'highcharts'
import * as _ from 'lodash'
import { KVP } from '../../shared/models/key-value-pair'

/**
 * @reference [Highcharts-Docs] {@link https://api.highcharts.com/highcharts/}
 */

export function BASE_ANALYZE_CHART_OPTIONS() {
  return _.cloneDeep(BASE_OPTIONS)
}

export const BASE_OPTIONS: Highcharts.Options = {
  legend: <LegendOptions>{
    align: 'left',
  },

  chart: <ChartOptions>{
    type: 'column',
  },

  title: <TitleOptions>{
    text: 'Daily Intake',
    style: { fontSize: '24px' },
  },

  tooltip: <TooltipOptions>{
    pointFormat: '{series.name}: <b>{point.y:.1f}</b>',
  },

  plotOptions: <PlotOptions>{
    line: <PlotLineOptions>{
      enableMouseTracking: true,
      findNearestPointBy: 'x',
      tooltip: {},
    },
    column: <PlotColumnOptions>{},
    bar: <PlotBarOptions>{},
    area: <PlotAreaOptions>{},
    pie: <PlotAreaOptions>{},
  },

  responsive: <ResponsiveOptions>{
    rules: [
      <ResponsiveRulesOptions>{
        condition: { maxWidth: 500 },
        chartOptions: {
          legend: {
            align: 'center',
            verticalAlign: 'bottom',
          },
        },
      },
    ],
  },
  series: <SeriesOptionsType[]>[],
}

/**
 * Each chart type has a distinct series data. This interface can accomodate them all
 */
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
