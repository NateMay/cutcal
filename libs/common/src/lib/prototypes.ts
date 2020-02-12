Date.prototype.stripTime = stripTime
interface Date {
  stripTime: typeof stripTime
}
/**
 * Set to first moment of the day
 * @return {Date}
 */
function stripTime(): Date {
  this.setHours(0, 0, 0, 0)
  return new Date(this)
}

Date.prototype.setTimeNow = setTimeNow
interface Date {
  setTimeNow: typeof setTimeNow
}
/**
 * Set to first moment of the day
 * @return {Date}
 */
function setTimeNow(): Date {
  const now = new Date()
  this.setHours(
    now.getHours(),
    now.getMinutes(),
    now.getSeconds(),
    now.getMilliseconds()
  )
  return new Date(this)
}

Date.prototype.endOfDay = endOfDay
interface Date {
  endOfDay: typeof endOfDay
}
/**
 * Set to first moment of the day
 * @return {Date}
 */
function endOfDay(): Date {
  this.setHours(23, 59, 59, 999)
  return new Date(this)
}

Date.prototype.firstDayOfMonth = firstDayOfMonth
interface Date {
  firstDayOfMonth: typeof firstDayOfMonth
}
/**
 * Returns the first Date of the month
 * @return {Date}
 * @example
 * { Jan 12 }.firstDayOfMonth( ) => { Jan 1 }
 */
function firstDayOfMonth(): Date {
  return new Date(this.getFullYear(), this.getMonth(), 1)
}

Date.prototype.lastDayOfMonth = lastDayOfMonth
interface Date {
  lastDayOfMonth: typeof lastDayOfMonth
}
/**
 * Returns the last Date of the month
 * @return {Date}
 * @example
 * { Jan 12 }.lastDayOfMonth( ) => { Jan 31 }
 */
function lastDayOfMonth(): Date {
  return new Date(this.getFullYear(), this.getMonth() + 1, 0)
}

Date.prototype.addDay = addDay
interface Date {
  addDay: typeof addDay
}
/**
 * Increments a date by 1 day
 * @return {Date}
 * @example
 *   new Date(2019, 3, 4).addDay() => Date(2019, 3, 5)
 */
function addDay(): Date {
  return this.addDays(1)
}

Date.prototype.addDays = addDays
interface Date {
  addDays: typeof addDays
}
/**
 * Returns a new Date() object incrmented by the specified dayCount
 * @param {number} dayCount The number of days to increment (negatives are valid)
 * @return {Date}
 * @example
 *   new Date(2019, 3, 4).addDays(4) => Date(2019, 3, 8)
 */
function addDays(dayCount: number = 1): Date {
  const newDate = new Date(this)
  newDate.setDate(this.getDate() + dayCount)
  return newDate
}

Date.prototype.addMonth = addMonth
interface Date {
  addMonth: typeof addMonth
}
/**
 * Increments a date by 1 month
 * @return {Date}
 * @example
 *   new Date(2019, 3, 4).addMonth() => Date(2019, 4, 4)
 */
function addMonth(): Date {
  return this.addMonths(1)
}

Date.prototype.addMonths = addMonths
interface Date {
  addMonths: typeof addMonths
}
/**
 * Returns a new Date() object incrmented by the specified monthCount
 * @param {number} monthCount The number of days to increment (negatives are valid)
 * @return {Date}
 * @example
 *   new Date(2019, 0, 15).addMonths(3) => Date(2019, 3, 15)
 *   new Date(2019, 9, 31).addMonths(1) => Date(2019, 10, 30) // oct => nov
 */
function addMonths(monthCount: number = 1): Date {
  const newDate = new Date(this)
  const n = newDate.getDate()
  newDate.setDate(1)
  newDate.setMonth(newDate.getMonth() + monthCount)
  newDate.setDate(Math.min(n, newDate.getDaysInMonth()))
  return newDate
}

Date.prototype.isLeapYear = isLeapYear
interface Date {
  isLeapYear: typeof isLeapYear
}
/**
 * Whether a year is a leap year
 * @return {boolean}
 * @example
 *   new Date(2012, 9, 31) => true;
 */

function isLeapYear(): boolean {
  return _isLeapYear(this.getFullYear())
}

function _isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}

Date.prototype.getDaysInMonth = getDaysInMonth
interface Date {
  getDaysInMonth: typeof getDaysInMonth
}
/**
 * Gets the number of days in the month
 * @return {number}
 * @example
 *   new Date(2012, 1, 5).getDaysInMonth() => 29
 */
