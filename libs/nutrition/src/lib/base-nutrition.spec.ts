import { BASE_NUTRITION } from './base-nutrition';

it('Zero Nutrition is all zeros', () => {
  const zero = BASE_NUTRITION(0);

  Object.keys(zero).forEach(key => {
    expect(zero[key]).toBe(0);
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
