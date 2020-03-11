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
