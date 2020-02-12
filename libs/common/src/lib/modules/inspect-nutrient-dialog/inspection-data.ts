import { InjectionToken } from '@angular/core'
import { HighChartsDataPoint } from '../../models/highcharts-data-point'

export const INSPECTION_DATA = new InjectionToken<{}>('InspectionData')

export interface InspectionData {
  event: HighChartPointClickEvent
}

export interface HighChartPointClickEvent extends MouseEvent {
  point: HighChartsDataPoint
}
