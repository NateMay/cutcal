import { NavigationExtras } from '@angular/router'
import { Timeframe } from '@cutcal/core'

/**
 * @description Creates the proper url for any data range or date and timeframe
 * and puts it in the proper format for router.navigate()
 * @param {Date} fromDate
 * @param {Timeframe | Date} timeframe
 * @example
 *  this.router.navigate(['analyze'], analyzeParams(this.startDate, this.endDate));
 */
// TODO (routing) change the first param into a tuple of start and end dates
export const analyzeParams = (
  fromDate: Date,
  timeframe: Timeframe | Date
): NavigationExtras => ({
  queryParams: {
    start:
      typeof timeframe === 'object'
        ? fromDate.toUrlString()
        : analyzeStartDate(fromDate, timeframe),
    end:
      typeof timeframe === 'object'
        ? timeframe.toUrlString()
        : analyzeEndDate(fromDate, timeframe)
  }
})

const analyzeStartDate = (
  fromDate: Date,
  timeframe: Timeframe
): string | never => {
  switch (timeframe) {
    case 'week':
      return fromDate.firstDayOfWeek().toUrlString()
    case 'month':
      return fromDate.firstDayOfMonth().toUrlString()
    case 'year':
      return new Date(fromDate.getFullYear(), 0, 1).toUrlString()
    default:
      throw Error(
        `[CutCal] analyzeStartDate() is not currently accounting for the 'day' Timeframe`
      )
  }
}

const analyzeEndDate = (
  fromDate: Date,
  timeframe: Timeframe
): string | never => {
  switch (timeframe) {
    case 'week':
      return fromDate
        .firstDayOfWeek()
        .addDays(6)
        .toUrlString()
    case 'month':
      return fromDate.lastDayOfMonth().toUrlString()
    case 'year':
      return new Date(fromDate.getFullYear(), 11, 31).toUrlString()
    default:
      throw Error(
        `[CutCal] analyzeEndDate() is not currently accounting for the 'day' Timeframe`
      )
  }
}
