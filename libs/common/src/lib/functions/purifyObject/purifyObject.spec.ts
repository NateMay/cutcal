import { purifyObject } from './purifyObject';
describe('purifyObject() - shared/functions', () => {

  it('should remove the keys of an object is the value is undefined', () => {

    expect(
      purifyObject({
        '1': null,
        '2': 2,
        '3': undefined,
        '4': {
          'a': 'a',
          b: null
        }
      })
    ).toEqual({ '2': 2, '4': { 'a': 'a' } })

  })
})
