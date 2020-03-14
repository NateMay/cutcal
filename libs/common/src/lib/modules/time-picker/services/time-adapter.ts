import { dateFromTime } from '../../../functions/dateFromTime/dateFromTime'
import { TimePeriod } from '../models/time-period.enum'
import {
  isBetween,
  isSameOrAfter,
  isSameOrBefore,
} from '../utils/timepicker.utils'

// @dynamic
export class TimeAdapter {
  static parseTime(time: string, format = 12): string {
    if (!time.includes(':')) return 'Invalid time'

    let period = time
      .trim()
      .substr(time.length - 2)
      .toUpperCase()

    const isPeriodValid = period === TimePeriod.AM || period === TimePeriod.PM

    const [h, remaining] = time.split(':')

    const m = remaining.substr(0, 2)

    if (format === 24) {
      const formattedHours = isPeriodValid
        ? this.formatHour(+h, 12, period as TimePeriod)
        : +h
      return `${formattedHours}:${m}`
    }

    const isPM = +h > 12
    const hours = isPM ? +h - 12 : +h

    period = isPeriodValid ? period : isPM ? TimePeriod.PM : TimePeriod.AM

    return `${hours}:${m} ${period}`
  }

  // static formatTime(time: string, format = 12): string {
  //     const _24hour = time.getHours();
  //     const period = _24hour > 12 ? 'pm' : 'am';
  //     const hour = period === 'pm' ? _24hour - 12 : _24hour;
  //     return `${forceZero(hour)}:${forceZero(time.getMinutes())} ${period}`;
  // }

  static isTimeAvailable(
    time?: string | null,
    min?: Date,
    max?: Date,
    granularity?: 'hours' | 'minutes',
    minutesGap?: number
  ): boolean | never {
    if (!time) return false

    const convertedTime: Date = dateFromTime(time)

    const minutes = convertedTime.getMinutes()

    if (minutesGap && minutes % minutesGap !== 0) {
      throw Error(
        `[CutCal] Your minutes - ${minutes} doesn't match your minutesGap - ${minutesGap}`
      )
    }
    const isAfter =
      min && !max && isSameOrAfter(convertedTime, min, granularity)
    const isBefore =
      max && !min && isSameOrBefore(convertedTime, max, granularity)
    const between =
      min && max && isBetween(convertedTime, min, max, granularity)
    const isAvailable = !min && !max

    return isAfter || isBefore || between || isAvailable
  }

  /**
   * @description Format hour according to time format (12 or 24)
   */
  static formatHour(
    currentHour: number,
    format: number,
    period: TimePeriod
  ): number {
    if (format === 24) return currentHour

    const hour = period === TimePeriod.AM ? currentHour : currentHour + 12

    if (period === TimePeriod.AM && hour === 12) return 0
    else if (period === TimePeriod.PM && hour === 24) return 12

    return hour
  }
}
