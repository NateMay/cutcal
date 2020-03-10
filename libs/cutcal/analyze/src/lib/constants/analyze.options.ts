import { ChartOptions, LegendOptions, PlotAreaOptions, PlotBarOptions, PlotColumnOptions, PlotLineOptions, PlotOptions, ResponsiveOptions, ResponsiveRulesOptions, SeriesOptionsType, TitleOptions, TooltipOptions } from 'highcharts'
import { cloneDeep } from 'lodash'

/**
 * @reference {@link https://api.highcharts.com/highcharts/ Highcharts Docs}
 */

export function BASE_ANALYZE_CHART_OPTIONS() {
  return cloneDeep(BASE_OPTIONS)
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
