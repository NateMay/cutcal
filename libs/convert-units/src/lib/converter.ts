import { each, keys } from 'lodash'
import { uMass } from './mass'
import { MEASURES } from './measures'
import { Measure, MeasureBase, UnitDescription, UnitDetails, UnitMap, UnitSystem } from './unit-interfaces'
import { uVolume } from './volume'

/**
 * @see {@link https://github.com/ben-ng/convert-units}
 */

export type Unit = uMass | uVolume

interface ConvertOptions {
  exclude?: Unit[]
  cutOffNumber?: number
}
const BASE_OPTIONS = {
  exclude: [],
  cutOffNumber: 1,
}

interface ConversionDetails {
  abbr: Unit
  measure: Measure
  system: UnitSystem
  unit: UnitDetails
}

interface BestConvert {
  val: number
  unit: string
  singular: string
  plural: string
}

interface Description {
  abbr: Unit
  measure: Measure
  system: UnitSystem
  singular: string
  plural: string
}

const descriptor = (resp: ConversionDetails): Description => ({
  abbr: resp.abbr,
  measure: resp.measure,
  system: resp.system,
  singular: resp.unit.name.singular,
  plural: resp.unit.name.plural,
})

/**
 * Returns the abbreviated measures that the value can be
 * converted to.
 */

export const convert = (quantity: number = 1) => new UnitConverter(quantity)

export class UnitConverter {
  private originalQuantity: number
  private targetUnit: ConversionDetails
  private originalUnit: ConversionDetails

  constructor(quantity: number = 1) {
    this.originalQuantity = quantity
  }

  measures(): string[] {
    return keys(MEASURES)
  }

  /**
   * @description Lets the converter know the source unit abbreviation
   * @example
   *   convert(100).from('lb').('kg')
   */
  from(from: Unit): this {
    if (this.targetUnit) throw Error('.from() must be called before .to()')

    this.originalUnit = this.getUnit(from)

    if (!this.originalUnit) {
      this.throwUnsupportedUnitError(from)
    }

    return this
  }

  /**
   * @description Converts the unit and returns the value
   * @example
   *   convert(100).from('lb').('kg')
   */
  to(to: Unit): number {
    if (!this.originalUnit) throw Error('.to must be called after .from')

    this.targetUnit = this.getUnit(to)

    let result

    if (!this.targetUnit) {
      this.throwUnsupportedUnitError(to)
    }

    // Don't change the value if origin and destination are the same
    if (this.originalUnit.abbr === this.targetUnit.abbr) {
      return this.originalQuantity
    }

    // You can't go from liquid to mass, for example
    if (this.targetUnit.measure != this.originalUnit.measure) {
      throw Error(
        `[CutCal] Cannot convert incompatible measures of ${this.targetUnit.measure} and ${this.originalUnit.measure}`
      )
    }

    /**
     * Convert from the source value to its anchor inside the system
     */
    result = this.originalQuantity * this.originalUnit.unit.toAnchor

    /**
     * Convert from one system to another through the anchor ratio.
     */
    if (this.originalUnit.system != this.targetUnit.system) {
      result *=
        MEASURES[this.originalUnit.measure]._anchors[this.originalUnit.system]
          .ratio
    }

    /**
     * Convert to another unit inside the destination system
     */
    return result / this.targetUnit.unit.toAnchor
  }

  /**
   * @description Converts the unit to the best available unit.
   */
  toBest(newOptions: ConvertOptions): BestConvert {
    if (!this.originalUnit) throw Error('.toBest must be called after .from')

    const options: ConvertOptions = Object.assign(BASE_OPTIONS, newOptions)

    let best
    /**
     * Looks through every possibility for the 'best' available unit.
     * i.e. Where the value has the fewest numbers before the decimal point,
     * but is still higher than 1.
     */
    each(this.possibilities(), possibility => {
      const unit = this.describe(possibility)
      const isIncluded = options.exclude.includes(possibility)

      if (isIncluded && unit.system === this.originalUnit.system) {
        const result = this.to(possibility)
        if (!best || (result >= options.cutOffNumber && result < best.val)) {
          best = {
            val: result,
            unit: possibility,
            singular: unit.singular,
            plural: unit.plural,
          }
        }
      }
    })

    return best
  }

  getUnit(abbr: Unit): ConversionDetails {
    let found: ConversionDetails

    each(MEASURES, (systems: MeasureBase, measure: Measure) => {
      each(systems, (units: UnitMap, system: UnitSystem | '_anchors') => {
        if (system == '_anchors') return false

        each(units, (unit: UnitDetails, testAbbr: Unit) => {
          if (testAbbr == abbr) {
            found = {
              abbr,
              measure,
              system,
              unit,
            }
          }
        })
      })
    })

    return found
  }

  describe(abbr: Unit): UnitDescription {
    const resp = this.getUnit(abbr)
    let desc = null

    try {
      desc = descriptor(resp)
    } catch (err) {
      this.throwUnsupportedUnitError(abbr)
    }

    return desc
  }

  // list(measure) {
  //   let list = []

  //   each(MEASURES, (systems, testMeasure) => {
  //     if (measure && measure !== testMeasure) return

  //     each(systems, (units, system) => {
  //       if (system == '_anchors') return false

  //       each(units, (unit, abbr) => {
  //         list = list.concat(
  //           descriptor({
  //             abbr,
  //             measure: testMeasure,
  //             system,
  //             unit,
  //           })
  //         )
  //       })
  //     })
  //   })

  //   return list
  // }

  throwUnsupportedUnitError = what => {
    let validUnits = []

    each(MEASURES, (systems, measure) => {
      each(systems, (units, system) => {
        if (system == '_anchors') return false

        validUnits = validUnits.concat(keys(units))
      })
    })

    throw Error(
      'Unsupported unit ' + what + ', use one of: ' + validUnits.join(', ')
    )
  }

  /**
   *
   * @param measure
   */
  possibilities(measure?: Measure): Unit[] {
    let possibilities = []

    if (!this.originalUnit && !measure) {
      each(keys(MEASURES), meas => {
        each(MEASURES[meas], (units, system) => {
          if (system !== '_anchors')
            possibilities = possibilities.concat(keys(units))
        })
      })
    } else {
      measure = measure || this.originalUnit.measure

      each(MEASURES[measure], (units, system) => {
        if (system !== '_anchors')
          possibilities = possibilities.concat(keys(units))
      })
    }

    return possibilities
  }
}
