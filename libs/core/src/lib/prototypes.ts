
/**
 * *****************
 * String prototypes
 * *****************
 */

String.prototype.extension = extension
String.prototype.urlToDate = urlToDate
String.prototype.insertText = insertText

interface String {
  urlToDate: typeof urlToDate;
  insertText: typeof insertText;
  extension: typeof extension;
}



/**
 * Formats the date for use in url parameters
 * @return {Date}
 * @example
 * { Jan 12 }.urlToDate( ) => '1-12-2018'
 */
function urlToDate(this: string): Date {
  const parts = this.split('-')
  return new Date(+parts[2], +parts[1] - 1, +parts[0])
}



/**
 * Formats the date for use in url parameters
 * @return {Date}
 * @example
 * 'Helorld'.insertText('lo W', 'before', 'orl' ) => 'Hello World'
 */
function insertText(
  this: string,
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



/**
 * Extracts the file extension
 * @example
 *   'a/file/path.ext'.extension(); => 'ext'
 */
function extension(this: string): string {
  return this.substring(this.lastIndexOf('.') + 1, this.length) || this
}






/**
 * ***************
 * Date prototypes
 * ***************
 */


Date.prototype.stripTime = stripTime
Date.prototype.setTimeNow = setTimeNow
Date.prototype.endOfDay = endOfDay
Date.prototype.firstDayOfMonth = firstDayOfMonth
Date.prototype.lastDayOfMonth = lastDayOfMonth
Date.prototype.addDay = addDay
Date.prototype.addDays = addDays
Date.prototype.addMonth = addMonth
Date.prototype.addMonths = addMonths
Date.prototype.isLeapYear = isLeapYear
Date.prototype.getDaysInMonth = getDaysInMonth
Date.prototype.addYear = addYear
Date.prototype.addYears = addYears
Date.prototype.isToday = isToday
Date.prototype.isSameDay = isSameDay
Date.prototype.firstDayOfWeek = firstDayOfWeek
Date.prototype.isBefore = isBefore
Date.prototype.isBetween = isBetween
Date.prototype.age = age
Date.prototype.assignTime = assignTime
Date.prototype.isSameMonth = isSameMonth
Date.prototype.toUrlString = toUrlString
Date.prototype.daysBetween = daysBetween

interface Date {
  stripTime: typeof stripTime;
  setTimeNow: typeof setTimeNow;
  endOfDay: typeof endOfDay;
  firstDayOfMonth: typeof firstDayOfMonth;
  lastDayOfMonth: typeof lastDayOfMonth;
  addDay: typeof addDay;
  addDays: typeof addDays;
  addMonth: typeof addMonth;
  addMonths: typeof addMonths;
  isLeapYear: typeof isLeapYear;
  getDaysInMonth: typeof getDaysInMonth;
  addYear: typeof addYear;
  addYears: typeof addYears;
  isToday: typeof isToday;
  isSameDay: typeof isSameDay;
  firstDayOfWeek: typeof firstDayOfWeek;
  isBefore: typeof isBefore;
  isBetween: typeof isBetween;
  age: typeof age;
  assignTime: typeof assignTime;
  isSameMonth: typeof isSameMonth;
  toUrlString: typeof toUrlString;
  daysBetween: typeof daysBetween;
}




/**
 * Set to first moment of the day
 * @return {Date}
 */
function stripTime(this: Date): Date {
  this.setHours(0, 0, 0, 0)
  return new Date(this)
}




/**
 * Set to first moment of the day
 * @return {Date}
 */
function setTimeNow(this: Date): Date {
  const now = new Date()
  this.setHours(
    now.getHours(),
    now.getMinutes(),
    now.getSeconds(),
    now.getMilliseconds()
  )
  return new Date(this)
}


/**
 * Set to first moment of the day
 * @return {Date}
 */
function endOfDay(this: Date): Date {
  this.setHours(23, 59, 59, 999)
  return new Date(this)
}


/**
 * Returns the first Date of the month
 * @return {Date}
 * @example
 * { Jan 12 }.firstDayOfMonth( ) => { Jan 1 }
 */
function firstDayOfMonth(this: Date): Date {
  return new Date(this.getFullYear(), this.getMonth(), 1)
}


/**
 * Returns the last Date of the month
 * @return {Date}
 * @example
 * { Jan 12 }.lastDayOfMonth( ) => { Jan 31 }
 */
function lastDayOfMonth(this: Date): Date {
  return new Date(this.getFullYear(), this.getMonth() + 1, 0)
}


/**
 * Increments a date by 1 day
 * @return {Date}
 * @example
 *   new Date(2019, 3, 4).addDay() => Date(2019, 3, 5)
 */
function addDay(this: Date): Date {
  return this.addDays(1)
}


/**
 * Returns a new Date() object incrmented by the specified dayCount
 * @param {number} dayCount The number of days to increment (negatives are valid)
 * @return {Date}
 * @example
 *   new Date(2019, 3, 4).addDays(4) => Date(2019, 3, 8)
 */
function addDays(this: Date, dayCount: number = 1): Date {
  const newDate = new Date(this)
  newDate.setDate(this.getDate() + dayCount)
  return newDate
}


/**
 * Increments a date by 1 month
 * @return {Date}
 * @example
 *   new Date(2019, 3, 4).addMonth() => Date(2019, 4, 4)
 */
function addMonth(this: Date): Date {
  return this.addMonths(1)
}


/**
 * Returns a new Date() object incrmented by the specified monthCount
 * @param {number} monthCount The number of days to increment (negatives are valid)
 * @return {Date}
 * @example
 *   new Date(2019, 0, 15).addMonths(3) => Date(2019, 3, 15)
 *   new Date(2019, 9, 31).addMonths(1) => Date(2019, 10, 30) // oct => nov
 */
function addMonths(this: Date, monthCount: number = 1): Date {
  const newDate = new Date(this)
  const n = newDate.getDate()
  newDate.setDate(1)
  newDate.setMonth(newDate.getMonth() + monthCount)
  newDate.setDate(Math.min(n, newDate.getDaysInMonth()))
  return newDate
}


/**
 * Whether a year is a leap year
 * @return {boolean}
 * @example
 *   new Date(2012, 9, 31) => true;
 */

function isLeapYear(this: Date): boolean {
  return _isLeapYear(this.getFullYear())
}

function _isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}


