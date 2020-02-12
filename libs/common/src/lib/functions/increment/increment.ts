import * as _ from 'lodash'

/**
 * Determines the appropirate step adjustment
 * @param {number} quantity
 * @param {number} direction
 * @return {number}
 */

export function increment(quantity: number, direction: number): number {
  return _.round(quantity + direction * getQuantityStep(quantity), 2)
}

export function getQuantityStep(quant: number): number {
  return quant <= 0.01
    ? quant
    : quant <= 0.05
    ? 0.01
    : quant <= 0.25
    ? 0.05
    : quant <= 0.5
    ? quant / 2
    : quant <= 2
    ? 0.25
    : quant <= 5
    ? 0.5
    : quant <= 30
    ? 1
    : 5
}
