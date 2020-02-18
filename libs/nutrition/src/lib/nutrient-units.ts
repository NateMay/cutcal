// TODO (move) into a unitsMetadata class like the nutrientsMetaData
export interface NutrientUnitLookup {
  g: string
  kcal: string
  mg: string
  µg: string
  iu: string
  kj: string
}

export const NUTRIENT_UNIT_LOOKUP: NutrientUnitLookup = {
  g: 'Grams',
  kcal: 'Calories',
  mg: 'Milligrams',
  µg: 'Micrograms',
  iu: 'International Units',
  kj: 'Kilojoules',
}

export type NutrientUnit = keyof NutrientUnitLookup
