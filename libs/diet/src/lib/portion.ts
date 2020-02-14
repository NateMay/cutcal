export interface Portion {
  unit: string
  quantity: number
}

export function createPortion(unit: string, quantity: number = 0): Portion {
  return { unit, quantity }
}
