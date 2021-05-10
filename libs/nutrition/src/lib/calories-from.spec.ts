import {
  adjustPerGram,
  caloriesFrom,
  caloriesFromAll,
  caloriesFromSingle
} from './calories-from';

it('caloriesFrom() - shared/functions calculates (from a nutrion object) the calories for the specified single macro nutrient', () => {
  expect(
    caloriesFrom('carbohydrates', {
      calories: 120,
      carbohydrates: 10,
      protein: 10,
      fat: 10,
      alcohol: 10
    })
  ).toEqual(20);

  expect(
    caloriesFrom('alcohol', {
      calories: 120,
      carbohydrates: 10,
      protein: 10,
      fat: 10,
      alcohol: 10
    })
  ).toEqual(35);
});

it('caloriesFromAll() - shared/functions - should get all of the macro nutrient values from a nutrition object', () => {
  expect(
    caloriesFromAll({
      calories: 120,
      carbohydrates: 10,
      protein: 10,
      fat: 10,
      alcohol: 10
    })
  ).toEqual({
    carbohydrates: 20,
    protein: 20,
    fat: 45,
    alcohol: 35
  });
});

it('adjustPerGram() - shared/functions - calculates (from a nutrition object) the total calories for all macro nutrients', () => {
  expect(
    adjustPerGram({
      carbohydrates: 10,
      protein: 10,
      fat: 10,
      alcohol: 10
    })
  ).toEqual({
    carbohydrates: 40,
    protein: 40,
    fat: 90,
    alcohol: 70
  });
});

it('caloriesFromSingle() - shared/functions calculates (given the needed parameters) the calories for a single macro nutrient', () => {
  expect(caloriesFromSingle(4, 40, 10)).toBe(1);
});
