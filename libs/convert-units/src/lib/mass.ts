import { MeasureBase, UnitMap } from './unit-interfaces'

export type uMass = 'mcg' | 'mg' | 'g' | 'kg' | 'oz' | 'lb' | 'mt' | 't'

const metric: UnitMap = {
  mcg: {
    name: {
      singular: 'Microgram',
      plural: 'Micrograms'
    },
    toAnchor: 1 / 1000000
  },
  mg: {
    name: {
      singular: 'Milligram',
      plural: 'Milligrams'
    },
    toAnchor: 1 / 1000
  },
  g: {
    name: {
      singular: 'Gram',
      plural: 'Grams'
    },
    toAnchor: 1
  },
  kg: {
    name: {
      singular: 'Kilogram',
      plural: 'Kilograms'
    },
    toAnchor: 1000
  },
  mt: {
    name: {
      singular: 'Metric Tonne',
      plural: 'Metric Tonnes'
    },
    toAnchor: 1000000
  }
}

const imperial: UnitMap = {
  oz: {
    name: {
      singular: 'Ounce',
      plural: 'Ounces'
    },
    toAnchor: 1 / 16
  },
  lb: {
    name: {
      singular: 'Pound',
      plural: 'Pounds'
    },
    toAnchor: 1
  },
  t: {
    name: {
      singular: 'Ton',
      plural: 'Tons'
    },
    toAnchor: 2000
  }
}

export const MASS: MeasureBase = {
  metric,
  imperial,
  _anchors: {
    metric: {
      unit: 'g',
      ratio: 1 / 453.592
    },
    imperial: {
      unit: 'lb',
      ratio: 453.592
    }
  }
}
