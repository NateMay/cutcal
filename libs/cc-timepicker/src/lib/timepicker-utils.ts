export interface ClockFaceTime {
  time: number
  angle: number
  disabled?: boolean
}

export const DEFAULT_HOUR: ClockFaceTime = {
  time: 12,
  angle: 360
}
export const DEFAULT_MINUTE: ClockFaceTime = {
  time: 0,
  angle: 360
}

export enum TimePeriod {
  AM = 'AM',
  PM = 'PM'
}
export enum TimeUnit {
  HOUR,
  MINUTE
}

export const getHours = (format: number): ClockFaceTime[] =>
  Array(format)
    .fill(1)
    .map((v: number, i: number) => {
      const angleStep = 30
      const time = v + i
      const angle = angleStep * time
      return { time: time === 24 ? 0 : time, angle }
    })

export function getMinutes(gap = 1): ClockFaceTime[] {
  const minutesCount = 60
  const angleStep = 360 / minutesCount
  const minutes: ClockFaceTime[] = []

  for (let i = 0; i < minutesCount; i++) {
    const angle = angleStep * i
    if (i % gap === 0) {
      minutes.push({ time: i, angle: angle !== 0 ? angle : 360 })
    }
  }
  return minutes
}

export const isSameOrAfter = (
  time: Date,
  compareWith: Date,
  unit: 'hours' | 'minutes' = 'minutes'
): boolean =>
  unit === 'hours'
    ? time.getHours() >= compareWith.getHours()
    : time.getMinutes() >= compareWith.getMinutes()

export const isSameOrBefore = (
  time: Date,
  compareWith: Date,
  unit: 'hours' | 'minutes' = 'minutes'
): boolean =>
  unit === 'hours'
    ? time.getHours() <= compareWith.getHours()
    : time.getMinutes() <= compareWith.getMinutes()

export const isBetween = (
  time: Date,
  before: Date,
  after: Date,
  unit: 'hours' | 'minutes' = 'minutes'
): boolean =>
  unit === 'hours'
    ? isSameOrBefore(time, after, unit) && isSameOrAfter(time, before, unit)
    : isSameOrBefore(time, after) && isSameOrAfter(time, before)
