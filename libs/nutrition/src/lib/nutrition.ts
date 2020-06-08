// ************ //
// ** Energy ** //
// ************ //

export interface Energy<T> {
  calories?: T
  kj?: T
}

// ******************* //
// ** Carbohydrates ** //
// ******************* //

export interface Sugars<T> {
  sucrose?: T
  glucose?: T
  fructose?: T
  lactose?: T
  maltose?: T
  galactose?: T
  addedSugar?: T
  sugarAlcohol?: T
  xylitol?: T
  sorbitol?: T
  ribose?: T
  sugarsNLEA?: T
}

export interface Carbohydrates<T> extends Sugars<T> {
  carbohydrates?: T
  dietaryFiber?: T
  solubleFiber?: T
  insolubleFiber?: T
  starch?: T
  sugar?: T
  carbSum?: T
  carbOther?: T
  inulin?: T
  epigallocatechin?: T
}

// ********** //
// ** Fats ** //
// ********** //

export interface SaturatedFat<T> {
  _4$0?: T
  _5$0?: T
  _6$0?: T
  _7$0?: T
  _8$0?: T
  _9$0?: T
  _10$0?: T
  _11$0?: T
  _12$0?: T
  _12$1?: T
  _13$0?: T
  _14$0?: T
  _15$0?: T
  _16$0?: T
  _17$0?: T
  _18$0?: T
  _20$0?: T
  _22$0?: T
  _23$0?: T
  _24$0?: T
}

export interface MonoUnsaturated<T> {
  _14$1?: T
  _14$1t?: T
  _14$1c?: T
  _15$1?: T
  _16$1Undif?: T
  _16$1c?: T
  _16$1t?: T
  _17$1?: T
  _17$1c?: T
  _18$1Undif?: T
  _18$1c?: T
  _18$1t?: T
  _18$1_11?: T
  _20$1?: T
  _20$1c?: T
  _20$1t?: T
  _22$02?: T
  _22$1Undif?: T
  _22$1c?: T
  _22$1t?: T
  _24$1c?: T
}

export interface PolyUnsaturated<T> {
  _18$2Undif?: T
  _18$2n6?: T
  _18$2CLAs?: T
  _18$2t?: T
  _18$2i?: T
  _18$2tNFD?: T
  _18$2c?: T
  _18$3c?: T
  _18$3t?: T
  _18$3Undif?: T
  _18$3n3?: T
  _18$3n6?: T
  _18$3i?: T
  _18$4?: T
  _20$2c?: T
  _20$2n6?: T
  _20$3c?: T
  _20$3Undif?: T
  _20$3n3?: T
  _20$3n6?: T
  _20$3n9?: T
  _20$4c?: T
  _20$4Undif?: T
  _20$4n6?: T
  _20$5n3?: T
  _20$5c?: T
  _21$0?: T
  _21$5?: T
  _22$1n9?: T
  _22$1n11?: T
  _22$3?: T
  _22$4?: T
  _22$5c?: T
  _22$5n3?: T
  _22$6c?: T
  _22$6n3?: T
}

export interface Omega3<T> {
  _18$3n3?: T
  _20$3n3?: T
  _20$5n3?: T
  _22$6n3?: T
  _22$5n3?: T
  _21$5?: T
}
export interface Omega6<T> {
  _18$2n6?: T
  _18$3n6?: T
  _20$2n6?: T
  _20$3n6?: T
  _20$4n6?: T
}

export interface TransUnsaturated<T> {
  monoenoic?: T
  polyenoic?: T
}

export interface Fats<T>
  extends SaturatedFat<T>,
    MonoUnsaturated<T>,
    PolyUnsaturated<T>,
    TransUnsaturated<T> {
  fat?: T
  fatNLEA?: T
  saturatedFat?: T
  polyUnsaturated?: T
  monoUnsaturated?: T
  transUnsaturated?: T
}

// ************* //
// ** Protein ** //
// ************* //

