import { Usage } from '../models/usage'

export function createUsage(
  unit: string,
  quantity: number,
  foodId: string,
  parentId: string,
  rootId: string,
  userId?: string,
  _id?: string
): Usage {
  return {
    unit,
    quantity,
    foodId,
    parentId,
    rootId,
    userId: userId || '',
    _id: _id || '',
  }
}
