import { Food } from './food'
import { Usage } from './usage'

/**
 * A Food (which is an abstract notion) is often paired with a Usage representing
 *   a specific unit of consumption. This interface is a pairing of these.
 */
export interface Ingredient {
  usage: Usage
  food: Food
}
