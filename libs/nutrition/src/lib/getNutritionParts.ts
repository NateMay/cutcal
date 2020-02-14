import { AminoAcids, Carbohydrates, Energy, Fats, Folate, Minerals, MonoUnsaturated, Nutrition, Omega3, Omega6, Others, PolyUnsaturated, Protein, SaturatedFat, Sterols, Sugars, TransUnsaturated, VitaminA, VitaminD, VitaminE, Vitamins } from './nutrition'
// TEST (NutritionParts)

/**
 * Holds a breakdown of a nutrition object into logical groupings
 */
export interface NutritionParts<T> {
  gravity: T
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
  vit_A: VitaminA<T>
  vit_D: VitaminD<T>
  vit_E: VitaminE<T>
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

export function getEnergy<T>(nutr: Nutrition<T>): Energy<T> {
  return {
    calories: nutr.calories,
    kj: nutr.kj,
  }
}

// ******************* //
// ** Carbohydrates ** //
// ******************* //

export function getSugars<T>(nutr: Nutrition<T>): Sugars<T> {
  return {
    sucrose: nutr.sucrose,
    glucose: nutr.glucose,
    fructose: nutr.fructose,
    lactose: nutr.lactose,
    maltose: nutr.maltose,
    galactose: nutr.galactose,
    addedSugar: nutr.addedSugar,
    sugar_alcohol: nutr.sugar_alcohol,
    xylitol: nutr.xylitol,
    sorbitol: nutr.sorbitol,
    ribose: nutr.ribose,
    sugars_nlea: nutr.sugars_nlea,
  }
}

export function getBaseCarbohydrates<T>(
  nutr: Nutrition<T>
): Partial<Carbohydrates<T>> {
  return {
    carbohydrates: nutr.carbohydrates,
    dietary_fiber: nutr.dietary_fiber,
    soluble_fiber: nutr.soluble_fiber,
    insoluble_fiber: nutr.insoluble_fiber,
    starch: nutr.starch,
    sugar: nutr.sugar,
    carb_sum: nutr.carb_sum,
    carb_other: nutr.carb_other,
    inulin: nutr.inulin,
    epigallocatechin: nutr.epigallocatechin,
  }
}

export function getCarbohydrates<T>(nutr: Nutrition<T>): Carbohydrates<T> {
  return {
    ...getBaseCarbohydrates(nutr),
    ...getSugars(nutr),
  }
}

// ********** //
// ** Fats ** //
// ********** //

export function getSaturatedFat<T>(nutr: Nutrition<T>): SaturatedFat<T> {
  return {
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
    _23$0: nutr._23$0,
  }
}

export function getMonoUnsaturated<T>(nutr: Nutrition<T>): MonoUnsaturated<T> {
  return {
    _14$1: nutr._14$1,
    _15$1: nutr._15$1,
    _16$1_undif: nutr._16$1_undif,
    _16$1c: nutr._16$1c,
    _16$1t: nutr._16$1t,
    _17$1: nutr._17$1,
    _18$1_undif: nutr._18$1_undif,
    _18$1c: nutr._18$1c,
    _18$1t: nutr._18$1t,
    _18$1_11: nutr._18$1_11,
    _20$1: nutr._20$1,
    _22$1_undif: nutr._22$1_undif,
    _22$1c: nutr._22$1c,
    _22$1t: nutr._22$1t,
    _24$1c: nutr._24$1c,
    _14$1t: nutr._14$1t,
    _14$1c: nutr._14$1c,
    _17$1c: nutr._17$1c,
    _20$1c: nutr._20$1c,
    _20$1t: nutr._20$1t,
    _22$02: nutr._22$02,
  }
}

export function getPolyUnsaturated<T>(nutr: Nutrition<T>): PolyUnsaturated<T> {
  return {
    _18$2_undif: nutr._18$2_undif,
    _18$2n6: nutr._18$2n6,
    _18$2_CLAs: nutr._18$2_CLAs,
    _18$2t: nutr._18$2t,
    _18$2i: nutr._18$2i,
    _18$2t_nfd: nutr._18$2t_nfd,
    _18$3_undif: nutr._18$3_undif,
    _18$3n3: nutr._18$3n3,
    _18$3n6: nutr._18$3n6,
    _18$3i: nutr._18$3i,
    _18$4: nutr._18$4,
    _20$2n6: nutr._20$2n6,
    _20$3_undif: nutr._20$3_undif,
    _20$3n3: nutr._20$3n3,
    _20$3n6: nutr._20$3n6,
    _20$4_undif: nutr._20$4_undif,
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
    _22$6c: nutr._22$6c,
  }
}

export function getOmega3<T>(nutr: Nutrition<T>): Omega3<T> {
  return {
    _18$3n3: nutr._18$3n3,
    _20$3n3: nutr._20$3n3,
    _20$5n3: nutr._20$5n3,
    _22$6n3: nutr._22$6n3,
    _22$5n3: nutr._22$5n3,
    _21$5: nutr._21$5,
  }
}

export function getOmega6<T>(nutr: Nutrition<T>): Omega6<T> {
  return {
    _18$2n6: nutr._18$2n6,
    _18$3n6: nutr._18$3n6,
    _20$2n6: nutr._20$2n6,
    _20$3n6: nutr._20$3n6,
    _20$4n6: nutr._20$4n6,
  }
}

export function getTransUnsaturated<T>(
  nutr: Nutrition<T>
): TransUnsaturated<T> {
  return {
    monoenoic: nutr.monoenoic,
    polyenoic: nutr.polyenoic,
  }
}

export function getBaseFats<T>(nutr: Nutrition<T>): Partial<Fats<T>> {
  return {
    fat: nutr.fat,
    fat_nlea: nutr.fat_nlea,
    saturatedFat: nutr.saturatedFat,
    polyUnsaturated: nutr.polyUnsaturated,
    monoUnsaturated: nutr.monoUnsaturated,
    transUnsaturated: nutr.transUnsaturated,
  }
}

export function getFats<T>(nutr: Nutrition<T>): Fats<T> {
  return {
    ...getBaseFats(nutr),
    ...getSaturatedFat(nutr),
    ...getMonoUnsaturated(nutr),
    ...getPolyUnsaturated(nutr),
    ...getTransUnsaturated(nutr),
  }
}

// ************* //
// ** Protein ** //
// ************* //

export function getAminoAcids<T>(nutr: Nutrition<T>): AminoAcids<T> {
  return {
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
    aspartic_acid: nutr.aspartic_acid,
    glutamic_acid: nutr.glutamic_acid,
    glycine: nutr.glycine,
    proline: nutr.proline,
    serine: nutr.serine,
    hydroxyproline: nutr.hydroxyproline,
    cysteine: nutr.cysteine,
    glutamine: nutr.glutamine,
    taurine: nutr.taurine,
    dienoic: nutr.dienoic,
  }
}

export function getBaseProtein<T>(nutr: Nutrition<T>): Protein<T> {
  return {
    protein: nutr.protein,
  }
}

export function getProtein<T>(nutr: Nutrition<T>): Protein<T> {
  return {
    protein: nutr.protein,
    ...getAminoAcids(nutr),
  }
}

// ************** //
// ** Vitamins ** //
// ************** //

export function getVitaminA<T>(nutr: Nutrition<T>): VitaminA<T> {
  return {
    retinol: nutr.retinol,
    retinol_activity_equiv: nutr.retinol_activity_equiv,
    alpha_carotene: nutr.alpha_carotene,
    beta_carotene: nutr.beta_carotene,
    beta_cryptoxanthin: nutr.beta_cryptoxanthin,
    lycopene: nutr.lycopene,
    lutein_zeaxanthin: nutr.lutein_zeaxanthin,
    cis_lycopene: nutr.cis_lycopene,
    zeaxanthin: nutr.zeaxanthin,
    lutein: nutr.lutein,
    cis_lutein_zeaxanthin: nutr.cis_lutein_zeaxanthin,
    cis_beta_carotene: nutr.cis_beta_carotene,
    trans_beta_carotene: nutr.trans_beta_carotene,
    trans_lycopene: nutr.trans_lycopene,
    cryptoxanthin: nutr.cryptoxanthin,
  }
}

export function getVitaminD<T>(nutr: Nutrition<T>): VitaminD<T> {
  return {
    d2: nutr.d2,
    d3: nutr.d3,
    d2and3: nutr.d2and3,
    calcifediol: nutr.calcifediol,
  }
}

export function getVitaminE<T>(nutr: Nutrition<T>): VitaminE<T> {
  return {
    beta_tocopherol: nutr.beta_tocopherol,
    gamma_tocopherol: nutr.gamma_tocopherol,
    delta_tocopherol: nutr.delta_tocopherol,
    vit_E_added: nutr.vit_E_added,
    alpha_tocotrienol: nutr.alpha_tocotrienol,
    beta_tocotrienol: nutr.beta_tocotrienol,
    gamma_tocotrienol: nutr.gamma_tocotrienol,
    delta_tocotrienol: nutr.delta_tocotrienol,
    vit_E_label: nutr.vit_E_label,
    vit_E_ate: nutr.vit_E_ate,
  }
}

export function getFolate<T>(nutr: Nutrition<T>): Folate<T> {
  return {
    food_folate: nutr.food_folate,
    folic_acid: nutr.folic_acid,
    dietary_folate_equiv: nutr.dietary_folate_equiv,
  }
}

export function getBaseVitamins<T>(nutr: Nutrition<T>): Partial<Vitamins<T>> {
  return {
    vit_A: nutr.vit_A,
    vit_C: nutr.vit_C,
    vit_D: nutr.vit_D,
    vit_E: nutr.vit_E,
    vit_K: nutr.vit_K,
    dihydrophylloquinone: nutr.dihydrophylloquinone,
    menaquinone_4: nutr.menaquinone_4,
    thiamin: nutr.thiamin,
    riboflavin: nutr.riboflavin,
    niacin: nutr.niacin,
    folate: nutr.folate,
    vit_B6: nutr.vit_B6,
    vit_B12: nutr.vit_B12,
    added_B12: nutr.added_B12,
    biotin: nutr.biotin,
    iodine: nutr.iodine,
    pantothenic_acid: nutr.pantothenic_acid,
    choline: nutr.choline,
    betaine: nutr.betaine,
    phytoene: nutr.phytoene,
    phytofluene: nutr.phytofluene,
    inositol: nutr.inositol,
    _5_methyl_tetrahydrofolate: nutr._5_methyl_tetrahydrofolate,
    _10_Formyl_folic_acid: nutr._10_Formyl_folic_acid,
    _5_Formyltetrahydrofolic_acid: nutr._5_Formyltetrahydrofolic_acid,
    choline_free: nutr.choline_free,
    choline_phosphocholine: nutr.choline_phosphocholine,
    choline_phosphotidyl: nutr.choline_phosphotidyl,
    choline_glycerophosphocholine: nutr.choline_glycerophosphocholine,
    choline_sphingomyelin: nutr.choline_sphingomyelin,
  }
}

export function getVitamins<T>(nutr: Nutrition<T>): Vitamins<T> {
  return {
    ...getBaseVitamins(nutr),
    ...getFolate(nutr),
    ...getVitaminA(nutr),
    ...getVitaminE(nutr),
    ...getVitaminD(nutr),
  }
}

// ************** //
// ** Minerals ** //
// ************** //

export function getMinerals<T>(nutr: Nutrition<T>): Minerals<T> {
  return {
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
    boron: nutr.boron,
  }
}

export function getSterols<T>(nutr: Nutrition<T>): Sterols<T> {
  return {
    cholesterol: nutr.cholesterol,
    phytosterols: nutr.phytosterols,
    stigmasterol: nutr.stigmasterol,
    campesterol: nutr.campesterol,
    beta_sitosterol: nutr.beta_sitosterol,
  }
}

export function getOthers<T>(nutr: Nutrition<T>): Others<T> {
  return {
    alcohol: nutr.alcohol,
    water: nutr.water,
    ash: nutr.ash,
    caffeine: nutr.caffeine,
    theobromine: nutr.theobromine,
    acetic_acid: nutr.acetic_acid,
    lactic_acid: nutr.lactic_acid,
    sulfur: nutr.sulfur,
  }
}

/**
 * Breaks a nutrition object into logical groupings
 * @param {Nutrition<T>} nutr
 */

export function getNutritionParts<T>(nutr: Nutrition<T>): NutritionParts<T> {
  return {
    gravity: <T>nutr.gravity,
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
    vit_A: getVitaminA(nutr),
    vit_D: getVitaminD(nutr),
    vit_E: getVitaminE(nutr),
    folate: getFolate(nutr),
    vitaminBase: getBaseVitamins(nutr),
    vitamins: getVitamins(nutr),
    minerals: getMinerals(nutr),
    sterols: getSterols(nutr),
    others: getOthers(nutr),
  }
}
