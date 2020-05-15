import { AngularFirestore } from '@angular/fire/firestore'
import { KVP } from '@cutcal/core'
import { combineLatest, defer, Observable } from 'rxjs'
import { map, switchMap, tap } from 'rxjs/operators'

/**
 * @description rxjs operator that joins a document from another collection onto any property
 * storing the string id reference to that document
 * @param {AngularFirestore} afs AngularFirestore instance
 * @param {KVP<string>} paths properties of the parent document to which the the reference
 * document should be assigned. In the example below, the original value of "assignmentProperty"
 * should be the document id of the document that you want to join.
 * - NOTE: in the example above, the original value of "assignmentProperty" should be the document
 * id of the document that you want to join
 * @example
 *   this.db.doc$(`parent_collection/${parent_id}`).pipe(
 *     docJoin(this.afs, { assignmentProperty: 'reference_collection' })
 *   )
 */
export const docJoin = <T>(
  afs: AngularFirestore,
  paths: KVP<string>
): ((source: Observable<Partial<T>>) => Observable<T>) => (
  source: Observable<Partial<T>>
): Observable<T> =>
  defer(() => {
    let parentDoc: any

    const keys = Object.keys(paths)

    return source.pipe(
      // Save the parent data state
      tap(doc => (parentDoc = doc)),

      // make a call to get the reference document
      switchMap(() =>
        combineLatest(
          keys.map(k => afs.doc(`${paths[k]}/${parentDoc[k]}`).valueChanges())
        )
      ),

      // join the response onto the parent document
      map(arr => ({
        ...parentDoc,
        ...keys.reduce((acc, cur, idx) => ({ ...acc, [cur]: arr[idx] }), {})
      }))
    )
  })
