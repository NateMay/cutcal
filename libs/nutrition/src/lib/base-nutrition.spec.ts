import { forEach } from 'lodash';
import { BASE_NUTRITION } from './base-nutrition';

it('Zero Nutrition is all zeros', () => {
  forEach(BASE_NUTRITION(0), value => {
    expect(value).toBe(0);
  });
});

const nutritionMemberCount = 225;

it(`Zero Nutrition has ${nutritionMemberCount}`, () => {
  const zero = BASE_NUTRITION(0);
  let keysCount = 0;

  Object.keys(zero).forEach(key => {
    keysCount++;
  });

  expect(keysCount).toBe(nutritionMemberCount);
});