function getDaysInMonth(): number {
  return _getDaysInMonth(this.getFullYear(), this.getMonth())
}

function _getDaysInMonth(year: number, month: number): number {
  return [
    31,
    _isLeapYear(year) ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ][month]
}

Date.prototype.addYear = addYear
interface Date {
  addYear: typeof addYear
}
/**
 * Increments a date by 1 year
 * @return {Date}
 * @example
 *   new Date(2018, 0, 12).addYear() => new Date(2019, 0, 12)
 */
function addYear(): Date {
  return this.addYears(1)
}

Date.prototype.addYears = addYears
interface Date {
  addYears: typeof addYears
}
/**
 * Returns a new Date() object incrmented by the specified YearCount
 * @param {number} YearCount The number of days to increment (negatives are valid)
 * @return {Date}
 * @example
 *   new Date(2018, 0, 12).addYears(3) => new Date(2021, 0, 12)
 */
function addYears(YearCount: number = 1): Date {
  let newDate = new Date(this)
  newDate.setFullYear(this.getFullYear() + YearCount)
  if (this.isLeapYear() && this.getMonth() == 1 && !newDate.isLeapYear())
    newDate = newDate.addDays(-1)
  return newDate
}

Date.prototype.isToday = isToday
interface Date {
  isToday: typeof isToday
}
/**
 * true if date is same day as today regardless of the time
 * @return {Boolean}
 */
function isToday(): boolean {
  const today = new Date()
  return (
    this.getFullYear() === today.getFullYear() &&
    this.getMonth() === today.getMonth() &&
    this.getDate() === today.getDate()
  )
}

Date.prototype.isSameDay = isSameDay
interface Date {
  isSameDay: typeof isSameDay
}
/**
 * detects if the datesshare the dame day, month and year
 * @return {Boolean}
 * @example
 *   new Date('Jan 12 2018, 9am').isSameDay(new Date('Jan 12 2018, 2pm')) => true
 */
function isSameDay(date: Date): boolean {
  if (!date) return false

  return (
    this.getFullYear() === date.getFullYear() &&
    this.getMonth() === date.getMonth() &&
    this.getDate() === date.getDate()
  )
}

Date.prototype.firstDayOfWeek = firstDayOfWeek
interface Date {
  firstDayOfWeek: typeof firstDayOfWeek
}
/**
 * Returns the Date of the current or previous sunday
 * @return {Date}
 * @example
 * { Monday 22 }.firstDayOfWeek() => { Sunday 22 }
 */
function firstDayOfWeek(): Date {
  return this.addDays(-this.getDay())
}

Date.prototype.isBefore = isBefore
interface Date {
  isBefore: typeof isBefore
}
/**
 * Whether the date is before the argument
 * @param {Date} compare the date with which to compare
 * @return {Boolean}
 * @example
 * { Oct 22 }.isBefore( { Oct 21 } ) => false
 */
function isBefore(compare: Date): boolean {
  return this.getTime() < compare.getTime()
}

Date.prototype.isBetween = isBetween
interface Date {
  isBetween: typeof isBetween
}
/**
 * Whether the date is between those provided
 * @param {Date} minDate lower bound of checked range
 * @param {Date} maxDate uppder bound of checked range
 * @return {Boolean}
 * @examples
 *   new Date('Oct 22').isBetween( new Date( 'Oct 21' ), new Date('Oct 23' ) ) => true
 *   new Date('Oct 22, 9am').isBetween( new Date( 'Oct 22, 10am' ), new Date('Oct 23' ) ) => false
 */
function isBetween(minDate: Date, maxDate: Date): boolean {
  if (!this.getTime)
    throw new Error('[CutCal] isBetween() was called on a non Date object')

  const gtmin = !minDate ? true : this.getTime() >= minDate.getTime()
  const ltmax = !maxDate ? true : this.getTime() <= maxDate.getTime()

  return gtmin && ltmax
}

Date.prototype.age = age
interface Date {
  age: typeof age
}
/**
 * Returns the age of something born at the moment represented by the underlying Date
 * @return {number}
 */
function age(asOf: Date = new Date()): number {
  const birthDate = new Date(this)
  let ageCalc = asOf.getFullYear() - birthDate.getFullYear()
  const m = asOf.getMonth() - birthDate.getMonth()
  if (m < 0 || (m === 0 && asOf.getDate() < birthDate.getDate())) ageCalc--
  return ageCalc
}

