export function isSameOrAfter(
  time: Date,
  compareWith: Date,
  unit: 'hours' | 'minutes' = 'minutes'
): boolean {
  return unit === 'hours'
    ? time.getHours() >= compareWith.getHours()
    : time.getMinutes() >= compareWith.getMinutes()
}

export function isSameOrBefore(
  time: Date,
  compareWith: Date,
  unit: 'hours' | 'minutes' = 'minutes'
): boolean {
  return unit === 'hours'
    ? time.getHours() <= compareWith.getHours()
    : time.getMinutes() <= compareWith.getMinutes()
}

export function isBetween(
  time: Date,
  before: Date,
  after: Date,
  unit: 'hours' | 'minutes' = 'minutes'
): boolean {
  return unit === 'hours'
    ? isSameOrBefore(time, after, unit) && isSameOrAfter(time, before, unit)
    : isSameOrBefore(time, after) && isSameOrAfter(time, before)
}
