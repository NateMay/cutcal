import { getNutrientID } from './getNutrientID';

it('getNutrientID() should extract the proper USDA nutrient id given the ', () => {
  expect(getNutrientID('calories')).toBe(1008);
  expect(getNutrientID('lactose')).toBe(1013);
  expect(getNutrientID('retinol')).toBe(1105);
  expect(getNutrientID('cholesterol')).toBe(1253);
});
