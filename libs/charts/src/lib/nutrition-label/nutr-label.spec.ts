import { DEAFULT_DAILY_VALUE } from '@cutcal/nutrition';
import { MOCK_NUTRITION } from '../../../../../data/nutrition1.mock';
import { NutritionLabel } from './nutr-label';

it('NutritionLabel class should calculate properly', () => {
  const label = new NutritionLabel(MOCK_NUTRITION, DEAFULT_DAILY_VALUE);

  expect(label.total_calories).toBeCloseTo(300, 2);
  expect(label.total_fat).toBeCloseTo(20, 2);
  expect(label.perc_fat).toBeCloseTo(0.666, 2);
  expect(label.total_sat_fat).toBeCloseTo(5, 2);
  expect(label.perc_sat_fat).toBe(0.25);
  expect(label.total_trans_fat).toBeCloseTo(6, 2);
  expect(label.cholesterol).toBeCloseTo(10, 2);
  expect(label.perc_cholesterol).toBeCloseTo(0.029, 2);
  expect(label.sodium).toBeCloseTo(90, 2);
  expect(label.perc_sodium).toBeCloseTo(0.152, 2);
  expect(label.total_carb).toBeCloseTo(23, 2);
  expect(label.perc_carbs).toBeCloseTo(0.127, 2);
  expect(label.dietary_fiber).toBeCloseTo(10, 2);
  expect(label.perc_dietary_fiber).toBeCloseTo(0.263, 2);
  expect(label.total_sugar).toBeCloseTo(13, 2);
  expect(label.total_protein).toBeCloseTo(14, 2);
  expect(label.perc_vit_a).toBeCloseTo(0.0875, 2);
  expect(label.perc_vit_c).toBeCloseTo(0.614, 2);
  expect(label.perc_calcium).toBeCloseTo(0.364, 2);
  expect(label.perc_iron).toBeCloseTo(0.308, 2);
});
