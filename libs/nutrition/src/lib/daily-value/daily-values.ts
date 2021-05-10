import { DailyValue } from './daily-value'

/**
 * @see {@link http://www.consumerlab.com/RDAs/ ConsumerLabs}
 * @see {@link http://nationalacademies.org/hmd/~/media/Files/Report%20Files/2019/DRI-Tables-2019/6_DRIValues_Summary.pdf?la=en NationalAcademies}
 * @see {@link https://www.nap.edu/read/10490/chapter/15#953 MacroNutrients}
 */

// Vitamin K 120.0 µg
// Thiamin 1.2 mg
// Riboflavin 1.3 mg
// Niacin 16.0 mg
// Vitamin B6 1.3 mg
// Folate 400.0 µg
// Vitamin B12 2.4 µg
// Pantothenic Acid 5.0 mg
// Biotin 30.0 µg
// Choline 550.0 mg

// Calcium 1000.0 mg
// Chromium 35.0 µg
// Copper 0.9 mg
// Flouride 4.0 mg
// Iodine 150.0 µg
// Iron 8.0 mg
// Magnesium 420.0 mg
// Manganese 2.3 mg
// Molybdenum 45.0 µg
// Phosphorus 700.0 mg
// Selenium 55.0 µg
// Zinc 11.0 mg

export const DEAFULT_DAILY_VALUE: DailyValue = {
  id: 0,
  name: 'Daily Value',
  description: 'Adult -  2,000 Calories a Day',
  nutrition: {
    // _18$2n6 Linoleic Acid 17000 mg
    // _18$3n3  Acid 1600 mg
    calories: {
      EAR: 1800,
      RDA: 2000,
      AI: 2200,
      UL: 3000,
      unit: 'kcal'
    },
    carbohydrates: {
      EAR: 130,
      RDA: 180,
      AI: 200,
      UL: 450,
      unit: 'g'
    },
    dietaryFiber: {
      EAR: 15,
      RDA: 38,
      AI: 30,
      UL: 450,
      unit: 'g'
    },
    starch: {
      EAR: 100,
      RDA: 180,
      AI: 200,
      UL: 278,
      unit: 'g'
    },
    sugar: {
      EAR: 20,
      RDA: 20,
      AI: 200,
      UL: 150,
      unit: 'g'
    },
    fat: {
      EAR: 20,
      RDA: 30,
      AI: 40,
      UL: 77,
      unit: 'g'
    },
    saturatedFat: {
      EAR: 20,
      RDA: 20,
      AI: 20,
      UL: 40,
      unit: 'g'
    },
    polyUnsaturated: {
      EAR: 20,
      RDA: 20,
      AI: 20,
      UL: 40,
      unit: 'g'
    },
    monoUnsaturated: {
      EAR: 20,
      RDA: 20,
      AI: 20,
      UL: 40,
      unit: 'g'
    },
    transUnsaturated: {
      EAR: 2,
      RDA: 3,
      AI: 4,
      UL: 6,
      unit: 'g'
    },
    protein: {
      EAR: 63,
      RDA: 75,
      AI: 65,
      UL: 860,
      unit: 'g'
    },
    vitA: {
      EAR: 3000,
      RDA: 4000,
      AI: 3300,
      UL: 10000,
      unit: 'iu'
    },
    vitC: {
      EAR: 90,
      RDA: 130,
      AI: 110,
      UL: 2000,
      unit: 'mg'
    },
    vitD: {
      EAR: 200,
      RDA: 260,
      AI: 230,
      UL: 4000,
      unit: 'iu'
    },
    vitE: {
      EAR: 15,
      RDA: 25,
      AI: 18,
      UL: 210,
      unit: 'mg'
    },
    vitK: {
      EAR: 120,
      RDA: 150,
      AI: 130,
      UL: 800,
      unit: 'µg'
    },
    thiamin: {
      EAR: 1.2,
      RDA: 2,
      AI: 1.5,
      UL: 65,
      unit: 'mg'
    },
    riboflavin: {
      EAR: 1.3,
      RDA: 2.2,
      AI: 1.5,
      UL: 80,
      unit: 'mg'
    },
    niacin: {
      EAR: 16,
      RDA: 27,
      AI: 20,
      UL: 135,
      unit: 'mg'
    },
    vitB6: {
      EAR: 2,
      RDA: 2.4,
      AI: 2.5,
      UL: 100,
      unit: 'mg'
    },
    folate: {
      EAR: 400,
      RDA: 450,
      AI: 456,
      UL: 1000,
      unit: 'µg'
    },
    vitB12: {
      EAR: 2.4,
      RDA: 5.3,
      AI: 3,
      UL: 40,
      unit: 'µg'
    },
    biotin: {
      // {@link https://www.medicalnewstoday.com/articles/318724.php}
      EAR: 30,
      RDA: 40,
      AI: 42,
      UL: 90,
      unit: 'µg'
    },
    choline: {
      EAR: 550,
      RDA: 640,
      AI: 610,
      UL: 2900,
      unit: 'mg'
    },
    iodine: {
      EAR: 150,
      RDA: 175,
      AI: 180,
      UL: 350,
      unit: 'µg'
    },
    pantothenicAcid: {
      EAR: 10,
      RDA: 11,
      AI: 11,
      UL: 28,
      unit: 'mg'
    },
    calcium: {
      EAR: 1000,
      RDA: 1100,
      AI: 1100,
      UL: 3000,
      unit: 'mg'
    },
    iron: {
      EAR: 8,
      RDA: 13,
      AI: 10,
      UL: 75,
      unit: 'mg'
    },
    magnesium: {
      EAR: 400,
      RDA: 460,
      AI: 470,
      UL: 1500,
      unit: 'mg'
    },
    phosphorus: {
      EAR: 1000,
      RDA: 1300,
      AI: 1340,
      UL: 3000,
      unit: 'mg'
    },
    potassium: {
      EAR: 3500,
      RDA: 1950,
      AI: 2000,
      UL: 8500,
      unit: 'mg'
    },
    sodium: {
      EAR: 500,
      RDA: 590,
      AI: 600,
      UL: 2400,
      unit: 'mg'
    },
    zinc: {
      EAR: 15,
      RDA: 19,
      AI: 20,
      UL: 80,
      unit: 'mg'
    },
    copper: {
      EAR: 0.9,
      RDA: 2,
      AI: 1.2,
      UL: 50,
      unit: 'mg'
    },
    manganese: {
      EAR: 2,
      RDA: 2,
      AI: 2,
      UL: 7,
      unit: 'mg'
    },
    selenium: {
      EAR: 55,
      RDA: 75,
      AI: 63,
      UL: 510,
      unit: 'µg'
    },
    // chromium: {
    //   EAR: 120,
    //   RDA: 130,
    //   AI: 132,
    //   UL: 420,
    //   unit: 'µg'
    // },
    // molybdenum: {
    //   EAR: 75,
    //   RDA: 87,
    //   AI: 90,
    //   UL: 275,
    //   unit: 'µg'
    // },
    // chloride: {
    //   EAR: 3400,
    //   RDA: 3700,
    //   AI: 3750,
    //   UL: 6400,
    //   unit: 'mg'
    // },
    cholesterol: {
      EAR: 300,
      RDA: 340,
      AI: 350,
      UL: 450,
      unit: 'mg'
    }
  }
}
