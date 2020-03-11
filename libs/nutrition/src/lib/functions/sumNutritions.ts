import { isNumber, mergeWith } from 'lodash'
import { Nutrition } from '../nutrition'

/**
 * @description Aggregates array of nutrition objects
 * @param {Nutrition<number>[]} source
 */
export const sumNutritions = (
  source: Nutrition<number>[]
): Nutrition<number> => // eslint-disable-next-line prefer-spread
  mergeWith.apply(
    null,
    [{}]
      .concat(source)
      .concat((value: number, src: number) =>
        isNumber(value) ? value + src : src
      )
  )
