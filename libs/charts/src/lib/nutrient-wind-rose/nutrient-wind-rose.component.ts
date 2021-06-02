import { Component, Input, OnInit } from '@angular/core'
import { ZERO_NUTRITION } from '@cutcal/nutrition'
import { Nutrition } from '@cutcal/core'
import * as Highcharts from 'highcharts'
import More from 'highcharts/highcharts-more'
import Data from 'highcharts/modules/data'
import Windbarb from 'highcharts/modules/windbarb'

// FEATURE (balance) wire up to data

Data(Highcharts)
Windbarb(Highcharts)
More(Highcharts)

@Component({
  selector: 'ds-nutrient-wind-rose',
  template: `
    <highcharts-chart
      *ngIf="renderChart"
      [Highcharts]="Highcharts"
      [options]="chartOptions"
      [(update)]="updateChart"
      style="height: 300px; display: block;"
    ></highcharts-chart>

    <table id="freq" border="0" cellspacing="0" cellpadding="0" hidden="true">
      <tr nowrap>
        <th colspan="9" class="hdr">Table of Frequencies (percent)</th>
      </tr>
      <tr nowrap>
        <th class="freq">Nutrient</th>
        <th class="freq">Breakfast</th>
        <th class="freq">Lunch</th>
        <th class="freq">Dinner</th>
      </tr>
      <tr nowrap *ngFor="let nutrient of nutrients | keyvalue">
        <td class="dir">{{ nutrient.label }}</td>
        <td class="data" *ngFor="let value of nutrient.data">{{ value }}</td>
      </tr>
    </table>
  `,
  styleUrls: ['./nutrient-wind-rose.component.scss']
})
export class NutrientWindRoseComponent implements OnInit {
  renderChart = false

  nutrients = {
    DF: { label: 'DF', data: [1.81, 1.78, 0.16] },
    PR: { label: 'PR', data: [0.62, 1.09, 0.0] },
    A: { label: 'A', data: [0.82, 0.82, 0.07] },
    C: { label: 'C', data: [0.59, 1.22, 0.07] },
    D: { label: 'D', data: [0.62, 2.2, 0.49] },
    E: { label: 'E', data: [1.22, 2.01, 1.55] },
    Kv: { label: 'K', data: [1.61, 3.06, 2.37] },
    Th: { label: 'Th', data: [2.04, 3.42, 1.97] },
    Ri: { label: 'Ri', data: [2.66, 4.74, 0.43] },
    Ni: { label: 'Ni', data: [2.96, 4.14, 0.26] },
    B6: { label: 'B6', data: [2.53, 4.01, 1.22] },
    Fo: { label: 'Fo', data: [1.97, 2.66, 1.97] },
    B12: { label: 'B12', data: [1.64, 1.71, 0.92] },
    Se: { label: 'Se', data: [1.32, 2.4, 0.99] },
    Mn: { label: 'Mn', data: [1.58, 4.28, 1.28] },
    Cu: { label: 'Cu', data: [1.51, 5.0, 1.32] },
    Zn: { label: 'Zn', data: [2.04, 3.42, 1.97] },
    Km: { label: 'K', data: [0.71, 1.12, 1.12] },
    P: { label: 'P', data: [1.51, 5.0, 1.32] },
    Mg: { label: 'Mg', data: [2.4, 1.2, 0.72] },
    Fe: { label: 'Fe', data: [0.21, 4.01, 0.12] },
    Ca: { label: 'Ca', data: [1.01, 1.56, 2.12] },
    Na: { label: 'Na', data: [2.04, 3.42, 1.97] },
    Ch: { label: 'Ch', data: [1.86, 2.45, 1.62] },
    SF: { label: 'SF', data: [0.81, 1.03, 2.12] }
  }

  chartOptions: Highcharts.Options

  Highcharts: typeof Highcharts = Highcharts

  updateChart: boolean = true

  @Input() title: string = 'Chart Title'

  @Input() set nutrition(nutrition: Nutrition<number>) {
    this.chartOptions = this.baseOptions

    // const caloriesFrom = caloriesFromAll(nutrition);

    // const total = _.reduce(caloriesFrom, (sum, curr) => sum + curr);

    // this.chartOptions.series[0].data = _.map(caloriesFrom,
    //   (value: number, key: string) => ({
    //     name: NUTRIENTS.shortNames[key],
    //     y: value,
    //     percent: value * 100 / total,
    //     unit: NUTRIENTS.units[key]
    //   })
    // ).filter(point => point.y > 0)

    this.updateChart = true
  }

  get baseOptions(): Highcharts.Options {
    return {
      data: <Highcharts.DataOptions>{
        table: 'freq',
        startRow: 1,
        endRow: 26,
        endColumn: 4
      },

      chart: <Highcharts.ChartOptions>{
        polar: true,
        type: 'column'
      },

      pane: <Highcharts.PaneOptions>{
        size: '85%'
      },

      title: <Highcharts.TitleOptions>{ text: '' },

      xAxis: <Highcharts.XAxisOptions>{
        tickmarkPlacement: 'on'
      },

      yAxis: <Highcharts.YAxisOptions>{
        min: 0,
        endOnTick: false,
        showLastLabel: true,
        labels: {
          formatter(): string {
            return (this.value as string) + '%'
          }
        }
        // reversedStacks: false
      },

      tooltip: <Highcharts.TooltipOptions>{
        valueSuffix: '%'
      },

      plotOptions: <Highcharts.PlotOptions>{
        series: {
          stacking: 'normal'
          // shadow: true,
          // groupPadding: 0,
          // pointPlacement: 'on'
        }
      }
    }
  }

  ngOnInit(): void {
    this.nutrition = ZERO_NUTRITION
    setTimeout(() => (this.renderChart = true), 0)
  }
}
