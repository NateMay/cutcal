import { KVP } from '@cutcal/core'
import { Food, Portion, Usage } from '@cutcal/diet'
import { multiplyNutrition, Nutrient, Nutrition } from '@cutcal/nutrition'
import * as _ from 'lodash'

/**
 * @source {@link https://github.com/ben-ng/convert-units}
 * @note there are no typing for this library
 */

// FIXME (bad practice) import crrrectly
if (window) (window as any).global = window
declare const require: (moduleId: string) => any
// tslint:disable-next-line
const convert = require('convert-units')

/**
 * Adjusts the base food nutrition according the portion specified in the usage
 * @param {Usage} usage
 * @param {Food} food
 * @returns {Nutrition<number>}
 */
export function scaleNutrition(usage: Usage, food: Food): Nutrition<number> {
  const conversionFactor = getConversionFactor(usage, food)

  return multiplyNutrition(food.nutrition, conversionFactor)
}

/**
 * Will adjust the a nutrient on the food's stored nutrition
 *   according the portion specified in the usage
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

function getCompatibleFoodPortion(usage: Usage, food: Food): Portion {
  if (!food) throw new Error(`[CutCal] No food was provided for: ${usage}}`)

  const cacheKey = `${food._id}-${usage.unit}`

  if (portionCache[cacheKey]) return portionCache[cacheKey]

  if (!food.portions)
    throw new Error(
      `[CutCal] ${food.name} does not have portion information: ${food}}`
    )

  let fportion = food.portions[usage.unit]

  if (!fportion) {
    // console.warn(`${usage.unit} is not among the portion listed in ${food.name}`);

    const possibles = convert()
      .from(usage.unit)
      .possibilities()

    _.forEach(possibles, possibleUnit => {
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
    throw new Error(
      `[CutCal] ${food.name} portion can not be converted to "${usage.unit}"`
    )

  portionCache[cacheKey] = fportion

  return fportion
}

// TEST (convert)
/**
 * converts and adds a quantity to another
 * @example
 *   addPortion('g', 3000).to({ unit:'kg', quantity: 1 }) => 4 // (kg)
 */
export function addPortion(portionA: Portion) {
  return {
    to: (portionB: Portion): number =>
      portionB.quantity +
      convert(portionA.quantity)
        .from(safeUnit(portionA.unit))
        .to(safeUnit(portionB.unit)),
  }
}

const SAFE_UNIT_MAP: KVP<string> = {
  µg: 'mcg',
  tbsp: 'Tbs',
  tablespoon: 'Tbs',
  pound: 'lb',
}

/**
 * Converts unit string unsupported by {@link https://github.com/ben-ng/convert-units}
 * @param {string} unit the CutCal unit
 * @returns {string} the convert-units (npm) unit string
 */
function safeUnit(unit: string): string {
  return SAFE_UNIT_MAP[unit] || unit
}

/**
 * Gets all possible units which a unit can be converted to
 * @param {string} unit the CutCal unit
 */
export function possibilities(unit: string): string[] {
  return convert()
    .from(safeUnit(unit))
    .possibilities()
}

export function getAlternatePortions(portion: Portion): Portion[] {
  return possibilities(portion.unit).map(altUnit =>
    convert(portion.quantity)
      .from(safeUnit(portion.unit))
      .to(safeUnit(altUnit))
  )
}
