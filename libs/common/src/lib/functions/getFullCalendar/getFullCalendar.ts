import * as _ from 'lodash';
import { dateArray } from '../dateArray/dateArray';

/**
 * Gets a full month plus filler days at the ends in a 1-dimensional array
 * @param {Date} date a date in the target month
 * @param {number} maxDays maximum number of days to produce
 * @returns {Date[]}
 * @example
 *   getFullCalendar(new Date()) => // an array of dates cooresponding the the calendar face of a month
 */
export function getFullCalendar(date: Date): Date[] {

  const firstOfMonth = date.firstDayOfMonth().stripTime();

  let dates = dateArray(42, firstOfMonth.addDays(-firstOfMonth.getDay()))

  // remove the last week(s) if there are no days from the current month
  if (!dates[28].isSameMonth(date)) dates = _.dropRight(dates, 14);
  else if (!dates[35].isSameMonth(date)) dates = _.dropRight(dates, 7);

  return dates;
}
