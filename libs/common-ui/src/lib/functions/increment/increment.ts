import { round } from 'lodash'

/**
 * @description Determines the appropirate step adjustment
 * @param {number} quantity
 * @param {number} direction
 * @returns {number}
 */

export const increment = (quantity: number, direction: number): number =>
  round(quantity + direction * getQuantityStep(quantity), 2)

export const getQuantityStep = (quant: number): number =>
  quant <= 0.01
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
