import { KVP } from '@cutcal/core'
import { Food, Portion, Usage } from '@cutcal/diet'
import { multiplyNutrition, Nutrient, Nutrition } from '@cutcal/nutrition'
/**
 * @see {@link https://github.com/ben-ng/convert-units}
 * There are no typing for this library
 */
// if (window) (window as any).global = window
// declare const require: (moduleId: string) => any
// const convert = require('convert-units')
import * as convert from 'convert-units'
import { forEach } from 'lodash'

/**
 * @description Adjusts the base food nutrition according the portion specified in the usage
 * @param {Usage} usage
 * @param {Food} food
 * @returns {Nutrition<number>}
 */
export function scaleNutrition(usage: Usage, food: Food): Nutrition<number> {
  const conversionFactor = getConversionFactor(usage, food)

  return multiplyNutrition(food.nutrition, conversionFactor)
}

/**
 * @description Will adjust the a nutrient on the food's stored nutrition
 * according the portion specified in the usage
 *
 * @param {Usage} usage
 * @param {Food} food
 * @param {string} nutrient property name of the nutrient
 * @returns {number}
 */
export function scaleNutrient(
  usage: Usage,
  food: Food,
  nutrient: Nutrient
): number {
  const conversionFactor = getConversionFactor(usage, food)
  return (food.nutrition[nutrient] || 0) * conversionFactor
}

function getConversionFactor(usage: Usage, food: Food): number {
  const fPortion = getCompatibleFoodPortion(usage, food)

  const unitConvertion = getUnitConvertionFactor(usage, fPortion)

  const quantityConversion = usage.quantity * fPortion.quantity

  return quantityConversion * unitConvertion
}

function getUnitConvertionFactor(usage: Usage, fPortion: Portion): number {
  const fUnit = safeUnit(fPortion.unit)
  const uUnit = safeUnit(usage.unit)

  return fUnit == uUnit
    ? 1
    : convert(1)
        .from(fUnit)
        .to(uUnit)
}

const portionCache: KVP<Portion> = {}

function getCompatibleFoodPortion(usage: Usage, food: Food): Portion | never {
  if (!food) throw Error(`[CutCal] No food was provided for: ${usage}}`)

  const cacheKey = `${food._id}-${usage.unit}`

  if (portionCache[cacheKey]) return portionCache[cacheKey]

  if (!food.portions)
    throw Error(
      `[CutCal] ${food.name} does not have portion information: ${food}}`
    )

  let fportion = food.portions[usage.unit]

  if (!fportion) {
    // console.warn(`${usage.unit} is not among the portion listed in ${food.name}`);

    const possibles = convert()
      .from(usage.unit)
      .possibilities()

    forEach(possibles, possibleUnit => {
      const alternative = food.portions[possibleUnit]

      if (alternative) {
        // console.log(`${usage.unit} can be converted to ${possibleUnit}`);

        fportion = {
          unit: usage.unit,
          quantity: convert(alternative.quantity)
            .from(safeUnit(alternative.unit))
            .to(safeUnit(usage.unit)),
        }
      }
    })
  }

  if (!fportion)
    throw Error(
      `[CutCal] ${food.name} portion can not be converted to "${usage.unit}"`
    )

  portionCache[cacheKey] = fportion

  return fportion
}

// TEST (convert)
interface PortionAdder {
  to: (portionB: Portion) => number
}
/**
 * @description converts and adds a quantity to another
 * @example
 *   addPortion('g', 3000).to({ unit:'kg', quantity: 1 }) => 4 // (kg)
 */
export const addPortion = (portionA: Portion): PortionAdder => ({
  to: (portionB: Portion): number =>
    portionB.quantity +
    convert(portionA.quantity)
      .from(safeUnit(portionA.unit))
      .to(safeUnit(portionB.unit)),
})

const SAFE_UNIT_MAP: KVP<string> = {
  µg: 'mcg',
  tbsp: 'Tbs',
  tablespoon: 'Tbs',
  pound: 'lb',
}

/**
 * @description Converts unit string unsupported by {@link https://github.com/ben-ng/convert-units}
 * @param {string} unit the CutCal unit
 * @returns {string} the convert-units (npm) unit string
 */
const safeUnit = (unit: string): string => SAFE_UNIT_MAP[unit] || unit

/**
 * @description Gets all possible units which a unit can be converted to
 * @param {string} unit the CutCal unit
 */
export const possibilities = (unit: string): string[] =>
  convert()
    .from(safeUnit(unit))
    .possibilities()

export const getAlternatePortions = (portion: Portion): Portion[] =>
  possibilities(portion.unit).map(altUnit =>
    convert(portion.quantity)
      .from(safeUnit(portion.unit))
      .to(safeUnit(altUnit))
  )
