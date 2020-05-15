import { AngularFirestore } from '@angular/fire/firestore'
import { combineLatest, defer, Observable } from 'rxjs'
import { map, switchMap, tap } from 'rxjs/operators'

/**
 * @property {string} idProperty property name of the parent which holds the reference id
 * @property {string} collection collection name of the reference document
 * @property {string} targetProp the proprty onto which the reference document should be stored
 */
export class JoinOn {
  constructor(
    public idProperty: string,
    public collection: string,
    public targetProp: string
  ) {}
}

/**
 * @description rxjs operator that joins a document from another collection onto the parent document
 * @param {AngularFirestore} afs AngularFirestore instance
 * @param {JoinOn[]} joins data needed for the join
 * @example
 *   const joins = [new JoinOn('join_id', 'join_collection', 'property' )];
 *
 *   this.db.doc$(`parent_collection/${parent_id}`).pipe(
 *     docJoin(this.afs, joins)
 *   ).subscribe();
 */
export const docJoinOn = <T>(
  afs: AngularFirestore,
  joins: JoinOn[]
): ((source: Observable<Partial<T>>) => Observable<T>) => (
  source: Observable<Partial<T>>
): Observable<T> =>
  defer(() => {
    let parentDoc: any

    return source.pipe(
      // Store the parent
      tap(doc => (parentDoc = doc)),

      // Make a call to get the reference document
      switchMap(() =>
        combineLatest(
          joins.map(join =>
            afs
              .doc(`${join.collection}/${parentDoc[join.idProperty]}`)
              .valueChanges()
          )
        )
      ),

      // Join the response onto the parent document
      map(arr => ({
        ...parentDoc,
        ...joins.reduce(
          (acc, cur, idx) => ({ ...acc, [cur.targetProp]: arr[idx] }),
          {}
        )
      }))
    )
  })
