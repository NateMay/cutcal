import { isNumber, mergeWith } from 'lodash'
import { Nutrition } from '../nutrition'

/**
 * Aggregates array of nutrition objects
 * @param {Nutrition<number>[]} source
 */
export function sumNutritions(
  source: Array<Nutrition<number>>
): Nutrition<number> {
  return mergeWith.apply(
    null,
    [{}].concat(source).concat((value: number, src: number) => {
      return isNumber(value) ? value + src : src
    })
  )
}
