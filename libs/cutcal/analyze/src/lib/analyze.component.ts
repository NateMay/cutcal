import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay'
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal'
import {
  Component,
  Injector,
  OnDestroy,
  OnInit,
  ViewContainerRef
} from '@angular/core'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { AuthService } from '@cutcal/auth'
import {
  HighChartsDataPoint,
  InspectionData,
  INSPECTION_DATA,
  InspectNutrientDialogComponent,
  setLightGridTheme
} from '@cutcal/charts'
import { analyzeParams, dateArray, MealService } from '@cutcal/common-ui'
import { KVP, Nutrition } from '@cutcal/core'
import {
  createNutrCheckableMap,
  NutrCheckable,
  NutrCheckableMap,
  NutrientUnit,
  nutrtionSelections
} from '@cutcal/nutrition'
import * as Highcharts from 'highcharts'
import { Options, SeriesOptionsType } from 'highcharts'
import { forEach, get, groupBy, keyBy, map as _map } from 'lodash'
import { combineLatest, Subject } from 'rxjs'
import { first, map, switchMap, takeUntil, tap } from 'rxjs/operators'
import { BASE_ANALYZE_CHART_OPTIONS } from './constants/analyze.options'
import { AnalysisChartVM } from './models/analysis-chart'
import { ChartControls, updateControls } from './models/chart-controls'
import { DailyNutrition } from './models/daily-nutrition'
import { ViewMap } from './models/view-map'

interface DateRange {
  start: Date;
  end: Date;
}

// Sets Highchart Theme
setLightGridTheme()

/**
 * @see {@link https://stackoverflow.com/questions/2388115/get-locale-short-date-format-using-javascript StackOverflow}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString Mozilla}
 */
const MONTH_DAY_FORMAT: Intl.DateTimeFormatOptions = {
  month: 'short',
  day: 'numeric'
}

const MONTH_DAY_YEAR_FORMAT: Intl.DateTimeFormatOptions = {
  ...MONTH_DAY_FORMAT,
  year: '2-digit'
}

@Component({
  host: { class: 'page-layout flush' },
  styleUrls: ['./analyze.component.scss'],
  templateUrl: './analyze.component.html'
})
export class AnalyzeComponent implements OnDestroy, OnInit {
  private unsub$: Subject<void> = new Subject()

  private inspectOverlayRef: OverlayRef

  /**
   * @description A key-value map storing nutrition information by day
   * @example
   *  [ {date: new Date(2019, 3, 4), nutrition: Nutrition<number>}, ... ]
   */
  private dailyData: KVP<DailyNutrition>

  Highcharts: typeof Highcharts = Highcharts

  /**
   * Saved from previous calculation in case only the controls change
   */
  baseSerieseData: HighChartsDataPoint[]

  /**
   * Array of ViewModels to pass to the template and render the charts
   */
  charts: KVP<AnalysisChartVM> = {}

  /**
   * Stores info about which nutrients are selected
   */
  nutrCheckables: Nutrition<NutrCheckable>

  // FEATURE (analyze) Stored Chart Configurations
  viewMap: KVP<ViewMap> = {}
  view: string

  startDate: Date = new Date()
  endDate: Date = new Date()

  // DISTANT (intl) retreive from localStorage once it's there
  private get locale(): string {
    return 'en-US'
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mealSvc: MealService,
    // FEATURE (analyze) (ngrx) get and set ViewMaps from the store
    // private store: Store<AppState>,
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef,
    private injector: Injector,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.nutrCheckables = nutrtionSelections([
      'calories',
      'protein',
      'carbohydrates',
      'fat'
    ])

    // Gets the url date params and recalculates the charts
    combineLatest(this.auth.activeUser$, this.route.queryParams)
      .pipe(
        map(([, params]) => params),
        switchMap((params: Params) => {
          const { start, end } = this.setDateRange(params)
          return this.mealSvc.getMealRange(start, end)
        }),
        map((meals) =>
          groupBy(meals, (meal) =>
            meal.timestamp.toDate().stripTime().toString()
          )
        ),
        map((dailyMeals) =>
          _map(dailyMeals, (meals) => new DailyNutrition(meals))
        ),
        tap((dailyNutrs) => (this.dailyData = keyBy(dailyNutrs, 'dateString'))),
        tap(() => this.initializeCharts()),
        takeUntil(this.unsub$)
      )
      .subscribe()
  }

