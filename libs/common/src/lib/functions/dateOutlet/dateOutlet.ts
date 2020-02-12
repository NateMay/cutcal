/**
 * Creates the auxilliary route part of a url from a date
 * @param {Date} data date to represent in the url
 * @example
 *  dateOutlet(new Date(2019, 7, 7)) => "(dmy:7-8-2019)"
 *   // for the url "www.cutcal.com/calendar/month/(dmy:7-8-2019)"
 */

export function dateOutlet(date: Date): any {
  return { outlets: { dmy: date.toUrlString() } }
}
