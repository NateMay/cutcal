import { createNutritionRange } from './daily-value';

describe('NutritionRange class', () => {
  it('should set from RDA and UL if provided', () => {
    const result = createNutritionRange(4, 30, 'g', 10, 60);

    expect(result).toEqual({
      unit: 'g',
      EAR: 4,
      AI: 30,
      UL: 60,
      RDA: 10,
    });
  });

  it('should calulate high and low i', () => {
    const result = createNutritionRange(10, 30, 'g');

    expect(result).toEqual({
      unit: 'g',
      EAR: 10,
      AI: 30,
      UL: 26,
      RDA: 14,
    });
  });
});