  ngOnDestroy(): void {
    this.unsub$.next()
    this.unsub$.complete()
  }

  /**
   * @description Takes the dates from the route and sets them safely to be bound to the date-pickers
   */
  setDateRange(params: Params): DateRange {
    this.startDate = params.start.urlToDate()
    this.endDate = params.end.urlToDate()

    if (!this.startDate && !this.endDate)
      this.startDate = new Date().stripTime().addMonths(-1)
    else if (!this.startDate) this.startDate = this.endDate.addMonths(-1)
    else if (!this.endDate) this.endDate = this.startDate.addMonth()

    return { start: this.startDate, end: this.endDate }
  }

  initializeCharts(): void {
    const unitMap: NutrCheckableMap = createNutrCheckableMap(
      this.nutrCheckables
    )

    const controls: KVP<ChartControls> = updateControls(unitMap)

    this.baseSerieseData = this.getBaseDataSeries()

    this.charts = this.createCharts(unitMap, controls)
  }

  /**
   * @see {@link https://www.highcharts.com/demo/line-basic Highcharts}
   */
  createCharts(
    unitMap: NutrCheckableMap,
    controls: KVP<ChartControls>
  ): KVP<AnalysisChartVM> {
    const result: KVP<AnalysisChartVM> = {}
    for (const unit of Object.keys(unitMap) as NutrientUnit[]) {
      const options = BASE_ANALYZE_CHART_OPTIONS()

      this.setChartOptions(controls[unit], options)

      options.series = this.getChartSeriesOptions(unitMap[unit], controls[unit])

      result[unit] = new AnalysisChartVM(unit, options, controls[unit])
    }
    return result
  }

  // ***************   CALCULATE DATA SERIES   ****************** //

  /**
   * @description Uses chart controls to generate the Highcharts series data
   */
  getChartSeriesOptions(
    checkables: NutrCheckable[],
    controls: ChartControls
  ): SeriesOptionsType[] {
    return checkables
      .filter((checkable) => checkable.isChecked)
      .map((checked) => this.getSeries(checked, controls))
  }

  getSeries(checked: NutrCheckable, control: ChartControls): SeriesOptionsType {
    return {
      name: checked.label,
      type: control.type,
      unit: control.unit,
      nutrient: checked.propName,
      data: this.assignPointValues(this.baseSerieseData, checked.propName)
    } as SeriesOptionsType
  }

  /**
   * @description Updates a data series with corresponding values for the date
   * @returns {HighChartsDataPoint[]} [ { name: 'June 1, 2019', y: 30 }, { name: 'June 2, 2019', y: 34 }, ...]
   */
  private assignPointValues(
    base: HighChartsDataPoint[],
    propName: string
  ): HighChartsDataPoint[] {
    return base.map((point) => {
      const day = this.dailyData[point.name]
      const date = point.name.urlToDate()
      const value = get(day, `nutrition.${propName}`) || 0

      return {
        date,
        name: date.toLocaleDateString(this.locale, MONTH_DAY_YEAR_FORMAT),
        y: value,
        events: { click: this.openModal },
        clickable: value > 0
      } as HighChartsDataPoint
    })
  }

  /**
   * @description Creates a "base" data series of days defaulted to a value of 0
   * @returns {HighChartsDataPoint[]}
   * @example
   *  getBaseDataSeries() => [ { name: 'June 1, 2019', y: 0 }, { name: 'June 2, 2019', y: 0 }, ...]
   */
  private getBaseDataSeries(): HighChartsDataPoint[] {
    return dateArray(
      this.startDate.daysBetween(this.endDate),
      this.startDate
    ).map((date) => ({ name: date.toUrlString(), y: 0 }))
  }