/**
 * Gets the number of days in the month
 * @return {number}
 * @example
 *   new Date(2012, 1, 5).getDaysInMonth() => 29
 */
function getDaysInMonth(this: Date): number {
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


/**
 * Increments a date by 1 year
 * @return {Date}
 * @example
 *   new Date(2018, 0, 12).addYear() => new Date(2019, 0, 12)
 */
function addYear(this: Date): Date {
  return this.addYears(1)
}


/**
 * Returns a new Date() object incrmented by the specified YearCount
 * @param {number} yearCount The number of days to increment (negatives are valid)
 * @return {Date}
 * @example
 *   new Date(2018, 0, 12).addYears(3) => new Date(2021, 0, 12)
 */
function addYears(this: Date, yearCount: number = 1): Date {
  let newDate = new Date(this)
  newDate.setFullYear(this.getFullYear() + yearCount)
  if (this.isLeapYear() && this.getMonth() == 1 && !newDate.isLeapYear())
    newDate = newDate.addDays(-1)
  return newDate
}


/**
 * true if date is same day as today regardless of the time
 * @return {Boolean}
 */
function isToday(this: Date): boolean {
  const today = new Date()
  return (
    this.getFullYear() === today.getFullYear() &&
    this.getMonth() === today.getMonth() &&
    this.getDate() === today.getDate()
  )
}


/**
 * detects if the datesshare the dame day, month and year
 * @return {Boolean}
 * @example
 *   new Date('Jan 12 2018, 9am').isSameDay(new Date('Jan 12 2018, 2pm')) => true
 */
function isSameDay(this: Date, date: Date): boolean {
  if (!date) return false

  return (
    this.getFullYear() === date.getFullYear() &&
    this.getMonth() === date.getMonth() &&
    this.getDate() === date.getDate()
  )
}


/**
 * Returns the Date of the current or previous sunday
 * @return {Date}
 * @example
 * { Monday 22 }.firstDayOfWeek() => { Sunday 22 }
 */
function firstDayOfWeek(this: Date): Date {
  return this.addDays(-this.getDay())
}


/**
 * Whether the date is before the argument
 * @param {Date} compare the date with which to compare
 * @return {Boolean}
 * @example
 * { Oct 22 }.isBefore( { Oct 21 } ) => false
 */
function isBefore(this: Date, compare: Date): boolean {
  return this.getTime() < compare.getTime()
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
function isBetween(this: Date, minDate: Date, maxDate: Date): boolean {
  if (!this.getTime)
    throw new Error('[CutCal] isBetween() was called on a non Date object')

  const gtmin = !minDate ? true : this.getTime() >= minDate.getTime()
  const ltmax = !maxDate ? true : this.getTime() <= maxDate.getTime()

  return gtmin && ltmax
}


/**
 * Returns the age of something born at the moment represented by the underlying Date
 * @return {number}
 */
function age(this: Date, asOf: Date = new Date()): number {
  const birthDate = new Date(this)
  let ageCalc = asOf.getFullYear() - birthDate.getFullYear()
  const m = asOf.getMonth() - birthDate.getMonth()
  if (m < 0 || (m === 0 && asOf.getDate() < birthDate.getDate())) ageCalc--
  return ageCalc
}


/**
 * Returns a new Date matching the underlying date, but passed in time
 * @return {Date}
 * @example
 * { Oct 22 9am }.assignTime( { Jan 5 4pm }, ) => { Oct 22 4pm }
 */
function assignTime(this: Date, time: Date): Date {
  const result = new Date(time)
  result.setFullYear(this.getFullYear())
  result.setMonth(this.getMonth())
  result.setDate(this.getDate())
  return result
}


/**
 * Whether argument Date is in the same month as the underlying Date
 * @return {Boolean}
 * @example
 * { Oct 22 2018 }.isSameMonth( { Oct 5 2018 }, ) => true
 * { Oct 22 2019 }.isSameMonth( { Oct 5 2018 }, ) => false
 */
function isSameMonth(this: Date, date: Date): boolean {
  return (
    this.getMonth() === date.getMonth() &&
    this.getFullYear() === date.getFullYear()
  )
}


/**
 * Formats the date for use in url parameters
 * @return {String}
 * @example
 * { Jan 12 }.toUrlString( ) => '1-12-2018'
 */
function toUrlString(this: Date): string {
  return `${this.getDate()}-${this.getMonth() + 1}-${this.getFullYear()}`
}


/**
 * Calculates the number of days between 2 dates
 * @return {String}
 * @example
 * { Jan 12 }.daysBetween( Jan 14  ) => 2
 */
function daysBetween(this: Date, date2: Date) {
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
