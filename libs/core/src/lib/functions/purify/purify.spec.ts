import { purifyArray, purifyObject } from './purify';
describe('purifyObject() - shared/functions', () => {
  it('should remove the keys of an object is the value is undefined', () => {
    expect(
      purifyObject({
        '0': 0,
        '1': null,
        '2': 2,
        '3': undefined,
        '4': {
          a: 'a',
          b: null
        },
        '5': ['somthing', undefined, 0, null]
      })
    ).toEqual({ '0': 0, '2': 2, '4': { a: 'a' }, '5': ['somthing', 0] });
  });
});

describe('purifyArray() - shared/functions', () => {
  it('should remove the elements of an array is the value is undefined or null', () => {
    expect(purifyArray(['somthing', undefined, 0, null])).toEqual([
      'somthing',
      0
    ]);
  });
});
