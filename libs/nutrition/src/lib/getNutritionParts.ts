import {
  AminoAcids,
  Carbohydrates,
  Energy,
  Fats,
  Folate,
  Minerals,
  MonoUnsaturated,
  Nutrition,
  Omega3,
  Omega6,
  Others,
  PolyUnsaturated,
  Protein,
  ProteinQuality,
  SaturatedFat,
  Sterols,
  Sugars,
  TransUnsaturated,
  VitaminA,
  VitaminD,
  VitaminE,
  Vitamins
} from './nutrition'
// TEST (NutritionParts)

/**
 * Holds a breakdown of a nutrition object into logical groupings
 */
export interface NutritionParts<T> {
  gravity?: T
  energy: Energy<T>
  carbBase: Partial<Carbohydrates<T>>
  sugars: Sugars<T>
  carbs: Carbohydrates<T>
  satFat: SaturatedFat<T>
  monoFat: MonoUnsaturated<T>
  polyFat: PolyUnsaturated<T>
  transFat: TransUnsaturated<T>
  fatBase: Partial<Fats<T>>
  fat: Fats<T>
  proteinBase: Partial<Protein<T>>
  protein: Protein<T>
  aminoAcids: AminoAcids<T>
  vitA: VitaminA<T>
  vitD: VitaminD<T>
  vitE: VitaminE<T>
  folate: Folate<T>
  vitaminBase: Partial<Vitamins<T>>
  vitamins: Vitamins<T>
  minerals: Minerals<T>
  sterols: Sterols<T>
  others: Others<T>
}

// ************ //
// ** Energy ** //
// ************ //

export const getEnergy = <T>(nutr: Nutrition<T>): Energy<T> => ({
  calories: nutr.calories,
  kj: nutr.kj
})

// ******************* //
// ** Carbohydrates ** //
// ******************* //

// TODO (chart) Glycymic load https://nutritiondata.self.com/help/estimated-glycemic-load

export const getSugars = <T>(nutr: Nutrition<T>): Sugars<T> => ({
  sucrose: nutr.sucrose,
  glucose: nutr.glucose,
  fructose: nutr.fructose,
  lactose: nutr.lactose,
  maltose: nutr.maltose,
  galactose: nutr.galactose,
  addedSugar: nutr.addedSugar,
  sugarAlcohol: nutr.sugarAlcohol,
  xylitol: nutr.xylitol,
  sorbitol: nutr.sorbitol,
  ribose: nutr.ribose,
  sugarsNLEA: nutr.sugarsNLEA
})

export const getBaseCarbohydrates = <T>(
  nutr: Nutrition<T>
): Partial<Carbohydrates<T>> => ({
  carbohydrates: nutr.carbohydrates,
  dietaryFiber: nutr.dietaryFiber,
  solubleFiber: nutr.solubleFiber,
  insolubleFiber: nutr.insolubleFiber,
  starch: nutr.starch,
  sugar: nutr.sugar,
  carbSum: nutr.carbSum,
  carbOther: nutr.carbOther,
  inulin: nutr.inulin,
  epigallocatechin: nutr.epigallocatechin
})

export const getCarbohydrates = <T>(nutr: Nutrition<T>): Carbohydrates<T> => ({
  ...getBaseCarbohydrates(nutr),
  ...getSugars(nutr)
})

// ********** //
// ** Fats ** //
// ********** //

export const getSaturatedFat = <T>(nutr: Nutrition<T>): SaturatedFat<T> => ({
  _4$0: nutr._4$0,
  _6$0: nutr._6$0,
  _8$0: nutr._8$0,
  _10$0: nutr._10$0,
  _12$0: nutr._12$0,
  _13$0: nutr._13$0,
  _14$0: nutr._14$0,
  _15$0: nutr._15$0,
  _16$0: nutr._16$0,
  _17$0: nutr._17$0,
  _18$0: nutr._18$0,
  _20$0: nutr._20$0,
  _22$0: nutr._22$0,
  _24$0: nutr._24$0,
  _5$0: nutr._5$0,
  _7$0: nutr._7$0,
  _9$0: nutr._9$0,
  _11$0: nutr._11$0,
  _12$1: nutr._12$1,
  _23$0: nutr._23$0
})

