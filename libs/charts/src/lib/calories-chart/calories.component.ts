import { Component, Input } from '@angular/core'
import { caloriesFromAll, NUTRIENTS, Nutrition } from '@cutcal/nutrition'
import * as Highcharts from 'highcharts'
import {
  ChartOptions,
  Options,
  PlotOptions,
  TitleOptions,
  TooltipOptions,
} from 'highcharts'
import * as _ from 'lodash'

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

    const total = _.reduce(caloriesFrom, (sum, curr) => sum + curr) || 0

    if (!this.chartOptions.series) throw new Error('')

    // URGENT FIXME - new highcharts api
    this.chartOptions.series[0]['data'] = _.map(
      caloriesFrom,
      (value: number, key: string) => ({
        name: NUTRIENTS.shortNames[key],
        y: value,
        percent: (value * 100) / total,
        unit: NUTRIENTS.units[key],
      })
    ).filter(point => point.y > 0)

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
}
