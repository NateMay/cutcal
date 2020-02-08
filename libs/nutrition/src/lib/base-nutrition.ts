import { Nutrition } from './nutrition';

/**
 * Full Nutrition object with all zeros
 */
export const ZERO_NUTRITION = <Nutrition<number>>Object.freeze(BASE_NUTRITION());



/**
 * Returns a new, comprehensive nutrition object with zero values
 */

export function BASE_NUTRITION<T>(value: any = 0): Nutrition<T> {
  return {

    // ENERGY
    calories: value,
    kj: value,


    // CARBS
    carbohydrates: value,
    dietary_fiber: value,
    soluble_fiber: value,
    insoluble_fiber: value,
    starch: value,

    /// Sugars
    sugar: value,
    sucrose: value,
    glucose: value,
    fructose: value,
    lactose: value,
    maltose: value,
    galactose: value,
    addedSugar: value,
    sugar_alcohol: value,


    // FATS
    fat: value,

    /// Saturated
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

    /// poly-unsaturated
    monoUnsaturated: value,
    _14$1: value,
    _15$1: value,
    _16$1_undif: value,
    _16$1c: value,
    _16$1t: value,
    _17$1: value,
    _18$1_undif: value,
    _18$1c: value,
    _18$1t: value,
    _18$1_11: value,
    _20$1: value,
    _22$1_undif: value,
    _22$1c: value,
    _22$1t: value,
    _24$1c: value,

    /// poly-unsaturated
    polyUnsaturated: value,
    _18$2_undif: value,
    _18$2n6: value,
    _18$2_CLAs: value,
    _18$2t: value,
    _18$2i: value,
    _18$2t_nfd: value,
    _18$3_undif: value,
    _18$3n3: value,
    _18$3n6: value,
    _18$3i: value,
    _18$4: value,
    _20$2n6: value,
    _20$3_undif: value,
    _20$3n3: value,
    _20$3n6: value,
    _20$4_undif: value,
    _20$4n6: value,
    _20$5n3: value,
    _21$5: value,
    _22$4: value,
    _22$5n3: value,
    _22$6n3: value,

    /// trans fat
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
    aspartic_acid: value,
    glutamic_acid: value,
    glycine: value,
    proline: value,
    serine: value,
    hydroxyproline: value,


    // VITAMINS

    /// vitamin A
    vit_A: value,
    retinol: value,
    retinol_activity_equiv: value,
    alpha_carotene: value,
    beta_carotene: value,
    beta_cryptoxanthin: value,
    lycopene: value,
    lutein_zeaxanthin: value,

    vit_C: value,

    /// vitamin D
    vit_D: value,
    d2: value,
    d3: value,
    d2and3: value,

    /// vitamin E
    vit_E: value,
    beta_tocopherol: value,
    gamma_tocopherol: value,
    delta_tocopherol: value,
    vit_E_added: value,
    alpha_tocotrienol: value,
    beta_tocotrienol: value,
    gamma_tocotrienol: value,
    delta_tocotrienol: value,

    vit_K: value,
    dihydrophylloquinone: value,
    menaquinone_4: value,
    thiamin: value,
    riboflavin: value,
    niacin: value,
    vit_B6: value,

    /// Folate
    folate: value,
    food_folate: value,
    folic_acid: value,
    dietary_folate_equiv: value,

    vit_B12: value,
    added_B12: value,
    biotin: value,
    iodine: value,
    pantothenic_acid: value,
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
    beta_sitosterol: value,


    // OTHER
    alcohol: value,
    water: value,
    ash: value,
    caffeine: value,
    theobromine: value,


    // new
    nitrogen: value,
    acetic_acid: value,
    lactic_acid: value,
    sulfur: value,
    sorbitol: value,
    sugars_nlea: value,
    xylitol: value,
    ribose: value,
    carb_sum: value,
    carb_other: value,
    inositol: value,
    inulin: value,
    epigallocatechin: value,
    fat_nlea: value,
    chlorine: value,
    chromium: value,
    cobalt: value,
    molybdenum: value,
    calcifediol: value,
    phytoene: value,
    phytofluene: value,
    zeaxanthin: value,
    lutein: value,
    cis_lutein_zeaxanthin: value,
    cis_beta_carotene: value,
    trans_beta_carotene: value,
    trans_lycopene: value,
    cryptoxanthin: value,
    vit_E_label: value,
    boron: value,
    cis_lycopene: value,
    _5_methyl_tetrahydrofolate: value,
    _10_Formyl_folic_acid: value,
    _5_Formyltetrahydrofolic_acid: value,
    choline_free: value,
    choline_phosphocholine: value,
    choline_phosphotidyl: value,
    choline_glycerophosphocholine: value,
    choline_sphingomyelin: value,
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
    vit_E_ate: value

    // gravity: value,
  }
};
