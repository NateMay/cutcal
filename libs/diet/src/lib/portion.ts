export interface Portion {
  unit: string
  quantity: number
}

export const createPortion = (unit: string, quantity: number = 0): Portion => ({
  unit,
  quantity,
})
