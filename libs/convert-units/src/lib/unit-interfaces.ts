export type UnitSystem = 'metric' | 'imperial'

export interface UnitDetails {
  name: UnitDescription
  toAnchor: number
}
export interface UnitDescription {
  singular: string
  plural: string
  system?: UnitSystem
}
export interface UnitMap {
  [key: string]: UnitDetails
}


interface MeasureAnchors {
  metric: MeasureAnchor
  imperial: MeasureAnchor
}
export interface MeasureAnchor {
  unit: string
  ratio: number
}

export interface MeasureBase {
  metric: UnitMap
  imperial: UnitMap
  _anchors: MeasureAnchors
}
export type MeasureBaseKey = keyof MeasureBase

export interface MeasureBases {
  mass: MeasureBase
  volume: MeasureBase
}

export type Measure = keyof MeasureBases