Date.prototype.assignTime = assignTime
interface Date {
  assignTime: typeof assignTime
}
/**
 * Returns a new Date matching the underlying date, but passed in time
 * @return {Date}
 * @example
 * { Oct 22 9am }.assignTime( { Jan 5 4pm }, ) => { Oct 22 4pm }
 */
function assignTime(time: Date): Date {
  const result = new Date(time)
  result.setFullYear(this.getFullYear())
  result.setMonth(this.getMonth())
  result.setDate(this.getDate())
  return result
}

Date.prototype.isSameMonth = isSameMonth
interface Date {
  isSameMonth: typeof isSameMonth
}
/**
 * Whether argument Date is in the same month as the underlying Date
 * @return {Boolean}
 * @example
 * { Oct 22 2018 }.isSameMonth( { Oct 5 2018 }, ) => true
 * { Oct 22 2019 }.isSameMonth( { Oct 5 2018 }, ) => false
 */
function isSameMonth(date: Date): boolean {
  return (
    this.getMonth() === date.getMonth() &&
    this.getFullYear() === date.getFullYear()
  )
}

Date.prototype.toUrlString = toUrlString
interface Date {
  toUrlString: typeof toUrlString
}
/**
 * Formats the date for use in url parameters
 * @return {String}
 * @example
 * { Jan 12 }.toUrlString( ) => '1-12-2018'
 */
function toUrlString(): string {
  return `${this.getDate()}-${this.getMonth() + 1}-${this.getFullYear()}`
}

Date.prototype.daysBetween = daysBetween
interface Date {
  daysBetween: typeof daysBetween
}
/**
 * Calculates the number of days between 2 dates
 * @return {String}
 * @example
 * { Jan 12 }.daysBetween( Jan 14  ) => 2
 */
function daysBetween(date2: Date) {
  // Get 1 day in milliseconds
  const one_day = 1000 * 60 * 60 * 24

  // Convert both dates to milliseconds
  const date1_ms = this.getTime()
  const date2_ms = date2.getTime()

  // Calculate the difference in milliseconds
  const difference_ms = date2_ms - date1_ms

  // Convert back to days and return
  return Math.abs(Math.round(difference_ms / one_day))
}

String.prototype.urlToDate = urlToDate
interface String {
  urlToDate: typeof urlToDate
}
/**
 * Formats the date for use in url parameters
 * @return {Date}
 * @example
 * { Jan 12 }.urlToDate( ) => '1-12-2018'
 */
function urlToDate(): Date {
  const parts = this.split('-')
  return new Date(+parts[2], +parts[1] - 1, +parts[0])
}

String.prototype.insertText = insertText
interface String {
  insertText: typeof insertText
}
/**
 * Formats the date for use in url parameters
 * @return {Date}
 * @example
 * 'Helorld'.insertText('lo W', 'before', 'orl' ) => 'Hello World'
 */
function insertText(
  insertTxt: string,
  where: 'before' | 'after',
  relativeTo: string
): string {
  const index =
    where === 'before'
      ? this.indexOf(relativeTo)
      : this.indexOf(relativeTo) + relativeTo.length

  return `${this.slice(0, index)}${insertTxt}${this.slice(index)}`
}

String.prototype.extension = extension
interface String {
  extension: typeof extension
}

/**
 * Extracts the file extension
 * @example
 *   'a/file/path.ext'.extension(); => 'ext'
 */

function extension(): string {
  return this.substring(this.lastIndexOf('.') + 1, this.length) || this
}

// Object.prototype.filter = filter;
// interface Object { filter: typeof filter }

// /**
//  * Extracts the file extension
//  * @example
//  *   const greeting = {
//  *     a: 'Hello',
//  *     b: 'Hey',
//  *     c: 'Bye Bye'
//  *   }
//  *
//  *  const longGreetings = greetings.filter((value, key) => value.length >= 5);
//  *
//  * @reference [Medium] {@link https://medium.com/better-programming/javascript-tips-1-the-filter-method-for-object-properties-a2d6869b5127}
//  */
// function filter(predicate) {
//   if (!this.__proto__ || this.__proto__.constructor.name !== 'object')
//     throw new Error('[CutCal] Cannot invoke the filter method: this input is not an object')

//   const newObj = {}
//   for (const prop in this) {
//     if (this.hasOwnProperty(prop) && predicate(this[prop], prop, this))
//       newObj[prop] = this[prop]
//   }

//   return newObj;
// }
