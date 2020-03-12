import { removeDups } from './removeDups';

it('should remove duplicates', () => {
  expect(removeDups([1, 2, 2, 3, 4, 5, 6, 6])).toEqual([1, 2, 3, 4, 5, 6]);
  expect(removeDups(['one', 'two', 'one', 'three'])).toEqual([
    'one',
    'two',
    'three',
  ]);
  expect(
    removeDups([
      true,
      {},
      false,
      3,
      null,
      'happy',
      3,
      undefined,
      {},
      true,
      false,
      'happy',
      undefined,
      'sad',
      5,
    ])
  ).toEqual([true, {}, false, 3, null, 'happy', undefined, {}, 'sad', 5]);
});
