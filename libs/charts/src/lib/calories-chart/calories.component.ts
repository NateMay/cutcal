import { Component, Input } from '@angular/core'
import {
  CaloriesFrom,
  caloriesFromAll,
  NUTRIENTS,
  Nutrition,
} from '@cutcal/nutrition'
import * as Highcharts from 'highcharts'
import {
  ChartOptions,
  Options,
  PlotOptions,
  TitleOptions,
  TooltipOptions,
} from 'highcharts'
import { reduce } from 'lodash'
import { CaloriesSource } from '../../../../nutrition/src/lib/calories-from'

@Component({
  selector: 'cc-calories-chart',
  styleUrls: ['./calories.component.scss'],
  template: `
    <highcharts-chart
      [Highcharts]="Highcharts"
      [options]="chartOptions"
      [(update)]="updateChart"
      style="height: 300px; display: block;"
    ></highcharts-chart>
  `,
  host: { class: 'calories-chart' },
})
export class CaloriesChartComponent {
  chartOptions: Options

  Highcharts: typeof Highcharts = Highcharts

  updateChart: boolean = true

  @Input() set nutrition(nutrition: Nutrition<number>) {
    this.chartOptions = this.baseOptions

    const caloriesFrom = caloriesFromAll(nutrition)

    if (!this.chartOptions.series)
      throw Error('[CutCal] calories component requires valid chart series')

    // URGENT FIXME - new highcharts api
    this.chartOptions.series = [
      {
        data: this.buildChartData(caloriesFrom),
        type: 'pie',
      },
    ]

    this.updateChart = true
  }

  get baseOptions(): Options {
    return {
      chart: <ChartOptions>{
        backgroundColor: 'transparent',
        type: 'pie',
      },
      title: <TitleOptions>{ text: '' },
      tooltip: <TooltipOptions>{
        pointFormat: `
        <span style="color:{point.color}">{point.name}</span>: {point.y:.0f} {point.unit}<br>
        <b>{point.percent:.1f}%</b> of total<br/>`,
      },
      plotOptions: <PlotOptions>{
        pie: {
          cursor: 'pointer',
          dataLabels: { enabled: false },
          showInLegend: true,
        },
      },
      series: [
        {
          name: 'Calories From',
          data: [],
          type: 'pie',
        },
      ],
    }
  }

  buildChartData(caloriesFrom: CaloriesFrom) {
    const totalCalories = reduce(caloriesFrom, (sum, curr) => sum + curr) || 0

    const result = []
    for (const source of Object.keys(caloriesFrom) as CaloriesSource[]) {
      const calories = caloriesFrom[source]
      if (calories > 0) {
        result.push({
          name: NUTRIENTS.shortNames[source],
          y: calories,
          percent: (calories * 100) / totalCalories,
          unit: NUTRIENTS.units[source],
        })
      }
    }
    return result
  }
}
