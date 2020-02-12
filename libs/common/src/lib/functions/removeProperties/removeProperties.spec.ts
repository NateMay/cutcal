

import { removePropsDeeply } from './removeProperties';
describe('removePropsDeeply() - shared/functions', () => {

  it('removePropsDeeply() - shared/functions - removes selected properties recursively ', () => {

    const object1 = {
      remove: 'no go',
      stay: 'hi',
      stay2: {
        remove: 'should be gone',
        stay: 'hi',
        stay3: {
          andThis: true,
          remove: 'bye bye',
          stay: 'hi'
        }
      }
    }

    expect(
      removePropsDeeply(object1, ['remove', 'andThis'])
    ).toEqual({
      stay: 'hi',
      stay2: {
        stay: 'hi',
        stay3: {
          stay: 'hi'
        }
      }
    })

    expect(
      removePropsDeeply({
        '1': 1,
        '2': 2,
        '3': 3
      }, ['1', '3'])
    ).toEqual({
      '2': 2
    })

  })
})
