// import { KVP } from '../models/key-value-pair';

export type FdcUnit = 'kcal' | 'kj' | 'g' | 'mg' | 'iu' | 'µg' | 'sp_gr';
/**
 * Static Nutrient Metadata
 * @property {number} id FoodData Central nutrient ID
 * @property {number} nbr nutrient id (leagacy from USDA I think)
 * @property {string} nutrient Proper, FDC name
 * @property {string} unit default FDC unit
 * @property {string} shortName CutCal display name
 */

export interface NutrientMetaData {
  id: number;
  nbr: number;
  nutrient: string;
  unit: FdcUnit;
  shortName: string;
  propName?: string;
}


export const USDA_NUTRIENT_DETAILS: { [key: string]: NutrientMetaData } = {
  'water': {
    id: 1051,
    nbr: 255,
    nutrient: 'Water',
    shortName: 'Water',
    unit: 'g'
  },
  'calories': {
    id: 1008,
    nbr: 208,
    nutrient: 'Calories',
    shortName: 'Calories',
    unit: 'kcal'
  },
  'kj': {
    id: 1062,
    nbr: 268,
    nutrient: 'Kilojoules',
    shortName: 'Kilojoules',
    unit: 'kj'
  },
  'protein': {
    id: 1003,
    nbr: 203,
    nutrient: 'Protein, total',
    shortName: 'Protein',
    unit: 'g'
  },
  'fat': {
    id: 1004,
    nbr: 204,
    nutrient: 'Total lipid (fat)',
    shortName: 'Fat',
    unit: 'g'
  },
  'ash': {
    id: 1007,
    nbr: 207,
    nutrient: 'Ash',
    shortName: 'Ash',
    unit: 'g'
  },
  'carbohydrates': {
    id: 1005,
    nbr: 205,
    nutrient: 'Carbohydrate',
    shortName: 'Carbohydrate',
    unit: 'g'
  },
  'dietary_fiber': {
    id: 1079,
    nbr: 291,
    nutrient: 'Fiber, total dietary',
    shortName: 'Dietary Fiber',
    unit: 'g'
  },
  'soluble_fiber': {
    id: 1082,
    nbr: 295,
    nutrient: 'Fiber, soluble',
    shortName: 'Soluble Fiber',
    unit: 'g'
  },
  'insoluble_fiber': {
    id: 1084,
    nbr: 297,
    nutrient: 'Fiber, insoluble',
    shortName: 'Insoluble Fiber',
    unit: 'g'
  },
  'sugar': {
    id: 2000,
    nbr: 269,
    nutrient: 'Sugars, total including NLEA',
    shortName: 'Sugar',
    unit: 'g'
  },
  'addedSugar': {
    id: 1235,
    nbr: 539,
    nutrient: 'Sugars added',
    shortName: 'Sugar added',
    unit: 'g'
  },
  'sucrose': {
    id: 1010,
    nbr: 210,
    nutrient: 'Sucrose',
    shortName: 'Sucrose',
    unit: 'g'
  },
  'glucose': {
    id: 1011,
    nbr: 211,
    nutrient: 'Glucose (dextrose)',
    shortName: 'Glucose (dextrose)',
    unit: 'g'
  },
  'fructose': {
    id: 1012,
    nbr: 212,
    nutrient: 'Fructose',
    shortName: 'Fructose',
    unit: 'g'
  },
  'lactose': {
    id: 1013,
    nbr: 213,
    nutrient: 'Lactose',
    shortName: 'Lactose',
    unit: 'g'
  },
  'maltose': {
    id: 1014,
    nbr: 214,
    nutrient: 'Maltose',
    shortName: 'Maltose',
    unit: 'g'
  },
  'galactose': {
    id: 1075,
    nbr: 287,
    nutrient: 'Galactose',
    shortName: 'Galactose',
    unit: 'g'
  },
  'sugar_alcohol': {
    id: 1086,
    nbr: 299,
    nutrient: 'Total sugar alcohols',
    shortName: 'Sugar Alcohol',
    unit: 'g'
  },
  'starch': {
    id: 1009,
    nbr: 209,
    nutrient: 'Starch',
    shortName: 'Starch',
    unit: 'g'
  },
  'calcium': {
    id: 1087,
    nbr: 301,
    nutrient: 'Calcium, Ca',
    shortName: 'Calcium',
    unit: 'mg'
  },
  'iron': {
    id: 1089,
    nbr: 303,
    nutrient: 'Iron, Fe',
    shortName: 'Iron',
    unit: 'mg'
  },
  'magnesium': {
    id: 1090,
    nbr: 304,
    nutrient: 'Magnesium, Mg',
    shortName: 'Magnesium',
    unit: 'mg'
  },
  'phosphorus': {
    id: 1091,
    nbr: 305,
    nutrient: 'Phosphorus',
    shortName: 'Phosphorus',
    unit: 'mg'
  },
  'potassium': {
    id: 1092,
    nbr: 306,
    nutrient: 'Potassium, K',
    shortName: 'Potassium',
    unit: 'mg'
  },
  'sodium': {
    id: 1093,
    nbr: 307,
    nutrient: 'Sodium, Na',
    shortName: 'Sodium',
    unit: 'mg'
  },
  'zinc': {
    id: 1095,
    nbr: 309,
    nutrient: 'Zinc, Zn',
    shortName: 'Zinc',
    unit: 'mg'
  },
  'copper': {
    id: 1098,
    nbr: 312,
    nutrient: 'Copper, Cu',
    shortName: 'Copper',
    unit: 'mg'
  },
  'fluoride': {
    id: 1099,
    nbr: 313,
    nutrient: 'Fluoride, F',
    shortName: 'Fluoride',
    unit: 'µg'
  },
  'iodine': {
    id: 1100,
    nbr: 314,
    nutrient: 'Iodine, I',
    shortName: 'Iodine',
    unit: 'iu'
  },
  'manganese': {
    id: 1101,
    nbr: 315,
    nutrient: 'Manganese, Mn',
    shortName: 'Manganese',
    unit: 'mg'
  },
  'selenium': {
    id: 1103,
    nbr: 317,
    nutrient: 'Selenium, Se',
    shortName: 'Selenium',
    unit: 'µg'
  },
  'vit_C': {
    id: 1162,
    nbr: 401,
    nutrient: 'Vitamin C, total ascorbic acid',
    shortName: 'Vitamin C',
    unit: 'mg'
  },
  'thiamin': {
    id: 1165,
    nbr: 404,
    nutrient: 'Thiamin',
    shortName: 'Thiamin',
    unit: 'mg'
  },
  'riboflavin': {
    id: 1166,
    nbr: 405,
    nutrient: 'Riboflavin',
    shortName: 'Riboflavin',
    unit: 'mg'
  },
  'niacin': {
    id: 1167,
    nbr: 406,
    nutrient: 'Niacin',
    shortName: 'Niacin',
    unit: 'mg'
  },
  'pantothenic_acid': {
    id: 1170,
    nbr: 410,
    nutrient: 'Pantothenic acid',
    shortName: 'Pantothenic Acid',
    unit: 'mg'
  },
  'vit_B6': {
    id: 1175,
    nbr: 415,
    nutrient: 'Vitamin B-6',
    shortName: 'Vitamin B-6',
    unit: 'mg'
  },
  'biotin': {
    id: 1176,
    nbr: 416,
    nutrient: 'Biotin, Vitamin B-7',
    shortName: 'Biotin',
    unit: 'µg'
  },
  'folate': {
    id: 1177,
    nbr: 417,
    nutrient: 'Folate, total',
    shortName: 'Folate',
    unit: 'µg'
  },
  'folic_acid': {
    id: 1186,
    nbr: 431,
    nutrient: 'Folic acid',
    shortName: 'Folic acid',
    unit: 'µg'
  },
  'food_folate': {
    id: 1187,
    nbr: 432,
    nutrient: 'Folate, food',
    shortName: 'Food Folate',
    unit: 'µg'
  },
  'dietary_folate_equiv': {
    id: 1190,
    nbr: 435,
    nutrient: 'Folate DFE',
    shortName: 'Folate Equivalent',
    unit: 'µg'
  },
  'choline': {
    id: 1180,
    nbr: 421,
    nutrient: 'Choline, total',
    shortName: 'Choline',
    unit: 'mg'
  },
  'betaine': {
    id: 1198,
    nbr: 454,
    nutrient: 'Betaine',
    shortName: 'Betaine',
    unit: 'mg'
  },
  'vit_B12': {
    id: 1178,
    nbr: 418,
    nutrient: 'Vitamin B-12',
    shortName: 'Vitamin B-12',
    unit: 'µg'
  },
  'added_B12': {
    id: 1246,
    nbr: 578,
    nutrient: 'Vitamin B-12, added',
    shortName: 'Vitamin B-12, added',
    unit: 'µg'
  },
  'retinol_activity_equiv': {
    id: 1106,
    nbr: 320,
    nutrient: 'Vitamin A, RAE',
    shortName: 'Vitamin A, Equivalent',
    unit: 'µg'
  },
  'retinol': {
    id: 1105,
    nbr: 319,
    nutrient: 'Retinol',
    shortName: 'Retinol',
    unit: 'µg'
  },
  'beta_carotene': {
    id: 1107,
    nbr: 321,
    nutrient: 'Carotene beta',
    shortName: 'Carotene beta',
    unit: 'µg'
  },
  'alpha_carotene': {
    id: 1108,
    nbr: 322,
    nutrient: 'Carotene alpha',
    shortName: 'Carotene alpha',
    unit: 'µg'
  },
  'beta_cryptoxanthin': {
    id: 1120,
    nbr: 334,
    nutrient: 'Cryptoxanthin, beta',
    shortName: 'Cryptoxanthin Beta',
    unit: 'µg'
  },
  'vit_A': {
    id: 1104,
    nbr: 318,
    nutrient: 'Vitamin A, IU',
    shortName: 'Vitamin A',
    unit: 'iu'
  },
  'lycopene': {
    id: 1122,
    nbr: 337,
    nutrient: 'Lycopene',
    shortName: 'Lycopene',
    unit: 'µg'
  },
  'lutein_zeaxanthin': {
    id: 1123,
    nbr: 338,
    nutrient: 'Lutein + zeaxanthin',
    shortName: 'Lutein + Zeaxanthin',
    unit: 'µg'
  },
  'vit_E': {
    id: 1109,
    nbr: 323,
    nutrient: 'Vitamin E (alpha-tocopherol)',
    shortName: 'Vitamin E',
    unit: 'mg'
  },
  'vit_E_added': {
    id: 1242,
    nbr: 573,
    nutrient: 'Vitamin E, added',
    shortName: 'Vitamin E, added',
    unit: 'mg'
  },
  'beta_tocopherol': {
    id: 1125,
    nbr: 341,
    nutrient: 'Tocopherol beta',
    shortName: 'Tocopherol Beta',
    unit: 'mg'
  },
  'gamma_tocopherol': {
    id: 1126,
    nbr: 342,
    nutrient: 'Tocopherol gamma',
    shortName: 'Tocopherol Gamma',
    unit: 'mg'
  },
  'delta_tocopherol': {
    id: 1127,
    nbr: 343,
    nutrient: 'Tocopherol delta',
    shortName: 'Tocopherol Delta',
    unit: 'mg'
  },
  'alpha_tocotrienol': {
    id: 1128,
    nbr: 344,
    nutrient: 'Tocotrienol alpha',
    shortName: 'Tocotrienol Alpha',
    unit: 'mg'
  },
  'beta_tocotrienol': {
    id: 1129,
    nbr: 345,
    nutrient: 'Tocotrienol beta',
    shortName: 'Tocotrienol Beta',
    unit: 'mg'
  },
  'gamma_tocotrienol': {
    id: 1130,
    nbr: 346,
    nutrient: 'Tocotrienol gamma',
    shortName: 'Tocotrienol Gamma',
    unit: 'mg'
  },
  'delta_tocotrienol': {
    id: 1131,
    nbr: 347,
    nutrient: 'Tocotrienol delta',
    shortName: 'Tocotrienol Delta',
    unit: 'mg'
  },
  'd2and3': {
    id: 1114,
    nbr: 328,
    nutrient: 'Vitamin D (D2 + D3)',
    shortName: 'Vitamin D2 + D3',
    unit: 'µg'
  },
  'd2': {
    id: 1111,
    nbr: 325,
    nutrient: 'Vitamin D2 (ergocalciferol)',
    shortName: 'Vitamin D2',
    unit: 'µg'
  },
  'd3': {
    id: 1112,
    nbr: 326,
    nutrient: 'Vitamin D3 (cholecalciferol)',
    shortName: 'Vitamin D3',
    unit: 'µg'
  },
  'vit_D': {
    id: 1110,
    nbr: 324,
    nutrient: 'Vitamin D',
    shortName: 'Vitamin D',
    unit: 'iu'
  },
  'vit_K': {
    id: 1185,
    nbr: 430,
    nutrient: 'Vitamin K (phylloquinone)',
    shortName: 'Vitamin K',
    unit: 'µg'
  },
  'dihydrophylloquinone': {
    id: 1184,
    nbr: 429,
    nutrient: 'Dihydrophylloquinone',
    shortName: 'Dihydrophylloquinone',
    unit: 'µg'
  },
  'menaquinone_4': {
    id: 1183,
    nbr: 428,
    nutrient: 'Menaquinone-4',
    shortName: 'Menaquinone-4',
    unit: 'µg'
  },

  /**
   * @reference {@link https://en.wikipedia.org/wiki/List_of_saturated_fatty_acids}
   */
  'saturatedFat': {
    id: 1258,
    nbr: 606,
    nutrient: 'Fatty acids, total saturated',
    shortName: 'Saturated Fat',
    unit: 'g'
  },
  '_4$0': {
    id: 1259,
    nbr: 607,
    nutrient: 'Saturated Fatty Acid - 4:00',
    shortName: 'Butyric Acid',
    unit: 'g'
  },
  '_6$0': {
    id: 1260,
    nbr: 608,
    nutrient: 'Saturated Fatty Acid - 6:00',
    shortName: 'Caproic Acid',
    unit: 'g'
  },
  '_8$0': {
    id: 1261,
    nbr: 609,
    nutrient: 'Saturated Fatty Acid - 8:00',
    shortName: 'Caprylic Acid',
    unit: 'g'
  },
  '_10$0': {
    id: 1262,
    nbr: 610,
    nutrient: 'Saturated Fatty Acid - 10:00',
    shortName: 'Capric Acid',
    unit: 'g'
  },
  '_12$0': {
    id: 1263,
    nbr: 611,
    nutrient: 'Saturated Fatty Acid - 12:00',
    shortName: 'Lauric Acid',
    unit: 'g'
  },
  '_13$0': {
    id: 1332,
    nbr: 696,
    nutrient: 'Saturated Fatty Acid - 13:00',
    shortName: 'Tridecanoic acid',
    unit: 'g'
  },
  '_14$0': {
    id: 1264,
    nbr: 612,
    nutrient: 'Saturated Fatty Acid - 14:00',
    shortName: 'Myristic Acid',
    unit: 'g'
  },
  '_15$0': {
    id: 1299,
    nbr: 652,
    nutrient: 'Saturated Fatty Acid - 15:00',
    shortName: 'Pentadecanoic acid',
    unit: 'g'
  },
  '_16$0': {
    id: 1265,
    nbr: 613,
    nutrient: 'Saturated Fatty Acid - 16:00',
    shortName: 'Palmitic Acid',
    unit: 'g'
  },
  '_17$0': {
    id: 1300,
    nbr: 653,
    nutrient: 'Saturated Fatty Acid - 17:00',
    shortName: 'Margaric Acid',
    unit: 'g'
  },
  '_18$0': {
    id: 1266,
    nbr: 614,
    nutrient: 'Saturated Fatty Acid - 18:00',
    shortName: 'Stearic Acid',
    unit: 'g'
  },
  // 19:0	nonadecanoic acid
  '_20$0': {
    id: 1267,
    nbr: 615,
    nutrient: 'Saturated Fatty Acid - 20:00',
    shortName: 'Arachidic Acid',
    unit: 'g'
  },
  '_22$0': {
    id: 1273,
    nbr: 624,
    nutrient: 'Saturated Fatty Acid - 22:0',
    shortName: 'Behenic Acid',
    unit: 'g'
  },
  '_24$0': {
    id: 1301,
    nbr: 654,
    nutrient: 'Saturated Fatty Acid - 24:0',
    shortName: 'Lignoceric Acid',
    unit: 'g'
  },

  /**
   * @reference {@link https://en.wikipedia.org/wiki/Monounsaturated_fat}
   */
  'monoUnsaturated': {
    id: 1292,
    nbr: 645,
    nutrient: 'Fatty acids, total monounsaturated',
    shortName: 'Fatty acids, total monounsaturated',
    unit: 'g'
  },
  '_14$1': {
    id: 1274,
    nbr: 625,
    nutrient: 'Monounsaturated Fatty Acid - 14:01',
    shortName: 'Myristoleic acid',
    unit: 'g'
  },
  '_15$1': {
    id: 1333,
    nbr: 697,
    nutrient: 'Monounsaturated Fatty Acid - 15:1',
    shortName: 'Pentadecenoic Acid',
    unit: 'g'
  },
  '_16$1_undif': {
    id: 1275,
    nbr: 626,
    nutrient: 'Monounsaturated Fatty Acid - 16:01 undifferentiated',
    shortName: 'Palmitoleic Acid',
    unit: 'g'
  },
  '_16$1c': {
    id: 1314,
    nbr: 673,
    nutrient: 'Monounsaturated Fatty Acid - 16:1 c',
    shortName: '16:1 c',
    unit: 'g'
  },
  '_16$1t': {
    id: 1303,
    nbr: 662,
    nutrient: 'Monounsaturated Fatty Acid - 16:1 t',
    shortName: '16:1 t',
    unit: 'g'
  },
  '_17$1': {
    id: 1323,
    nbr: 687,
    nutrient: 'Monounsaturated Fatty Acid - 17:1',
    shortName: 'Heptadecenoic Acid',
    unit: 'g'
  },
  '_18$1_undif': {
    id: 1268,
    nbr: 617,
    nutrient: 'Monounsaturated Fatty Acid - 18:01 undifferentiated',
    shortName: 'Oleic Acid',
    unit: 'g'
  },
  '_18$1c': {
    id: 1315,
    nbr: 674,
    nutrient: 'Monounsaturated Fatty Acid - 18:1 c',
    shortName: '18:1 c',
    unit: 'g'
  },
  '_18$1t': {
    id: 1304,
    nbr: 663,
    nutrient: 'Monounsaturated Fatty Acid - 18:1 t',
    shortName: '18:1 t',
    unit: 'g'
  },
  '_18$1_11': {
    id: 1412,
    nbr: 859,
    nutrient: 'Monounsaturated Fatty Acid - 18:1-11 t (18:1t n-7)',
    shortName: '18:1-11 t',
    unit: 'g'
  },
  '_20$1': {
    id: 1277,
    nbr: 628,
    nutrient: 'Monounsaturated Fatty Acid - 20:01',
    shortName: 'Gadoleic Acid',
    unit: 'g'
  },
  '_22$1_undif': {
    id: 1279,
    nbr: 630,
    nutrient: 'Monounsaturated Fatty Acid - 22:1 undifferentiated',
    shortName: 'Erucic Acid',
    unit: 'g'
  },
  '_22$1c': {
    id: 1317,
    nbr: 676,
    nutrient: 'Monounsaturated Fatty Acid - 22:1 c',
    shortName: '22:1 c',
    unit: 'g'
  },
  '_22$1t': {
    id: 1305,
    nbr: 664,
    nutrient: 'Monounsaturated Fatty Acid - 22:1 t',
    shortName: '22:1 t',
    unit: 'g'
  },
  '_24$1c': {
    id: 1312,
    nbr: 671,
    nutrient: 'Monounsaturated Fatty Acid - 24:1 c',
    shortName: 'Nervonic acid',
    unit: 'g'
  },

  /**
   * @reference {@link https://en.wikipedia.org/wiki/List_of_saturated_fatty_acids}
   */
  'polyUnsaturated': {
    id: 1293,
    nbr: 646,
    nutrient: 'Fatty acids, total Polyunsaturated',
    shortName: 'Polyunsaturated Fat',
    unit: 'g'
  },
  '_18$2_undif': {
    id: 1269,
    nbr: 618,
    nutrient: 'Polyunsaturated Fatty acids - 18:02 undifferentiated',
    shortName: '18:2 undif',
    unit: 'g'
  },
  '_18$2n6': {
    id: 1316,
    nbr: 675,
    nutrient: 'Polyunsaturated Fatty acids - 18:2 n-6 c,c',
    shortName: 'Linoleic acid',
    unit: 'g'
  },
  '_18$2_CLAs': {
    id: 1311,
    nbr: 670,
    nutrient: 'Polyunsaturated Fatty acids - 18:2 CLAs',
    shortName: '18:2 CLAs',
    unit: 'g'
  },
  '_18$2t': {
    id: 1310,
    nbr: 669,
    nutrient: 'Polyunsaturated Fatty acids - 18:2 t,t',
    shortName: '18:2 t,t',
    unit: 'g'
  },
  '_18$2i': {
    id: 1307,
    nbr: 666,
    nutrient: 'Polyunsaturated Fatty acids - 18:2 i',
    shortName: '18:2 i',
    unit: 'g'
  },
  '_18$2t_nfd': {
    id: 1306,
    nbr: 665,
    nutrient: 'Polyunsaturated Fatty acids - 18:2 t not further defined',
    shortName: '18:2 t',
    unit: 'g'
  },
  '_18$3_undif': {
    id: 1270,
    nbr: 619,
    nutrient: 'Polyunsaturated Fatty acids - 18:3 undifferentiated',
    shortName: 'Linolenic Acid',
    unit: 'g'
  },
  '_18$3n3': {
    id: 1404,
    nbr: 851,
    nutrient: 'Polyunsaturated Fatty acids - 18:3 n-3 c,c,c (ALA)',
    shortName: 'Alpha-Linolenic acid',
    unit: 'g'
  },
  '_18$3n6': {
    id: 1321,
    nbr: 685,
    nutrient: 'Polyunsaturated Fatty acids - 18:3 n-6 c,c,c',
    shortName: 'Gamma-linolenic acid',
    unit: 'g'
  },
  '_18$3i': {
    id: 1409,
    nbr: 856,
    nutrient: 'Polyunsaturated Fatty acids - 18:3i',
    shortName: 'Calendic acid',
    unit: 'g'
  },
  '_18$4': {
    id: 1276,
    nbr: 627,
    nutrient: 'Polyunsaturated Fatty acids - 18:04',
    shortName: 'Parinaric acid',
    unit: 'g'
  },
  '_20$2n6': {
    id: 1313,
    nbr: 672,
    nutrient: 'Polyunsaturated Fatty acids - 20:2 n-6 c,c',
    shortName: 'Eicosadienoic Acid',
    unit: 'g'
  },
  '_20$3_undif': {
    id: 1325,
    nbr: 689,
    nutrient: 'Polyunsaturated Fatty acids - 20:03 undifferentiated',
    shortName: 'Eicosatrienoic Acid',
    unit: 'g'
  },
  '_20$3n3': {
    id: 1405,
    nbr: 852,
    nutrient: 'Polyunsaturated Fatty acids - 20:3 n-3',
    shortName: 'Eicosatrienoic acid',
    unit: 'g'
  },
  '_20$3n6': {
    id: 1406,
    nbr: 853,
    nutrient: 'Polyunsaturated Fatty acids - 20:3 n-6',
    shortName: 'Dihomo-gamma-linolenic acid',
    unit: 'g'
  },
  '_20$4_undif': {
    id: 1271,
    nbr: 620,
    nutrient: 'Polyunsaturated Fatty acids - 20:4 undifferentiated',
    shortName: 'Arachidonic Acid',
    unit: 'g'
  },
  '_20$4n6': {
    id: 1408,
    nbr: 855,
    nutrient: 'Polyunsaturated Fatty acids - 20:4 n-6',
    shortName: '20:4 n-6',
    unit: 'g'
  },
  '_20$5n3': {
    id: 1278,
    nbr: 629,
    nutrient: 'Polyunsaturated Fatty acids - 20:5 n-3 (EPA)',
    shortName: 'Timnodonic Acid', // Eicosapentaenoic
    unit: 'g'
  },
  '_21$5': {
    id: 1410,
    nbr: 857,
    nutrient: 'Polyunsaturated Fatty acids - 21:05',
    shortName: 'Heneicosapentaenoic acid',
    unit: 'g'
  },
  '_22$4': {
    id: 1411,
    nbr: 858,
    nutrient: 'Polyunsaturated Fatty acids - 22:04',
    shortName: 'Adrenic acid',
    unit: 'g'
  },
  '_22$5n3': {
    id: 1280,
    nbr: 631,
    nutrient: 'Polyunsaturated Fatty acids - 22:5 n-3 (DPA)',
    shortName: 'Docosapentaenoic acid',
    unit: 'g'
  },
  '_22$6n3': {
    id: 1272,
    nbr: 621,
    nutrient: 'Polyunsaturated Fatty acids - 22:6 n-3 (DHA)',
    shortName: 'Docosahexaenoic acid',
    unit: 'g'
  },

  'transUnsaturated': {
    id: 1257,
    nbr: 605,
    nutrient: 'Fatty acids, total trans',
    shortName: 'Trans Fat',
    unit: 'g'
  },
  'monoenoic': {
    id: 1329,
    nbr: 693,
    nutrient: 'Fatty acids, total trans-monoenoic',
    shortName: 'Trans-Monoenoic',
    unit: 'g'
  },
  'polyenoic': {
    id: 1331,
    nbr: 695,
    nutrient: 'Fatty acids, total trans-polyenoic',
    shortName: 'Trans-Polyenoic',
    unit: 'g'
  },
  'cholesterol': {
    id: 1253,
    nbr: 601,
    nutrient: 'Cholesterol',
    shortName: 'Cholesterol',
    unit: 'mg'
  },
  'phytosterols': {
    id: 1283,
    nbr: 636,
    nutrient: 'Phytosterols',
    shortName: 'Phytosterols',
    unit: 'mg'
  },
  'stigmasterol': {
    id: 1285,
    nbr: 638,
    nutrient: 'Stigmasterol',
    shortName: 'Stigmasterol',
    unit: 'mg'
  },
  'campesterol': {
    id: 1286,
    nbr: 639,
    nutrient: 'Campesterol',
    shortName: 'Campesterol',
    unit: 'mg'
  },
  'beta_sitosterol': {
    id: 1288,
    nbr: 641,
    nutrient: 'Beta-sitosterol',
    shortName: 'β-sitosterol',
    unit: 'mg'
  },
  'tryptophan': {
    id: 1210,
    nbr: 501,
    nutrient: 'Tryptophan',
    shortName: 'Tryptophan',
    unit: 'g'
  },
  'threonine': {
    id: 1211,
    nbr: 502,
    nutrient: 'Threonine',
    shortName: 'Threonine',
    unit: 'g'
  },
  'isoleucine': {
    id: 1212,
    nbr: 503,
    nutrient: 'Isoleucine',
    shortName: 'Isoleucine',
    unit: 'g'
  },
  'leucine': {
    id: 1213,
    nbr: 504,
    nutrient: 'Leucine',
    shortName: 'Leucine',
    unit: 'g'
  },
  'lysine': {
    id: 1214,
    nbr: 505,
    nutrient: 'Lysine',
    shortName: 'Lysine',
    unit: 'g'
  },
  'methionine': {
    id: 1215,
    nbr: 506,
    nutrient: 'Methionine',
    shortName: 'Methionine',
    unit: 'g'
  },
  'cystine': {
    id: 1216,
    nbr: 507,
    nutrient: 'Cystine',
    shortName: 'Cystine',
    unit: 'g'
  },
  'phenylalanine': {
    id: 1217,
    nbr: 508,
    nutrient: 'Phenylalanine',
    shortName: 'Phenylalanine',
    unit: 'g'
  },
  'tyrosine': {
    id: 1218,
    nbr: 509,
    nutrient: 'Tyrosine',
    shortName: 'Tyrosine',
    unit: 'g'
  },
  'valine': {
    id: 1219,
    nbr: 510,
    nutrient: 'Valine',
    shortName: 'Valine',
    unit: 'g'
  },
  'arginine': {
    id: 1220,
    nbr: 511,
    nutrient: 'Arginine',
    shortName: 'Arginine',
    unit: 'g'
  },
  'histidine': {
    id: 1221,
    nbr: 512,
    nutrient: 'Histidine',
    shortName: 'Histidine',
    unit: 'g'
  },
  'alanine': {
    id: 1222,
    nbr: 513,
    nutrient: 'Alanine',
    shortName: 'Alanine',
    unit: 'g'
  },
  'aspartic_acid': {
    id: 1223,
    nbr: 514,
    nutrient: 'Aspartic acid',
    shortName: 'Aspartic acid',
    unit: 'g'
  },
  'glutamic_acid': {
    id: 1224,
    nbr: 515,
    nutrient: 'Glutamic acid',
    shortName: 'Glutamic acid',
    unit: 'g'
  },
  'glycine': {
    id: 1225,
    nbr: 516,
    nutrient: 'Glycine',
    shortName: 'Glycine',
    unit: 'g'
  },
  'proline': {
    id: 1226,
    nbr: 517,
    nutrient: 'Proline',
    shortName: 'Proline',
    unit: 'g'
  },
  'serine': {
    id: 1227,
    nbr: 518,
    nutrient: 'Serine',
    shortName: 'Serine',
    unit: 'g'
  },
  'hydroxyproline': {
    id: 1228,
    nbr: 521,
    nutrient: 'Hydroxyproline',
    shortName: 'Hydroxyproline',
    unit: 'g'
  },
  'alcohol': {
    id: 1018,
    nbr: 221,
    nutrient: 'Alcohol, ethyl',
    shortName: 'Alcohol',
    unit: 'g'
  },
  'caffeine': {
    id: 1057,
    nbr: 262,
    nutrient: 'Caffeine',
    shortName: 'Caffeine',
    unit: 'mg'
  },
  'theobromine': {
    id: 1058,
    nbr: 263,
    nutrient: 'Theobromine',
    shortName: 'Theobromine',
    unit: 'mg'
  },
  'nitrogen': {
    id: 1002,
    nbr: 202,
    nutrient: 'Nitrogen',
    shortName: 'Nitrogen',
    unit: 'g'
  },
  'acetic_acid': {
    id: 1026,
    nbr: 230,
    nutrient: 'Acetic acid',
    shortName: 'Acetic acid',
    unit: 'mg'
  },
  'lactic_acid': {
    id: 1038,
    nbr: 242,
    nutrient: 'Lactic acid',
    shortName: 'Lactic acid',
    unit: 'mg'
  },
  'sulfur': {
    id: 1094,
    nbr: 308,
    nutrient: 'Sulfur, S',
    shortName: 'Sulfur',
    unit: 'mg'
  },
  'sorbitol': {
    id: 1056,
    nbr: 261,
    nutrient: 'Sorbitol',
    shortName: 'Sorbitol',
    unit: 'g'
  },
  'sugars_nlea': {
    id: 1063,
    nbr: 269.3,
    nutrient: 'Sugars, Total NLEA',
    shortName: 'Sugars, Total NLEA',
    unit: 'g'
  },
  'xylitol': {
    id: 1078,
    nbr: 290,
    nutrient: 'Xylitol',
    shortName: 'Xylitol',
    unit: 'g'
  },
  'ribose': {
    id: 1081,
    nbr: 294,
    nutrient: 'Ribose',
    shortName: 'Ribose',
    unit: 'g'
  },
  'carb_sum': {
    id: 1050,
    nbr: 205.2,
    nutrient: 'Carbohydrate, by summation',
    shortName: 'Carbohydrate, by summation',
    unit: 'g'
  },
  'carb_other': {
    id: 1072,
    nbr: 284,
    nutrient: 'Carbohydrate, other',
    shortName: 'Carbohydrate, other',
    unit: 'g'
  },
  'inositol': {
    id: 1181,
    nbr: 422,
    nutrient: 'Inositol',
    shortName: 'Inositol',
    unit: 'µg'
  },
  'inulin': {
    id: 1403,
    nbr: 806,
    nutrient: 'Inulin',
    shortName: 'Inulin',
    unit: 'g'
  },
  'epigallocatechin': {
    id: 1368,
    nbr: 753,
    nutrient: 'Epigallocatechin-3-gallate',
    shortName: 'Epigallocatechin 3 Gallate',
    unit: 'g'
  },
  'fat_nlea': {
    id: 1085,
    nbr: 298,
    nutrient: 'Total fat (NLEA)',
    shortName: 'Total fat (NLEA)',
    unit: 'g'
  },
  'chlorine': {
    id: 1088,
    nbr: 302,
    nutrient: 'Chlorine, Cl',
    shortName: 'Chlorine',
    unit: 'mg'
  },
  'chromium': {
    id: 1096,
    nbr: 310,
    nutrient: 'Chromium, Cr',
    shortName: 'Chromium',
    unit: 'µg'
  },
  'cobalt': {
    id: 1097,
    nbr: 311,
    nutrient: 'Cobalt, Co',
    shortName: 'Cobalt',
    unit: 'µg'
  },
  'molybdenum': {
    id: 1102,
    nbr: 316,
    nutrient: 'Molybdenum, Mo',
    shortName: 'Molybdenum',
    unit: 'µg'
  },
  'calcifediol': {
    id: 1113,
    nbr: 327,
    nutrient: '25-hydroxycholecalciferol',
    shortName: 'calcifediol',
    unit: 'µg'
  },
  'phytoene': {
    id: 1116,
    nbr: 330,
    nutrient: 'Phytoene',
    shortName: 'Phytoene',
    unit: 'µg'
  },
  'phytofluene': {
    id: 1117,
    nbr: 331,
    nutrient: 'Phytofluene',
    shortName: 'Phytofluene',
    unit: 'µg'
  },
  'zeaxanthin': {
    id: 1119,
    nbr: 338.2,
    nutrient: 'Zeaxanthin',
    shortName: 'Zeaxanthin',
    unit: 'µg'
  },
  'lutein': {
    id: 1121,
    nbr: 338.1,
    nutrient: 'Lutein',
    shortName: 'Lutein',
    unit: 'µg'
  },
  'cis_lutein_zeaxanthin': {
    id: 1161,
    nbr: 338.3,
    nutrient: 'cis-Lutein/Zeaxanthin',
    shortName: 'cis-Lutein/Zeaxanthin',
    unit: 'µg'
  },
  'cis_beta_carotene': {
    id: 1159,
    nbr: 321.1,
    nutrient: 'cis-beta-Carotene',
    shortName: 'cis-beta-Carotene',
    unit: 'µg'
  },
  'trans_beta_carotene': {
    id: 2028,
    nutrient: 'trans-beta-Carotene',
    shortName: 'trans-beta-Carotene',
    unit: 'µg',
    nbr: 321.2
  },
  'trans_lycopene': {
    id: 2029,
    nutrient: 'trans-Lycopene',
    shortName: 'trans-Lycopene',
    unit: 'µg',
    nbr: 337.2
  },
  'cryptoxanthin': {
    id: 2032,
    nutrient: 'Cryptoxanthin, alpha',
    shortName: 'Cryptoxanthin, alpha',
    unit: 'µg',
    nbr: 335
  },
  'vit_E_label': {
    id: 1124,
    nbr: 340,
    nutrient: 'Vitamin E (label entry primarily)',
    shortName: 'Vitamin E, label entry',
    unit: 'iu'
  },
  'boron': {
    id: 1137,
    nbr: 354,
    nutrient: 'Boron',
    shortName: 'Boron',
    unit: 'µg'
  },
  'cis_lycopene': {
    id: 1160,
    nbr: 337.1,
    nutrient: 'cis-Lycopene',
    shortName: 'cis-Lycopene',
    unit: 'µg'
  },
  '_5_methyl_tetrahydrofolate': {
    id: 1188,
    nbr: 433,
    nutrient: '5-methyl tetrahydrofolate',
    shortName: '5-methyl tetrahydrofolate',
    unit: 'µg'
  },
  '_10_Formyl_folic_acid': {
    id: 1191,
    nbr: 436,
    nutrient: '10-Formyl folic acid (10HCOFA)',
    shortName: '10-Formyl folic acid (10HCOFA)',
    unit: 'µg'
  },
  '_5_Formyltetrahydrofolic_acid': {
    id: 1192,
    nbr: 437,
    nutrient: '5-Formyltetrahydrofolic acid',
    shortName: '5-Formyltetrahydrofolic acid',
    unit: 'µg'
  },

  'choline_free': {
    id: 1194,
    nbr: 450,
    nutrient: 'Choline, free',
    shortName: 'Choline, free',
    unit: 'mg'
  },
  'choline_phosphocholine': {
    id: 1195,
    nbr: 451,
    nutrient: 'Choline, from phosphocholine',
    shortName: 'Choline, from phosphocholine',
    unit: 'mg'
  },
  'choline_phosphotidyl': {
    id: 1196,
    nbr: 452,
    nutrient: 'Choline, from phosphotidyl choline',
    shortName: 'Choline, from phosphotidyl choline',
    unit: 'mg'
  },
  'choline_glycerophosphocholine': {
    id: 1197,
    nbr: 453,
    nutrient: 'Choline, from glycerophosphocholine',
    shortName: 'Choline, from glycerophosphocholine',
    unit: 'mg'
  },
  'choline_sphingomyelin': {
    id: 1199,
    nbr: 455,
    nutrient: 'Choline, from sphingomyelin',
    shortName: 'Choline, from sphingomyelin',
    unit: 'mg'
  },
  'cysteine': {
    id: 1232,
    nbr: 526,
    nutrient: 'Cysteine',
    shortName: 'Cysteine',
    unit: 'g'
  },
  'glutamine': {
    id: 1232,
    nbr: 528,
    nutrient: 'Glutamine',
    shortName: 'Glutamine',
    unit: 'g'
  },
  'taurine': {
    id: 1234,
    nbr: 529,
    nutrient: 'Taurine',
    shortName: 'Taurine',
    unit: 'g'
  },
  'dienoic': {
    id: 1330,
    nbr: 694,
    nutrient: 'Fatty acids, total trans-dienoic',
    shortName: 'Trans-Dienoic',
    unit: 'g'
  },
  '_22$02': {
    id: 1334,
    nbr: 698,
    nutrient: '20:02',
    shortName: 'Docosadienoic acid',
    unit: 'g'
  },
  '_11$0': {
    id: 1335,
    nbr: 699,
    nutrient: '11:00',
    shortName: '11:00',
    unit: 'g'
  },
  '_14$1t': {
    id: 1281,
    nbr: 821,
    nutrient: '14:1 t',
    shortName: '14:1 t',
    unit: 'g'
  },
  '_20$3n9': {
    id: 1414,
    nbr: 861,
    nutrient: '20:3 n-9',
    shortName: '20:3 n-9',
    unit: 'g'
  },
  '_5$0': {
    id: 2003,
    nutrient: '5:00',
    shortName: '5:00',
    nbr: 632,
    unit: 'g'
  },
  '_7$0': {
    id: 2004,
    nutrient: '7:00',
    shortName: '7:00',
    nbr: 633,
    unit: 'g'
  },
  '_9$0': {
    id: 2005,
    nutrient: '9:00',
    shortName: '9:00',
    nbr: 634,
    unit: 'g'
  },
  '_21$0': {
    id: 2006,
    nutrient: '21:00',
    shortName: '21:00',
    nbr: 681,
    unit: 'g'
  },
  '_23$0': {
    id: 2007,
    nutrient: '23:00',
    shortName: '23:00',
    nbr: 682,
    unit: 'g'
  },
  '_12$1': {
    id: 2008,
    nutrient: '12:01',
    shortName: '12:01',
    nbr: 635,
    unit: 'g'
  },
  '_14$1c': {
    id: 2009,
    nutrient: '14:1 c',
    shortName: '14:1 c',
    nbr: 822,
    unit: 'g'
  },
  '_17$1c': {
    id: 2010,
    nutrient: '17:1 c',
    shortName: '17:1 c',
    nbr: 825,
    unit: 'g'
  },
  '_20$1c': {
    id: 2012,
    nutrient: '20:1 c',
    shortName: '20:1 c',
    nbr: 829,
    unit: 'g'
  },
  '_20$1t': {
    id: 2013,
    nutrient: '20:1 t',
    shortName: '20:1 t',
    nbr: 830,
    unit: 'g'
  },
  '_22$1n9': {
    id: 2014,
    nutrient: '22:1 n-9',
    shortName: '22:1 n-9',
    nbr: 676.1,
    unit: 'g'
  },
  '_22$1n11': {
    id: 2015,
    nutrient: '22:1 n-11',
    shortName: 'cis-cetoleic acid',
    nbr: 676.2,
    unit: 'g'
  },
  '_18$2c': {
    id: 2016,
    nutrient: '18:2 c',
    shortName: '18:2 c',
    nbr: 831,
    unit: 'g'
  },
  '_18$3c': {
    id: 2018,
    nutrient: '18:3 c',
    shortName: '18:3 c',
    nbr: 833,
    unit: 'g'
  },
  '_18$3t': {
    id: 2019,
    nutrient: '18:3 t',
    shortName: '18:3 t',
    nbr: 834,
    unit: 'g'
  },
  '_20$3c': {
    id: 2020,
    nutrient: '20:3 c',
    shortName: '20:3 c',
    nbr: 835,
    unit: 'g'
  },
  '_22$3': {
    id: 2021,
    nutrient: '22:03',
    shortName: '22:03',
    nbr: 683,
    unit: 'g'
  },
  '_20$4c': {
    id: 2022,
    nutrient: '20:4 c',
    shortName: '20:4 c',
    nbr: 836,
    unit: 'g'
  },
  '_20$5c': {
    id: 2023,
    nutrient: '20:5 c',
    shortName: '20:5 c',
    nbr: 837,
    unit: 'g'
  },
  '_22$5c': {
    id: 2024,
    nutrient: '22:5 c',
    shortName: '22:5 c',
    nbr: 838,
    unit: 'g'
  },
  '_22$6c': {
    id: 2025,
    nutrient: '22:6 c',
    shortName: '22:6 c',
    nbr: 839,
    unit: 'g'
  },
  '_20$2c': {
    id: 2026,
    nutrient: '20:2 c',
    shortName: '20:2 c',
    nbr: 840,
    unit: 'g'
  },
  'gravity': {
    id: 1024,
    nbr: 227,
    nutrient: 'Specific Gravity',
    shortName: 'Specific Gravity',
    unit: 'sp_gr'
  },
  'vit_E_ate': {
    id: 1158,
    nbr: 394,
    nutrient: 'Vitamin E (alpha-tocopherol equivalents)',
    shortName: 'Vitamin E ATE',
    unit: 'mg'
  }
}
