export interface Weekday {
  short: string
  medium: string
  long: string
}

export const WEEKDAYS: Weekday[] = [
  { short: 'S', medium: 'Sun', long: 'Sunday' },
  { short: 'M', medium: 'Mon', long: 'Monday' },
  { short: 'T', medium: 'Tue', long: 'Tuesday' },
  { short: 'W', medium: 'Wed', long: 'Wednesday' },
  { short: 'T', medium: 'Thu', long: 'Thursday' },
  { short: 'F', medium: 'Fri', long: 'Friday' },
  { short: 'S', medium: 'Sat', long: 'Saturday' },
]
