import { Nutrition } from '@cutcal/core';
import { sumNutritions } from './sumNutritions';

const NUTRS: Nutrition<number>[] = [
  {
    calories: 10,
    fat: 10,
    carbohydrates: 10,
    protein: 10
  },
  {
    calories: 5,
    fat: 5,
    carbohydrates: 5,
    protein: 5
  },
  {
    calories: 3,
    fat: 3,
    carbohydrates: 3,
    protein: 3
  }
];

it('sumNutritions() - shared/functions - should sum each property of each nutrition object passed as an argument', () => {
  expect(sumNutritions(NUTRS)).toEqual({
    calories: 18,
    fat: 18,
    carbohydrates: 18,
    protein: 18
  });
});