export const getMonoUnsaturated = <T>(
  nutr: Nutrition<T>
): MonoUnsaturated<T> => ({
  _14$1: nutr._14$1,
  _15$1: nutr._15$1,
  _16$1Undif: nutr._16$1Undif,
  _16$1c: nutr._16$1c,
  _16$1t: nutr._16$1t,
  _17$1: nutr._17$1,
  _18$1Undif: nutr._18$1Undif,
  _18$1c: nutr._18$1c,
  _18$1t: nutr._18$1t,
  _18$1_11: nutr._18$1_11,
  _20$1: nutr._20$1,
  _22$1Undif: nutr._22$1Undif,
  _22$1c: nutr._22$1c,
  _22$1t: nutr._22$1t,
  _24$1c: nutr._24$1c,
  _14$1t: nutr._14$1t,
  _14$1c: nutr._14$1c,
  _17$1c: nutr._17$1c,
  _20$1c: nutr._20$1c,
  _20$1t: nutr._20$1t,
  _22$02: nutr._22$02
})

export const getPolyUnsaturated = <T>(
  nutr: Nutrition<T>
): PolyUnsaturated<T> => ({
  _18$2Undif: nutr._18$2Undif,
  _18$2n6: nutr._18$2n6,
  _18$2CLAs: nutr._18$2CLAs,
  _18$2t: nutr._18$2t,
  _18$2i: nutr._18$2i,
  _18$2tNFD: nutr._18$2tNFD,
  _18$3Undif: nutr._18$3Undif,
  _18$3n3: nutr._18$3n3,
  _18$3n6: nutr._18$3n6,
  _18$3i: nutr._18$3i,
  _18$4: nutr._18$4,
  _20$2n6: nutr._20$2n6,
  _20$3Undif: nutr._20$3Undif,
  _20$3n3: nutr._20$3n3,
  _20$3n6: nutr._20$3n6,
  _20$4Undif: nutr._20$4Undif,
  _20$4n6: nutr._20$4n6,
  _20$5n3: nutr._20$5n3,
  _21$5: nutr._21$5,
  _22$4: nutr._22$4,
  _22$5n3: nutr._22$5n3,
  _22$6n3: nutr._22$6n3,
  _18$2c: nutr._18$2c,
  _18$3c: nutr._18$3c,
  _18$3t: nutr._18$3t,
  _20$2c: nutr._20$2c,
  _20$3c: nutr._20$3c,
  _20$3n9: nutr._20$3n9,
  _20$4c: nutr._20$4c,
  _20$5c: nutr._20$5c,
  _21$0: nutr._21$0,
  _22$1n9: nutr._22$1n9,
  _22$1n11: nutr._22$1n11,
  _22$3: nutr._22$3,
  _22$5c: nutr._22$5c,
  _22$6c: nutr._22$6c
})

export const getOmega3 = <T>(nutr: Nutrition<T>): Omega3<T> => ({
  _18$3n3: nutr._18$3n3,
  _20$3n3: nutr._20$3n3,
  _20$5n3: nutr._20$5n3,
  _22$6n3: nutr._22$6n3,
  _22$5n3: nutr._22$5n3,
  _21$5: nutr._21$5
})

export const getOmega6 = <T>(nutr: Nutrition<T>): Omega6<T> => ({
  _18$2n6: nutr._18$2n6,
  _18$3n6: nutr._18$3n6,
  _20$2n6: nutr._20$2n6,
  _20$3n6: nutr._20$3n6,
  _20$4n6: nutr._20$4n6
})

export const getTransUnsaturated = <T>(
  nutr: Nutrition<T>
): TransUnsaturated<T> => ({
  monoenoic: nutr.monoenoic,
  polyenoic: nutr.polyenoic
})

export const getBaseFats = <T>(nutr: Nutrition<T>): Partial<Fats<T>> => ({
  fat: nutr.fat,
  fatNLEA: nutr.fatNLEA,
  saturatedFat: nutr.saturatedFat,
  polyUnsaturated: nutr.polyUnsaturated,
  monoUnsaturated: nutr.monoUnsaturated,
  transUnsaturated: nutr.transUnsaturated
})

export const getFats = <T>(nutr: Nutrition<T>): Fats<T> => ({
  ...getBaseFats(nutr),
  ...getSaturatedFat(nutr),
  ...getMonoUnsaturated(nutr),
  ...getPolyUnsaturated(nutr),
  ...getTransUnsaturated(nutr)
})

// ************* //
// ** Protein ** //
// ************* //

