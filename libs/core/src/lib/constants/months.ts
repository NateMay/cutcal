export interface MonthMetaData {
  index: number
  short: string
  long: string
}

/**
 * Numeric map to month names
 */

export const MONTHS: MonthMetaData[] = [
  { index: 0, short: 'Jan', long: 'January' },
  { index: 1, short: 'Feb', long: 'February' },
  { index: 2, short: 'Mar', long: 'March' },
  { index: 3, short: 'Apr', long: 'April' },
  { index: 4, short: 'May', long: 'May' },
  { index: 5, short: 'Jun', long: 'June' },
  { index: 6, short: 'Jul', long: 'July' },
  { index: 7, short: 'Aug', long: 'August' },
  { index: 8, short: 'Sept', long: 'September' },
  { index: 9, short: 'Oct', long: 'October' },
  { index: 10, short: 'Nov', long: 'November' },
  { index: 11, short: 'Dec', long: 'December' },
]
