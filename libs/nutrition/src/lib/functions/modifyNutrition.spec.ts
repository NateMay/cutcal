import { modifyNutrition } from './modifyNutrition';

it('modifyNutrition() - shared/functions', () => {
  expect(
    modifyNutrition(
      {
        calories: 120,
        carbohydrates: 1,
        protein: 3,
        fat: 5,
        alcohol: 17
      },
      (val: number) => val + 4
    )
  ).toEqual({
    calories: 124,
    carbohydrates: 5,
    protein: 7,
    fat: 9,
    alcohol: 21
  });
});
