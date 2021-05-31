import { Portion } from '@cutcal/core'
import { Meal } from './meal';

/**
 * @description Object representing a specific time that a user eats a food
 *
 * All Nutirition is calculated by applying the Portion from a Usage
 * to the abstract nutrition asscoiated with a food
 *
 * Implements the Portion interface so it can be passed in
 * to function arguments that expect an Portion
 */
export interface Usage extends Portion {
  _id: string
  unit: string
  quantity: number
  foodId: string
  parentId: string
  rootId: string
  userId?: string
}

export const isUsage = (item: Meal | Usage): boolean => 'foodId' in item && 'rootId' in item

export const createUsage = (
  unit: string,
  quantity: number,
  foodId: string,
  parentId: string,
  rootId: string,
  userId?: string,
  _id?: string
): Usage => ({
  unit,
  quantity,
  foodId,
  parentId,
  rootId,
  userId: userId || '',
  _id: _id || ''
})

/**
 * Passed to the cloud function to delete a usage
 */
export interface DeleteUsagePayload {
  mealId: string
  usageId: string
}
