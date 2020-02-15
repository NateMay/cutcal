import { KVP } from '@cutcal/core'
import * as _ from 'lodash'

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
  return _.keyBy(
    _.map(
      units,
      (X, unit) =>
        ({
          unit,
          type: _.get(previous, `${unit}.type`) || 'column',
          valueStacked: _.get(previous, `${unit}.valueStacked`) || false,
          percentStacked: _.get(previous, `${unit}.percentStacked`) || false,
        } as ChartControls)
    ),
    'unit'
  )
}
