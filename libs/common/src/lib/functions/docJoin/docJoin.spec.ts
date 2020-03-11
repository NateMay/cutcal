import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { docJoin } from './docJoin';

it('docJoin() adds the child to the parent  - shared/functions', () => {
  // arrange
  const afsStub = {
    doc: (path: string): any => ({
      valueChanges: (): Observable<any> => of({ docToJoin: 'anything' }),
    }),
  };

  const spy = jest.spyOn(afsStub, 'doc');

  const firebaseResponse$: Observable<any> = of({
    assignmentProp: '<DOCUMENT_ID>',
    parentProp: 'should not change',
  });

  // act
  firebaseResponse$
    .pipe(
      docJoin(<any>afsStub, { assignmentProp: 'collectionName' }),

      // assert
      tap(result =>
        expect(result).toEqual({
          assignmentProp: { docToJoin: 'anything' },
          parentProp: 'should not change',
        })
      )
    )
    .subscribe()
    .unsubscribe();

  expect(spy).toHaveBeenCalledWith('collectionName/<DOCUMENT_ID>');
});