// TODO (charts) create a chart like this: https://nutritiondata.self.com/help/analysis-help#protein-quality
export const getProteinQuality = (
  nutr: Nutrition<number>
): ProteinQuality<number> => ({
  tryptophan: nutr.tryptophan,
  threonine: nutr.threonine,
  isoleucine: nutr.isoleucine,
  leucine: nutr.leucine,
  lysine: nutr.lysine,
  methionineCystine: nutr.methionine + nutr.cystine,
  phenylalanineTyrosine: nutr.phenylalanine + nutr.tyrosine,
  valine: nutr.valine,
  histidine: nutr.histidine
})

export const getAminoAcids = <T>(nutr: Nutrition<T>): AminoAcids<T> => ({
  tryptophan: nutr.tryptophan,
  threonine: nutr.threonine,
  isoleucine: nutr.isoleucine,
  leucine: nutr.leucine,
  lysine: nutr.lysine,
  methionine: nutr.methionine,
  cystine: nutr.cystine,
  phenylalanine: nutr.phenylalanine,
  tyrosine: nutr.tyrosine,
  valine: nutr.valine,
  arginine: nutr.arginine,
  histidine: nutr.histidine,
  alanine: nutr.alanine,
  asparticAcid: nutr.asparticAcid,
  glutamicAcid: nutr.glutamicAcid,
  glycine: nutr.glycine,
  proline: nutr.proline,
  serine: nutr.serine,
  hydroxyproline: nutr.hydroxyproline,
  cysteine: nutr.cysteine,
  glutamine: nutr.glutamine,
  taurine: nutr.taurine,
  dienoic: nutr.dienoic
})

export const getBaseProtein = <T>(nutr: Nutrition<T>): Protein<T> => ({
  protein: nutr.protein
})

export const getProtein = <T>(nutr: Nutrition<T>): Protein<T> => ({
  protein: nutr.protein,
  ...getAminoAcids(nutr)
})

// ************** //
// ** Vitamins ** //
// ************** //

export const getVitaminA = <T>(nutr: Nutrition<T>): VitaminA<T> => ({
  retinol: nutr.retinol,
  retinolActivityEquiv: nutr.retinolActivityEquiv,
  alphaCarotene: nutr.alphaCarotene,
  betaCarotene: nutr.betaCarotene,
  betaCryptoxanthin: nutr.betaCryptoxanthin,
  lycopene: nutr.lycopene,
  luteinZeaxanthin: nutr.luteinZeaxanthin,
  cisLycopene: nutr.cisLycopene,
  zeaxanthin: nutr.zeaxanthin,
  lutein: nutr.lutein,
  cisLuteinZeaxanthin: nutr.cisLuteinZeaxanthin,
  cisBetaCarotene: nutr.cisBetaCarotene,
  transBetaCarotene: nutr.transBetaCarotene,
  transLycopene: nutr.transLycopene,
  cryptoxanthin: nutr.cryptoxanthin
})

export const getVitaminD = <T>(nutr: Nutrition<T>): VitaminD<T> => ({
  d2: nutr.d2,
  d3: nutr.d3,
  d2and3: nutr.d2and3,
  calcifediol: nutr.calcifediol
})

export const getVitaminE = <T>(nutr: Nutrition<T>): VitaminE<T> => ({
  betaTocopherol: nutr.betaTocopherol,
  gammaTocopherol: nutr.gammaTocopherol,
  deltaTocopherol: nutr.deltaTocopherol,
  vitEAdded: nutr.vitEAdded,
  alphaTocotrienol: nutr.alphaTocotrienol,
  betaTocotrienol: nutr.betaTocotrienol,
  gammaTocotrienol: nutr.gammaTocotrienol,
  deltaTocotrienol: nutr.deltaTocotrienol,
  vitELabel: nutr.vitELabel,
  vitEAte: nutr.vitEAte
})

export const getFolate = <T>(nutr: Nutrition<T>): Folate<T> => ({
  foodFolate: nutr.foodFolate,
  folicAcid: nutr.folicAcid,
  dietaryFolateEquiv: nutr.dietaryFolateEquiv
})

