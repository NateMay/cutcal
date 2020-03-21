import { addPortion, scaleNutrition } from './convertNutrition';

// TEST (convert) test more

describe('scaleNutrition() - shared/functions', () => {
  it('should work for mulitple usages and foods', () => {
    const usage: any = {
      unit: 'lb',
      quantity: 1,
      foodId: '1',
    };

    const food: any = {
      portions: {
        g: {
          unit: 'g',
          quantity: 500,
        },
      },
      nutrition: {
        calories: 12,
      },
    };

    expect(scaleNutrition(usage, food)).toEqual({
      calories: 13.227746521102665,
    });
  });
});

describe('addPortion() - shared/functions', () => {
  it('', () => {
    const result = addPortion({ unit: 'g', quantity: 3000 }).to({
      unit: 'kg',
      quantity: 1,
    });
    expect(result).toBe(4);
  });
});
