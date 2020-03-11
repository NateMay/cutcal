import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import { MatSelectChange } from '@angular/material/select'
import { MatSlideToggleChange } from '@angular/material/slide-toggle'
import * as Highcharts from 'highcharts'
import { merge } from 'lodash'
import { AnalysisChartVM } from '../models/analysis-chart'
import { ChartControls } from '../models/chart-controls'

/**
 * @see {@link https://github.com/highcharts/highcharts-angular/tree/master/src/app Highcharts Angular}
 */
@Component({
  selector: 'cc-analysis-chart',
  styleUrls: ['./analysis-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'cc-analysis-chart' },
  template: `
    <button
      mat-icon-button
      class="close-chart"
      (click)="closeChart.emit(chart)"
    >
      <mat-icon>close</mat-icon>
    </button>

    <!-- Chart -->
    <highcharts-chart
      [update]="update"
      (updateChange)="chart.update = $event"
      [Highcharts]="Highcharts"
      [options]="chart.options"
      style="width: 100%; height: 400px; display: block;"
    ></highcharts-chart>

    <!-- Controls -->
    <div class="chart-controls" fxLayout="row wrap" fxLayoutGap="24px">
      <mat-form-field>
        <mat-label>Chart Type</mat-label>
        <mat-select
          [value]="controls.type"
          (selectionChange)="typeChange($event)"
        >
          <mat-option *ngFor="let type of chartTypes" [value]="type">{{
            type
          }}</mat-option>
        </mat-select>
      </mat-form-field>

      <div
        class="control-switches"
        fxLayout="column"
        *ngIf="chart?.options?.series?.length > 1"
      >
        <mat-slide-toggle
          (change)="valueStackedChange($event)"
          [checked]="controls.valueStacked"
          >Stacked</mat-slide-toggle
        >

        <mat-slide-toggle
          (change)="percentStackedChange($event)"
          [checked]="controls.percentStacked"
          >Stacked %</mat-slide-toggle
        >
      </div>
    </div>
  `,
})
export class AnalysisChartComponent {
  Highcharts: typeof Highcharts = Highcharts

  chartTypes = ['line', 'column', 'bar', 'area'] // 'pie'

  @Input() update: boolean = false

  @Input() chart: AnalysisChartVM

  get controls(): ChartControls {
    return this.chart.controls
  }

  @Output() controlsChange = new EventEmitter<ChartControls>()

  @Output() closeChart = new EventEmitter<AnalysisChartVM>()

  constructor() {}

  valueStackedChange(change: MatSlideToggleChange): void {
    this.controlsChange.emit(
      merge(this.controls, {
        valueStacked: change.checked,
        percentStacked: change.checked ? false : this.controls.percentStacked,
      })
    )
  }

  percentStackedChange(change: MatSlideToggleChange): void {
    this.controlsChange.emit(
      merge(this.controls, {
        percentStacked: change.checked,
        valueStacked: change.checked ? false : this.controls.valueStacked,
      })
    )
  }

  typeChange(change: MatSelectChange): void {
    this.controlsChange.emit(merge(this.controls, { type: change.value }))
  }
}