export const getBaseVitamins = <T>(
  nutr: Nutrition<T>
): Partial<Vitamins<T>> => ({
  vitA: nutr.vitA,
  vitC: nutr.vitC,
  vitD: nutr.vitD,
  vitE: nutr.vitE,
  vitK: nutr.vitK,
  dihydrophylloquinone: nutr.dihydrophylloquinone,
  menaquinone4: nutr.menaquinone4,
  thiamin: nutr.thiamin,
  riboflavin: nutr.riboflavin,
  niacin: nutr.niacin,
  folate: nutr.folate,
  vitB6: nutr.vitB6,
  vitB12: nutr.vitB12,
  addedB12: nutr.addedB12,
  biotin: nutr.biotin,
  iodine: nutr.iodine,
  pantothenicAcid: nutr.pantothenicAcid,
  choline: nutr.choline,
  betaine: nutr.betaine,
  phytoene: nutr.phytoene,
  phytofluene: nutr.phytofluene,
  inositol: nutr.inositol,
  _5MethylTetrahydrofolate: nutr._5MethylTetrahydrofolate,
  _10FormylFolicAcid: nutr._10FormylFolicAcid,
  _5FormyltetrahydrofolicAcid: nutr._5FormyltetrahydrofolicAcid,
  cholineFree: nutr.cholineFree,
  cholinePhosphocholine: nutr.cholinePhosphocholine,
  cholinePhosphotidyl: nutr.cholinePhosphotidyl,
  cholineGlycerophosphocholine: nutr.cholineGlycerophosphocholine,
  cholineSphingomyelin: nutr.cholineSphingomyelin
})

export const getVitamins = <T>(nutr: Nutrition<T>): Vitamins<T> => ({
  ...getBaseVitamins(nutr),
  ...getFolate(nutr),
  ...getVitaminA(nutr),
  ...getVitaminE(nutr),
  ...getVitaminD(nutr)
})

// ************** //
// ** Minerals ** //
// ************** //

export const getMinerals = <T>(nutr: Nutrition<T>): Minerals<T> => ({
  nitrogen: nutr.nitrogen,
  calcium: nutr.calcium,
  iron: nutr.iron,
  magnesium: nutr.magnesium,
  phosphorus: nutr.phosphorus,
  potassium: nutr.potassium,
  sodium: nutr.sodium,
  zinc: nutr.zinc,
  copper: nutr.copper,
  manganese: nutr.manganese,
  selenium: nutr.selenium,
  fluoride: nutr.fluoride,
  molybdenum: nutr.molybdenum,
  chlorine: nutr.chlorine,
  chromium: nutr.chromium,
  cobalt: nutr.cobalt,
  boron: nutr.boron
})

export const getSterols = <T>(nutr: Nutrition<T>): Sterols<T> => ({
  cholesterol: nutr.cholesterol,
  phytosterols: nutr.phytosterols,
  stigmasterol: nutr.stigmasterol,
  campesterol: nutr.campesterol,
  betaSitosterol: nutr.betaSitosterol
})

export const getOthers = <T>(nutr: Nutrition<T>): Others<T> => ({
  alcohol: nutr.alcohol,
  water: nutr.water,
  ash: nutr.ash,
  caffeine: nutr.caffeine,
  theobromine: nutr.theobromine,
  aceticAcid: nutr.aceticAcid,
  lacticAcid: nutr.lacticAcid,
  sulfur: nutr.sulfur
})

/**
 * @description Breaks a nutrition object into logical groupings
 * @param {Nutrition<T>} nutr
 */

export const getNutritionParts = <T>(
  nutr: Nutrition<T>
): NutritionParts<T> => ({
  gravity: nutr.gravity,
  energy: getEnergy(nutr),
  carbBase: getBaseCarbohydrates(nutr),
  sugars: getSugars(nutr),
  carbs: getCarbohydrates(nutr),
  satFat: getSaturatedFat(nutr),
  monoFat: getMonoUnsaturated(nutr),
  polyFat: getPolyUnsaturated(nutr),
  transFat: getTransUnsaturated(nutr),
  fat: getFats(nutr),
  fatBase: getBaseFats(nutr),
  protein: getProtein(nutr),
  proteinBase: getBaseProtein(nutr),
  aminoAcids: getAminoAcids(nutr),
  vitA: getVitaminA(nutr),
  vitD: getVitaminD(nutr),
  vitE: getVitaminE(nutr),
  folate: getFolate(nutr),
  vitaminBase: getBaseVitamins(nutr),
  vitamins: getVitamins(nutr),
  minerals: getMinerals(nutr),
  sterols: getSterols(nutr),
  others: getOthers(nutr)
})
