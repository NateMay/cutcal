import { DEAFULT_DAILY_VALUE } from '@cutcal/nutrition';
import { MOCK_NUTRITION } from '../../../../../data/nutrition1.mock';
import { NutritionLabel } from './nutr-label';

it('NutritionLabel class should calculate properly', () => {
  const label = new NutritionLabel(MOCK_NUTRITION, DEAFULT_DAILY_VALUE);

  expect(label.totalCalories).toBeCloseTo(300, 2);
  expect(label.totalFat).toBeCloseTo(20, 2);
  expect(label.percFat).toBeCloseTo(0.666, 2);
  expect(label.totalSatFat).toBeCloseTo(5, 2);
  expect(label.percSatFat).toBe(0.25);
  expect(label.totalTransFat).toBeCloseTo(6, 2);
  expect(label.cholesterol).toBeCloseTo(10, 2);
  expect(label.percCholesterol).toBeCloseTo(0.029, 2);
  expect(label.sodium).toBeCloseTo(90, 2);
  expect(label.percSodium).toBeCloseTo(0.152, 2);
  expect(label.totalCarb).toBeCloseTo(23, 2);
  expect(label.percCarbs).toBeCloseTo(0.127, 2);
  expect(label.dietaryFiber).toBeCloseTo(10, 2);
  expect(label.percDietaryFiber).toBeCloseTo(0.263, 2);
  expect(label.totalSugar).toBeCloseTo(13, 2);
  expect(label.totalProtein).toBeCloseTo(14, 2);
  expect(label.percVitA).toBeCloseTo(0.0875, 2);
  expect(label.percVitC).toBeCloseTo(0.614, 2);
  expect(label.percCalcium).toBeCloseTo(0.364, 2);
  expect(label.percIron).toBeCloseTo(0.308, 2);
});
