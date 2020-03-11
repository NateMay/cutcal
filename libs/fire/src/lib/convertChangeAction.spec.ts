import { convertChangeAction } from './convertChangeAction';

it('convertSnaps() - shared/functions', () => {
  const snaps = [
    {
      payload: {
        doc: {
          id: '12345',
          data: (): any => ({ obj: 'obj' }),
        },
      },
    },
  ];

  expect(convertChangeAction(<any>snaps)).toEqual([
    {
      _id: '12345',
      obj: 'obj',
    },
  ]);
});
