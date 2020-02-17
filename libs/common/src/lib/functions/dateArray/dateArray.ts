/**
 * Creates an array of sequential dates
 * @param {number} len number of sequential days desired
 * @param {Date} startDate date from which to being the sequence
 * @example
 *  dateArray(3, new Date(2018, 0, 1)) => [ 1 Jan, 2 Jan, 3 Jan ], // but date objects
 */
export function dateArray(len: number, startDate: Date = new Date()): Date[] {
  return Array(len)
    .fill(null)
    .map((x: null, i: number) => i)
    .map((num: number) => startDate.addDays(num))
}
