import { convertChangeAction } from './convertChangeAction';
import { DocumentChangeAction } from '@angular/fire/firestore';

it('convertSnaps() - shared/functions', () => {
  const snaps = [
    {
      payload: {
        doc: {
          id: '12345',
          data: () => ({ obj: 'obj' })
        }
      }
    }
  ] as DocumentChangeAction<{ obj: string; }>[];

  expect(convertChangeAction(snaps)).toEqual([
    {
      _id: '12345',
      obj: 'obj'
    }
  ]);
});
