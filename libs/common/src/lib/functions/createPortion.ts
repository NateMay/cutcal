import { Portion } from '../models/portion'

export function createPortion(unit: string, quantity: number = 0): Portion {
  return { unit, quantity }
}
