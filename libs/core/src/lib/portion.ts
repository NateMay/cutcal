import { FdcUnit } from './fdc-response';
export interface Portion {
  unit: string
  quantity: number
}

export const createPortion = (
  unit: FdcUnit,
  quantity: number = 0
): Portion => ({
  unit,
  quantity
})
