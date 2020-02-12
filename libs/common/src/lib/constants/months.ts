import { KVP } from '../models/key-value-pair'

export interface MonthMetaData {
  index: number
  short: string
  long: string
}

/**
 * Numeric map to month names
 */

export const MONTHS: KVP<MonthMetaData> = {
  0: { index: 0, short: 'Jan', long: 'January' },
  1: { index: 1, short: 'Feb', long: 'February' },
  2: { index: 2, short: 'Mar', long: 'March' },
  3: { index: 3, short: 'Apr', long: 'April' },
  4: { index: 4, short: 'May', long: 'May' },
  5: { index: 5, short: 'Jun', long: 'June' },
  6: { index: 6, short: 'Jul', long: 'July' },
  7: { index: 7, short: 'Aug', long: 'August' },
  8: { index: 8, short: 'Sept', long: 'September' },
  9: { index: 9, short: 'Oct', long: 'October' },
  10: { index: 10, short: 'Nov', long: 'November' },
  11: { index: 11, short: 'Dec', long: 'December' },
}
