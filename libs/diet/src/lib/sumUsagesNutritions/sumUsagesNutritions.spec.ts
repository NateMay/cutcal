import { sumUsagesNutritions } from './sumUsagesNutritions';
import { KVP } from '@cutcal/core';
import { Usage } from '../usage';
import { Food } from '../food';

describe('sumUsagesNutritions() - shared/functions', () => {
  it('should work for mulitple usages and foods', () => {
    const usages: KVP<Usage> = {
      '1': {
        unit: 'lb',
        quantity: 1,
        foodId: '1',
        _id: '1',
        parentId: null,
        rootId: null
      }
    };

    const foods: KVP<Food> = {
      '1': {
        name: '',
        defaultPortion: {
          unit: 'g',
          quantity: 1
        },
        portions: {
          g: {
            unit: 'g',
            quantity: 500
          }
        },
        nutrition: {
          calories: 12
        }
      }
    };

    expect(sumUsagesNutritions(usages, foods)).toEqual({
      calories: 13.227746521102665
    });
  });
});
