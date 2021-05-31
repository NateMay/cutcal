import { isNumber, mergeWith } from 'lodash'
import { Nutrition } from '@cutcal/core'

/**
 * @description Aggregates an array of nutrition objects
 * @param {Nutrition<number>[]} source
 */
export const sumNutritions = (
  source: Nutrition<number>[]
): Nutrition<number> =>
  mergeWith.apply(
    null,
    [{}]
      .concat(source)
      .concat((value: number, src: number) =>
        isNumber(value) ? value + src : src
      )
  ) as Nutrition<number>