  // ***************   CHART OPTIONS AND CONTROLS BINDINGS   ****************** //

  /**
   * @description Changes to the chart controls enter here, then recreate the single chart
   */
  controlsChange(controls: ChartControls): void {
    const options = this.charts[controls.unit].options

    this.setChartOptions(controls, this.charts[controls.unit].options)

    forEach(options.series, (point) => {
      point.type = controls.type
    })

    this.charts[controls.unit].update = true
  }

  /**
   * @description This method updates the chart with the user's selection from among the chart controls
   */
  setChartOptions(controls: ChartControls, options: Options): void {
    options.xAxis = { categories: this.xAxisLabels(this.baseSerieseData) }
    options.yAxis = {
      title: { text: controls.percentStacked ? '%' : controls.unit }
    }

    this.setStacking(controls, options)
  }

  setStacking(controls: ChartControls, options: Options): void | never {
    const plotOps = options.plotOptions
    if (!plotOps)
      throw Error('[CutCal] setStacking(): plotOptions is undefined')
    const option = plotOps[controls.type]
    if (!option)
      throw Error(
        `[CutCal] setStacking(): option "${controls.type}" is not defined`
      )
    option.stacking = controls.valueStacked
      ? 'normal'
      : controls.percentStacked
      ? 'percent'
      : undefined
  }

  closeChart(chart: AnalysisChartVM): void {
    forEach(this.nutrCheckables, (checkable) => {
      if (checkable?.unit == chart.unit) checkable.isChecked = false
    })

    chart.options.series = []

    this.charts[chart.unit].update = true
  }

  /**
   * @description This method is used to add or remove a nutrient from the chart
   */
  toggleSeries(checkable: NutrCheckable): void | never {
    if (!checkable.unit) throw Error('[CutCal] toggleSeries() requires a unit')
    if (!this.charts[checkable.unit])
      throw Error(
        `[CutCal] toggleSeries() chart for "${checkable.unit}" does not exist`
      )

    const chart = this.charts[checkable.unit]

    if (!chart.options.series)
      throw Error('[CutCal] toggleSeries() - series is undefined')

    // FIXME (analyze)
    // chart.options.series = checkable.isChecked
    //   ? [...chart.options.series, this.getSeries(checkable, chart.controls)]
    //   : chart.options.series.filter(s => s.nutrient !== checkable.propName)

    this.charts[chart.unit] = { ...chart }
  }

  xAxisLabels(base: HighChartsDataPoint[]): string[] {
    return base.map((dp) =>
      dp.name.urlToDate().toLocaleString(this.locale, MONTH_DAY_FORMAT)
    )
  }

  updateUrl(): void {
    this.router.navigate(
      ['analyze'],
      analyzeParams(this.startDate, this.endDate)
    )
  }

  // ***************   INSPECTION MODAL   ****************** //

  openModal = (event: any): void => {
    /**
     * @see {@link https://stackblitz.com/edit/overlay-demo?file=app%2Fapp.module.ts Overlay Stackblitz}
     */

    this.inspectOverlayRef = this.overlay.create(
      new OverlayConfig({
        scrollStrategy: this.overlay.scrollStrategies.block(),
        hasBackdrop: true,
        positionStrategy: this.overlay
          .position()
          .global()
          .centerHorizontally()
          .centerVertically()
      })
    )

    this.inspectOverlayRef
      .backdropClick()
      .pipe(
        first(),
        tap(() => {
          this.inspectOverlayRef.dispose()
        })
      )
      .subscribe()

    this.inspectOverlayRef.attach(
      new ComponentPortal(
        InspectNutrientDialogComponent,
        this.viewContainerRef,
        this.createInjector(<InspectionData>{ event })
      )
    )
  }

  private createInjector(data: InspectionData): PortalInjector {
    return new PortalInjector(
      this.injector,
      new WeakMap<any, InspectionData>([[INSPECTION_DATA, data]])
    )
  }
}
