import { sumUsagesNutritions } from './sumUsagesNutritions';

describe('sumUsagesNutritions() - shared/functions', () => {
  it('should work for mulitple usages and foods', () => {
    const usages = {
      '1': {
        unit: 'lb',
        quantity: 1,
        foodId: '1',
      },
    };

    const foods = {
      '1': {
        portions: {
          g: {
            unit: 'g',
            quantity: 500,
          },
        },
        nutrition: {
          calories: 12,
        },
      },
    };

    expect(sumUsagesNutritions(<any>usages, <any>foods)).toEqual({
      calories: 13.227746521102665,
    });
  });
});
