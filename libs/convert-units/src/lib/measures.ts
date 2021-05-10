import { MASS } from './mass'
import { MeasureBases } from './unit-interfaces'
import { VOLUME } from './volume'

export const MEASURES: MeasureBases = Object.freeze({
  mass: MASS,
  volume: VOLUME
  // energy: ???
})