// Quality Protein has all 9
export interface ProteinQuality<T> {
  tryptophan?: T
  threonine?: T
  isoleucine?: T
  leucine?: T
  lysine?: T
  methionineCystine?: T
  phenylalanineTyrosine?: T
  valine?: T
  histidine?: T
}
export interface AminoAcids<T> {
  tryptophan?: T
  threonine?: T
  isoleucine?: T
  leucine?: T
  lysine?: T
  methionine?: T
  cystine?: T
  phenylalanine?: T
  tyrosine?: T
  valine?: T
  arginine?: T
  histidine?: T
  alanine?: T
  asparticAcid?: T
  glutamicAcid?: T
  glycine?: T
  proline?: T
  serine?: T
  hydroxyproline?: T
  cysteine?: T
  glutamine?: T
  taurine?: T
  dienoic?: T
}

export interface Protein<T> extends AminoAcids<T> {
  protein?: T
}

// ************** //
// ** Vitamins ** //
// ************** //

// vitamin A
export interface VitaminA<T> {
  retinol?: T
  retinolActivityEquiv?: T
  alphaCarotene?: T
  betaCarotene?: T
  betaCryptoxanthin?: T
  lycopene?: T
  cisLycopene?: T
  luteinZeaxanthin?: T
  zeaxanthin?: T
  lutein?: T
  cisLuteinZeaxanthin?: T
  cisBetaCarotene?: T
  transBetaCarotene?: T
  transLycopene?: T
  cryptoxanthin?: T
}

// / vitamin D
export interface VitaminD<T> {
  d2?: T
  d3?: T
  d2and3?: T
  calcifediol?: T
}

export interface VitaminE<T> {
  betaTocopherol?: T
  gammaTocopherol?: T
  deltaTocopherol?: T
  vitEAdded?: T
  alphaTocotrienol?: T
  betaTocotrienol?: T
  gammaTocotrienol?: T
  deltaTocotrienol?: T
  vitELabel?: T
  vitEAte?: T
}

// / Folate
export interface Folate<T> {
  foodFolate?: T
  folicAcid?: T
  dietaryFolateEquiv?: T
}

export interface Vitamins<T>
  extends VitaminA<T>,
    VitaminD<T>,
    VitaminE<T>,
    Folate<T> {
  vitA?: T
  vitC?: T
  vitD?: T
  vitE?: T
  vitK?: T
  dihydrophylloquinone?: T
  menaquinone4?: T
  thiamin?: T
  riboflavin?: T
  niacin?: T
  folate?: T
  vitB6?: T
  vitB12?: T
  addedB12?: T
  biotin?: T
  iodine?: T
  pantothenicAcid?: T
  choline?: T
  betaine?: T
  phytoene?: T
  phytofluene?: T
  inositol?: T
  _5MethylTetrahydrofolate?: T
  _10FormylFolicAcid?: T
  _5FormyltetrahydrofolicAcid?: T
  cholineFree?: T
  cholinePhosphocholine?: T
  cholinePhosphotidyl?: T
  cholineGlycerophosphocholine?: T
  cholineSphingomyelin?: T
}

// ************** //
// ** Minerals ** //
// ************** //

export interface Minerals<T> {
  calcium?: T
  iron?: T
  magnesium?: T
  phosphorus?: T
  potassium?: T
  sodium?: T
  zinc?: T
  copper?: T
  manganese?: T
  selenium?: T
  fluoride?: T
  nitrogen?: T
  molybdenum?: T
  chlorine?: T
  boron?: T
  chromium?: T
  cobalt?: T
}

// ************* //
// ** Sterols ** //
// ************* //

export interface Sterols<T> {
  cholesterol?: T
  phytosterols?: T
  stigmasterol?: T
  campesterol?: T
  betaSitosterol?: T
}

// ************ //
// ** Others ** //
// ************ //

export interface Others<T> {
  alcohol?: T
  water?: T
  ash?: T
  caffeine?: T
  theobromine?: T
  aceticAcid?: T
  lacticAcid?: T
  sulfur?: T
}

/**
 * Generic interface containing all nutrient data points
 */

export interface Nutrition<T>
  extends Energy<T>,
    Carbohydrates<T>,
    Fats<T>,
    Protein<T>,
    Vitamins<T>,
    Minerals<T>,
    Sterols<T>,
    Others<T> {
  gravity?: T // https://en.wikipedia.org/wiki/Specific_gravity
}

export type Nutrient = keyof Nutrition<any>
