// TODO (move) into the TimeAdapter

/**
 * @description Assigns the time from a time string to a data object
 * @param {string} time "12:34 AM"
 */
export function dateFromTime(time: string): Date | never {
  if (!isValidTime(time)) {
    throw Error('[CutCal] dateFromTime() must recieve valid time string')
  }

  const [hour, remaining] = time.split(':')
  const [minutes, period] = remaining.split(' ')
  const finalHour =
    period.toUpperCase() == 'PM' && hour != '12' ? +hour + 12 : +hour

  return new Date(1900, 0, 1, finalHour, +minutes)
}
export function timeFromDate(date: Date): string {
  const _24hour = date.getHours()
  const period = _24hour > 12 ? 'pm' : 'am'
  const hour = period === 'pm' ? _24hour - 12 : _24hour
  return `${forceZero(hour)}:${forceZero(date.getMinutes())} ${period}`
}

export const forceZero = (num: number): string =>
  num < 10 ? `0${num}` : `${num}`

export const isValidTime = (time: string): boolean =>
  /^(0?[1-9]|1[012])(:[0-5]\d) [APap][mM]$/.test(time)
