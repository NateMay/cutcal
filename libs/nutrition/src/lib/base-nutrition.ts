import { keys } from 'lodash'
import { Nutrient, Nutrition } from './nutrition'

/**
 * Returns a new, comprehensive nutrition object with zero values
 */

export const BASE_NUTRITION = <T>(value: T): Nutrition<T> => ({
  // ENERGY
  calories: value,
  kj: value,

  // CARBS
  carbohydrates: value,
  dietaryFiber: value,
  solubleFiber: value,
  insolubleFiber: value,
  starch: value,

  // / Sugars
  sugar: value,
  sucrose: value,
  glucose: value,
  fructose: value,
  lactose: value,
  maltose: value,
  galactose: value,
  addedSugar: value,
  sugarAlcohol: value,

  // FATS
  fat: value,

  // / Saturated
  saturatedFat: value,
  _4$0: value,
  _6$0: value,
  _8$0: value,
  _10$0: value,
  _12$0: value,
  _13$0: value,
  _14$0: value,
  _15$0: value,
  _16$0: value,
  _17$0: value,
  _18$0: value,
  _20$0: value,
  _22$0: value,
  _24$0: value,

  // / poly-unsaturated
  monoUnsaturated: value,
  _14$1: value,
  _15$1: value,
  _16$1Undif: value,
  _16$1c: value,
  _16$1t: value,
  _17$1: value,
  _18$1Undif: value,
  _18$1c: value,
  _18$1t: value,
  _18$1_11: value,
  _20$1: value,
  _22$1Undif: value,
  _22$1c: value,
  _22$1t: value,
  _24$1c: value,

  // / poly-unsaturated
  polyUnsaturated: value,
  _18$2Undif: value,
  _18$2n6: value,
  _18$2CLAs: value,
  _18$2t: value,
  _18$2i: value,
  _18$2tNFD: value,
  _18$3Undif: value,
  _18$3n3: value,
  _18$3n6: value,
  _18$3i: value,
  _18$4: value,
  _20$2n6: value,
  _20$3Undif: value,
  _20$3n3: value,
  _20$3n6: value,
  _20$4Undif: value,
  _20$4n6: value,
  _20$5n3: value,
  _21$5: value,
  _22$4: value,
  _22$5n3: value,
  _22$6n3: value,

  // / trans fat
  transUnsaturated: value,
  monoenoic: value,
  polyenoic: value,
  // omega3: value,
  // omega6: value,

  // PROTEIN
  protein: value,
  tryptophan: value,
  threonine: value,
  isoleucine: value,
  leucine: value,
  lysine: value,
  methionine: value,
  cystine: value,
  phenylalanine: value,
  tyrosine: value,
  valine: value,
  arginine: value,
  histidine: value,
  alanine: value,
  asparticAcid: value,
  glutamicAcid: value,
  glycine: value,
  proline: value,
  serine: value,
  hydroxyproline: value,

  // VITAMINS

  // / vitamin A
  vitA: value,
  retinol: value,
  retinolActivityEquiv: value,
  alphaCarotene: value,
  betaCarotene: value,
  betaCryptoxanthin: value,
  lycopene: value,
  luteinZeaxanthin: value,

  vitC: value,

  // / vitamin D
  vitD: value,
  d2: value,
  d3: value,
  d2and3: value,

  // / vitamin E
  vitE: value,
  betaTocopherol: value,
  gammaTocopherol: value,
  deltaTocopherol: value,
  vitEAdded: value,
  alphaTocotrienol: value,
  betaTocotrienol: value,
  gammaTocotrienol: value,
  deltaTocotrienol: value,

  vitK: value,
  dihydrophylloquinone: value,
  menaquinone4: value,
  thiamin: value,
  riboflavin: value,
  niacin: value,
  vitB6: value,

  // / Folate
  folate: value,
  foodFolate: value,
  folicAcid: value,
  dietaryFolateEquiv: value,

  vitB12: value,
  addedB12: value,
  biotin: value,
  iodine: value,
  pantothenicAcid: value,
  choline: value,
  betaine: value,

  // MINRALS
  calcium: value,
  iron: value,
  magnesium: value,
  phosphorus: value,
  potassium: value,
  sodium: value,
  zinc: value,
  copper: value,
  manganese: value,
  selenium: value,
  fluoride: value,
  // chromium: value,
  // molybdenum: value,
  // chloride: value,

  // STEROLS
  cholesterol: value,
  phytosterols: value,
  stigmasterol: value,
  campesterol: value,
  betaSitosterol: value,

  // OTHER
  alcohol: value,
  water: value,
  ash: value,
  caffeine: value,
  theobromine: value,

  // new
  nitrogen: value,
  aceticAcid: value,
  lacticAcid: value,
  sulfur: value,
  sorbitol: value,
  sugarsNLEA: value,
  xylitol: value,
  ribose: value,
  carbSum: value,
  carbOther: value,
  inositol: value,
  inulin: value,
  epigallocatechin: value,
  fatNLEA: value,
  chlorine: value,
  chromium: value,
  cobalt: value,
  molybdenum: value,
  calcifediol: value,
  phytoene: value,
  phytofluene: value,
  zeaxanthin: value,
  lutein: value,
  cisLuteinZeaxanthin: value,
  cisBetaCarotene: value,
  transBetaCarotene: value,
  transLycopene: value,
  cryptoxanthin: value,
  vitELabel: value,
  boron: value,
  cisLycopene: value,
  _5MethylTetrahydrofolate: value,
  _10FormylFolicAcid: value,
  _5FormyltetrahydrofolicAcid: value,
  cholineFree: value,
  cholinePhosphocholine: value,
  cholinePhosphotidyl: value,
  cholineGlycerophosphocholine: value,
  cholineSphingomyelin: value,
  cysteine: value,
  glutamine: value,
  taurine: value,
  dienoic: value,
  _22$02: value,
  _11$0: value,
  _14$1t: value,
  _20$3n9: value,
  _5$0: value,
  _7$0: value,
  _9$0: value,
  _21$0: value,
  _23$0: value,
  _12$1: value,
  _14$1c: value,
  _17$1c: value,
  _20$1c: value,
  _20$1t: value,
  _22$1n9: value,
  _22$1n11: value,
  _18$2c: value,
  _18$3c: value,
  _18$3t: value,
  _20$3c: value,
  _22$3: value,
  _20$4c: value,
  _20$5c: value,
  _22$5c: value,
  _22$6c: value,
  _20$2c: value,
  vitEAte: value,

  // gravity: value,
})

/**
 * @description Full Nutrition object with all zeros
 */
export const ZERO_NUTRITION = <Nutrition<number>>(
  Object.freeze(BASE_NUTRITION(0))
)

export const NUTRIENT_KEYS = keys(ZERO_NUTRITION) as Nutrient[]
