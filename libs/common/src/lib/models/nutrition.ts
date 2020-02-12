// nx

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
  sugar_alcohol?: T
  xylitol?: T
  sorbitol?: T
  ribose?: T
  sugars_nlea?: T
}

export interface Carbohydrates<T> extends Sugars<T> {
  carbohydrates?: T
  dietary_fiber?: T
  soluble_fiber?: T
  insoluble_fiber?: T
  starch?: T
  sugar?: T
  carb_sum?: T
  carb_other?: T
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
  _16$1_undif?: T
  _16$1c?: T
  _16$1t?: T
  _17$1?: T
  _17$1c?: T
  _18$1_undif?: T
  _18$1c?: T
  _18$1t?: T
  _18$1_11?: T
  _20$1?: T
  _20$1c?: T
  _20$1t?: T
  _22$02?: T
  _22$1_undif?: T
  _22$1c?: T
  _22$1t?: T
  _24$1c?: T
}

export interface PolyUnsaturated<T> {
  _18$2_undif?: T
  _18$2n6?: T
  _18$2_CLAs?: T
  _18$2t?: T
  _18$2i?: T
  _18$2t_nfd?: T
  _18$2c?: T
  _18$3c?: T
  _18$3t?: T
  _18$3_undif?: T
  _18$3n3?: T
  _18$3n6?: T
  _18$3i?: T
  _18$4?: T
  _20$2c?: T
  _20$2n6?: T
  _20$3c?: T
  _20$3_undif?: T
  _20$3n3?: T
  _20$3n6?: T
  _20$3n9?: T
  _20$4c?: T
  _20$4_undif?: T
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
  fat_nlea?: T
  saturatedFat?: T
  polyUnsaturated?: T
  monoUnsaturated?: T
  transUnsaturated?: T
}

// ************* //
// ** Protein ** //
// ************* //
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
  aspartic_acid?: T
  glutamic_acid?: T
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

/// vitamin A
export interface VitaminA<T> {
  retinol?: T
  retinol_activity_equiv?: T
  alpha_carotene?: T
  beta_carotene?: T
  beta_cryptoxanthin?: T
  lycopene?: T
  cis_lycopene?: T
  lutein_zeaxanthin?: T
  zeaxanthin?: T
  lutein?: T
  cis_lutein_zeaxanthin?: T
  cis_beta_carotene?: T
  trans_beta_carotene?: T
  trans_lycopene?: T
  cryptoxanthin?: T
}

/// vitamin D
export interface VitaminD<T> {
  d2?: T
  d3?: T
  d2and3?: T
  calcifediol?: T
}

export interface VitaminE<T> {
  beta_tocopherol?: T
  gamma_tocopherol?: T
  delta_tocopherol?: T
  vit_E_added?: T
  alpha_tocotrienol?: T
  beta_tocotrienol?: T
  gamma_tocotrienol?: T
  delta_tocotrienol?: T
  vit_E_label?: T
  vit_E_ate?: T
}

/// Folate
export interface Folate<T> {
  food_folate?: T
  folic_acid?: T
  dietary_folate_equiv?: T
}

export interface Vitamins<T>
  extends VitaminA<T>,
    VitaminD<T>,
    VitaminE<T>,
    Folate<T> {
  vit_A?: T
  vit_C?: T
  vit_D?: T
  vit_E?: T
  vit_K?: T
  dihydrophylloquinone?: T
  menaquinone_4?: T
  thiamin?: T
  riboflavin?: T
  niacin?: T
  folate?: T
  vit_B6?: T
  vit_B12?: T
  added_B12?: T
  biotin?: T
  iodine?: T
  pantothenic_acid?: T
  choline?: T
  betaine?: T
  phytoene?: T
  phytofluene?: T
  inositol?: T
  _5_methyl_tetrahydrofolate?: T
  _10_Formyl_folic_acid?: T
  _5_Formyltetrahydrofolic_acid?: T
  choline_free?: T
  choline_phosphocholine?: T
  choline_phosphotidyl?: T
  choline_glycerophosphocholine?: T
  choline_sphingomyelin?: T
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
  beta_sitosterol?: T
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
  acetic_acid?: T
  lactic_acid?: T
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
