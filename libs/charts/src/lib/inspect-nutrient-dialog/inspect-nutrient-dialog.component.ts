import { Component, Inject, OnInit } from '@angular/core'
import { MealService, MealsTripple } from '@cutcal/common-ui'
import { KVP } from '@cutcal/core'
import { Food, Meal, scaleNutrient, Usage } from '@cutcal/diet'
import { Nutrient } from '@cutcal/nutrition'
import * as Highcharts from 'highcharts'
import { Options, PointOptionsObject, SeriesOptionsType } from 'highcharts'
import Drilldown from 'highcharts/modules/drilldown'
import { filter, forEach, map as _map, sum, values } from 'lodash'
import { first, tap } from 'rxjs/operators'
import { InspectionData, INSPECTION_DATA } from './inspection-data'

interface SeriesPieDataOptions extends PointOptionsObject {
  type?: string
  unit: string
}

Drilldown(Highcharts)

@Component({
  selector: 'cc-inspect-nutrient-dialog',
  styleUrls: ['./inspect-nutrient-dialog.component.scss'],
  template: `
    <mat-card style="width: 400px;">
      <mat-card-content>
        <highcharts-chart
          *ngIf="options"
          [(update)]="update"
          [Highcharts]="Highcharts"
          [options]="options"
          style="width: 100%; height: 400px; display: block;"
        ></highcharts-chart>
      </mat-card-content>

      <mat-card-actions>
        <button mat-button>LIKE</button>
        <button mat-button>SHARE</button>
      </mat-card-actions>
    </mat-card>
  `
})
export class InspectNutrientDialogComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts

  foods: KVP<Food>

  usages: KVP<Usage>

  drilldownSeries: KVP<SeriesOptionsType> = {}

  nutrientTotal: number

  update: boolean = false

  options: Options

  get baseOptions(): Options {
    return {
      chart: {
        type: 'pie',
        options3d: {
          enabled: true,
          alpha: 45
        }
      },
      title: { text: this.title },
      subtitle: { text: this.dateString },
      tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: `
        <span style="color:{point.color}">{point.name}</span>: <span>{point.value} {point.unit}</span><br>
        <b>{point.y:.2f}%</b> of total<br/>`
      },
      plotOptions: {
        pie: {
          cursor: 'pointer',
          // dataLabels: { enabled: false },
          showInLegend: true
        }
      }
    }
  }

  get series(): SeriesOptionsType {
    return this.data.event.point.series as SeriesOptionsType
  }
  get date(): Date {
    return new Date(this.dateString)
  }
  get dateString(): string {
    return this.data.event.point.name
  }
  get title(): string {
    return this.series.name || ''
  }
  get nutrient(): Nutrient {
    // URGENT FIXME - new highcharts api
    return 'calories'
    // return this.series.userOptions.nutrient
  }
  get unit(): string {
    // URGENT FIXME - new highcharts api
    return 'unit'
    // return this.series.userOptions.unit
  }

  constructor(
    @Inject(INSPECTION_DATA) public data: InspectionData,
    private mealSvc: MealService
  ) {}

  ngOnInit(): void {
    this.mealSvc
      .getMealRangeUsagesFoods(this.date.stripTime(), this.date.endOfDay())
      .pipe(
        first(),
        tap((response: MealsTripple) => this.getNutrientTotal(response)),
        tap((response: MealsTripple) => this.createChart(response))
      )
      .subscribe()
  }

  getNutrientTotal([meals, usages, foods]: MealsTripple): void {
    this.nutrientTotal = sum(
      _map(meals, meal => meal.nutrition[this.nutrient] || 0)
    )
  }

  createChart([meals, usages, foods]: MealsTripple): void {
    this.foods = foods
    this.usages = usages

    this.options = {
      ...this.baseOptions,
      series: [
        {
          name: this.date.toDateString(),
          data: this.getSeriesData(meals),
          type: 'pie'
        }
      ],
      drilldown: {
        series: values<KVP<SeriesOptionsType>>(this.drilldownSeries)
      }
    }
  }

  /**
   * @description Creates the series data AND the drildown data recursively
   * @param {KVP<Meal>} meals all the meals from the day
   * @see {@link https://www.highcharts.com/demo/pie-drilldown Highcharts}
   * @see {@link https://stackblitz.com/edit/highcharts-angular-drilldown Stackblitz}
   * @see {@link https://stackoverflow.com/questions/23153403/drilldown-multiple-levels-highchart StackOverflow}
   */
  getSeriesData(meals: KVP<Meal>): any[] {
    return _map(meals, meal => {
      this.drilldownSeries[
        meal._id
      ] = this.createFirstLevelDrilldownSeriesOptions(meal)

      this.addChildrenToDrilldown(meal._id)

      return this.createMealPoint(meal)
    })
  }

  createFirstLevelDrilldownSeriesOptions(meal: Meal): SeriesOptionsType {
    return { id: meal._id, name: meal.name, data: [], type: 'pie' }
  }

  handleIngredient(parentUsage: Usage, parentID: string): void | never {
    // URGENT FIXME - new highcharts api
    // this.drilldownSeries[parentID].data.push(
    //   this.createIngredientPoint(parentUsage)
    // )
    this.addChildrenToDrilldown(parentUsage._id)
    throw Error('need to fix this comment block (new highcharts api)')
  }

  addChildrenToDrilldown(parentId: string): void {
    const children = filter(this.usages, usage => usage.parentId == parentId)

    if (children.length)
      forEach(children, childUsage =>
        this.handleIngredient(childUsage, parentId)
      )
  }

  createMealPoint(meal: Meal): SeriesPieDataOptions {
    const value: number = meal.nutrition[this.nutrient] || 0
    return {
      name: meal.name,
      y: (value * 100) / this.nutrientTotal,
      drilldown: meal._id,
      value,
      unit: this.unit
    }
  }

  createIngredientPoint(usage: Usage): SeriesPieDataOptions {
    const food: Food = this.foods[usage.foodId]

    const value = scaleNutrient(usage, food, this.nutrient)

    return {
      name: food.name,
      y: (value * 100) / this.nutrientTotal,
      drilldown: usage._id,
      type: 'pie',
      value,
      unit: this.unit
    }
  }
}
