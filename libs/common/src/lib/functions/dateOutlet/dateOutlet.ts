/**
 * @description Creates the auxilliary route part of a url from a date
 * @param {Date} data date to represent in the url
 * @example
 *  // for the url "www.cutcal.com/calendar/month/(dmy:7-8-2019)"
 *  dateOutlet(new Date(2019, 7, 7)) => "(dmy:7-8-2019)"
 */

export const dateOutlet = (date: Date): any => ({
  outlets: { dmy: date.toUrlString() },
})
