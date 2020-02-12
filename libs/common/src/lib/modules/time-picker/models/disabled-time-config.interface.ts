import { TimePeriod } from './time-period.enum'

export interface DisabledTimeConfig {
  min: Date
  max: Date
  format: number
  period: TimePeriod
}
