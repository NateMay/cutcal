import { updateNutritions } from './updateNutritions';

describe('updateNutritions - shared/functions', () => {

  it('adds nutritions', () => {

    const nutr1 = { calories: 12, water: 3 };
    const nutr2 = { calories: 2, fat: 4 };

    expect(updateNutritions('add', nutr1, nutr2))
      .toEqual({ calories: 14, water: 3, fat: 4 });
  })

  it('subtracts nutritions', () => {

    const nutr1 = { calories: 12, water: 3 };
    const nutr2 = { calories: 2, fat: 4 };

    expect(updateNutritions('subtract', nutr1, nutr2))
      .toEqual({ calories: 10, water: 3, fat: 0 })
  })
})
