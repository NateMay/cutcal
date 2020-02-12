/**
 * Root-most interface for the USDA API
 * @source {@link https://ndb.nal.usda.gov/ndb/doc/apilist/API-FOOD-REPORT.md}
 */

export interface USDAResponse {
  report: USDAReport
}

export interface USDAReport {
  food: USDAFood
  footnotes?: USDAFootnote[]
  sources?: USDASource[]
  langual?: USDALangual[]
  sr?: string
  type?: string
}
export interface USDAFootnote {
  id: string
  desc: string
}
export interface USDALangual {
  id: string
  desc: string
}
export interface USDASource {
  id: number
  authors: string
  iss: string
  title: string
  vol: string
  year: string
}

/**
 * USDA interface for a Food
 * @source {@link https://ndb.nal.usda.gov/ndb/doc/apilist/API-FOOD-REPORT.md}
 */
export interface USDAFood {
  ndbno: string
  name: string
  sd: string // short description
  fg: string // food group
  sn: string // scientfic name
  cn: string // commerical name
  manu: string // manufaturer
  nf: number // nitrogen Factor
  cf: number // carb factor
  ff: number // fat factor
  pf: number // protein factor
  r: string // refuse
  rd: string // refuse description
  ds: string // usda database source: 'Branded Food Products' or 'Standard Reference'
  ru: string // reporting unit
  nutrients: USDANutrient[]
  // ingredients - Branded Food Products only
}

export interface USDANutrient {
  nutrient_id: number
  name: string
  unit: string
  value: number
  measures: USDAMeasure[]
  dp?: number | string
  se?: string
  derivation?: string
  group?: string
  sourcecode?: number[] | string
}
export interface USDAMeasure {
  label: string
  eqv: number
  eunit: string
  qty: number
  value: number
}

export class UsdaNonScalars {
  source?: string
  scientific_name?: string
  commercial_name?: string
  manufacturer?: string
  nitrogen_factor?: number
  carb_factor?: number
  fat_factor?: number
  protein_factor?: number
  refuse_perc?: number
  refuse_desc?: string
}

export function newNonScaler(usdaFood: USDAFood): UsdaNonScalars {
  return {
    source: usdaFood.ds,
    scientific_name: usdaFood.sn,
    commercial_name: usdaFood.cn,
    manufacturer: usdaFood.manu,
    nitrogen_factor: usdaFood.nf,
    carb_factor: usdaFood.cf,
    fat_factor: usdaFood.ff,
    protein_factor: usdaFood.pf,
    refuse_perc: parseFloat(usdaFood.r) / 100.0,
    refuse_desc: usdaFood.rd,
  }
}
