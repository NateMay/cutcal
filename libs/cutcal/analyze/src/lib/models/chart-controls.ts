import { KVP } from '@cutcal/core'
import { get, keyBy, map } from 'lodash'

export type ChartType = 'line' | 'column' | 'bar'

/**
 * This is a object that contains all information related to the mini
 * form associated with a chart including stacking, chart type, etc.
 */
export interface ChartControls {
  type: ChartType
  valueStacked: boolean
  percentStacked: boolean
  unit: string
}

export function updateControls(
  units: KVP<any>,
  previous?: KVP<ChartControls>
): KVP<ChartControls> {
  return keyBy(
    map(
      units,
      (X, unit) =>
        ({
          unit,
          type: get(previous, `${unit}.type`) || 'column',
          valueStacked: get(previous, `${unit}.valueStacked`) || false,
          percentStacked: get(previous, `${unit}.percentStacked`) || false,
        } as ChartControls)
    ),
    'unit'
  )
}
