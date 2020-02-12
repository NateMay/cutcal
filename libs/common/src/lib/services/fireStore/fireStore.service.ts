/* tslint:disable:max-line-length*/
import { Injectable } from '@angular/core'
import {
  Action,
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  DocumentChangeAction,
  DocumentSnapshotDoesNotExist,
  DocumentSnapshotExists,
  QueryFn,
} from '@angular/fire/firestore'
import * as firebase from 'firebase/app'
import { Observable } from 'rxjs'
import { first, map, tap } from 'rxjs/operators'
import { convertChangeAction } from '../../functions/convertChangeAction/convertChangeAction'

type CollectionPredicate<T> = string | AngularFirestoreCollection<T>
type DocPredicate<T> = string | AngularFirestoreDocument<T>

/**
 * Service full of FireStore querying helper methods
 * @source [Angular-Firebase] https://angularfirebase.com/lessons/firestore-advanced-usage-angularfire/
 * @refrence [set-add-update-upsert] https://stackoverflow.com/questions/46597327/difference-between-set-with-merge-true-and-update
 * @refrence [Query-Techniques] https://www.youtube.com/watch?v=35RlydUf6xo
 * @example
 *   photo = '../assets/images/april.jpg';
 *
 *   <img [style.background-image]="'url(' + photo + ')' | sanitize">
 */
@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  get serverTimestamp() {
    return firebase.firestore.FieldValue.serverTimestamp()
  }

  constructor(private afs: AngularFirestore) {}

  // #region Get Reference

  /**
   * Returns a collection reference
   * @param {CollectionPredicate<T>} ref name of the collection or ref
   * @param {Function} queryFn The function to restrict.
   * @returns {AngularFirestoreCollection} collection reference
   * @example notesRef: AngularFireList = this.db.col('foods');
   */
  col<T>(
    ref: CollectionPredicate<T>,
    queryFn?: QueryFn
  ): AngularFirestoreCollection<T> {
    return typeof ref === 'string' ? this.afs.collection<T>(ref, queryFn) : ref
  }

  /**
   * Returns a doc reference
   * @param {DocPredicate<T>} ref path to the doc
   * @returns {AngularFirestoreDocument} doc reference
   * @example
   *    noteRef: AngularFireList = this.db.doc('notes/ID');
   *    this.db.doc(noteRef)
   *    this.noteRef.valueChanges()
   */
  doc<T>(ref: DocPredicate<T>): AngularFirestoreDocument<T> {
    return typeof ref === 'string' ? this.afs.doc<T>(ref) : ref
  }

  // #region GET Data

  /**
   * Returns a doc
   * @param {DocPredicate<T>} ref path to the doc or reference
   * @returns {Observable<T>} Observable of doc
   * @example this.db.doc$('notes/ID')
   */
  doc$<T>(ref: DocPredicate<T>): Observable<T> {
    return this.doc(ref)
      .snapshotChanges()
      .pipe(
        map(
          (
            doc: Action<
              DocumentSnapshotDoesNotExist | DocumentSnapshotExists<T>
            >
          ) => {
            return doc.payload.data() as T
          }
        )
      )
  }

  /**
   * Returns a doc
   * @param {DocPredicate<T>} ref path to the doc or reference
   * @returns {Observable<T>} Observable of the data object
   * @example this.db.doc$('notes/ID')
   */
  docWithId$<T>(ref: DocPredicate<T>): Observable<any> {
    return this.doc(ref)
      .snapshotChanges()
      .pipe(
        map(
          (
            doc: Action<
              DocumentSnapshotDoesNotExist | DocumentSnapshotExists<T>
            >
          ) => {
            const data = doc.payload.data() as T
            const _id = doc.payload.id
            return { _id, ...data }
          }
        )
      )
  }

  /**
   * Returns a collection
   * @param {CollectionPredicate<T>} ref name of the collection or reference
   * @param {Function} queryFn The function to restrict.
   * @returns {Observable<T>} Observable of collection
   * @example db.col$('notes')
   */
  col$<T>(ref: CollectionPredicate<T>, queryFn?: QueryFn): Observable<T[]> {
    return this.col(ref, queryFn)
      .snapshotChanges()
      .pipe(
        map((docs: Array<DocumentChangeAction<T>>) => {
          return docs.map((a: DocumentChangeAction<T>) =>
            a.payload.doc.data()
          ) as T[]
        })
      )
  }

  /**
   * Returns a collection with the doc reference as a property on the object
   * @param {CollectionPredicate<T>} ref name of the collection or reference
   * @param {Function} queryFn The function to restrict.
   * @returns {Observable<T + doc.id>} Observable of collection with _id field from ref.id
   * @example db.colWithIds$('notes')
   */
  colWithIds$<T>(
    ref: CollectionPredicate<T>,
    queryFn?: QueryFn
  ): Observable<T[]> {
    return this.col(ref, queryFn)
      .snapshotChanges()
      .pipe(map(convertChangeAction))
  }

  // #region Alter Data

  /**
   * Overwrites or Creates a Document with timestamps
   * @param {DocPredicate<T>} ref name of the collection
   * @param {any} data The function to restrict.
   * @returns {Promise<DocumentReference>} Returns a Success Promise
   * @example db.set('items/_id', data)
   */
  set<T>(ref: DocPredicate<T>, data: any): Promise<void> {
    const stamp = this.serverTimestamp
    return this.doc(ref).set({
      ...data,
      updatedAt: stamp,
      createdAt: stamp,
    })
  }

  /**
   * Updates a document to the specified collection updating the timestamp
   * @param {DocPredicate<T>} ref name of the collection
   * @param {any} data The function to restrict.
   * @returns {Promise<DocumentReference>} Returns a Success Promise
   * @example db.update('items/_id', data)
   */
  update<T>(ref: DocPredicate<T>, data: any): Promise<void> {
    return this.doc(ref).update({
      ...data,
      updatedAt: this.serverTimestamp,
    })
  }

  /**
   * Deletes a document
   * @param {DocPredicate<T>} ref name of the collection
   * @returns {Promise<void>} Returns a Success Promise
   * @example db.delete('items/_id') })
   */
  delete<T>(ref: DocPredicate<T>): Promise<void> {
    return this.doc(ref).delete()
  }

  /**
   * Creates a document to the specified collection adding timestamps
   * @param {CollectionPredicate<T>} ref name of the collection
   * @param {any} data The function to restrict.
   * @returns {Promise<DocumentReference>} Returns the Document Reference
   * @example
   *   db.add('items', data)
   */
  add<T>(
    ref: CollectionPredicate<T>,
    data: any
  ): Promise<firebase.firestore.DocumentReference> {
    const stamp = this.serverTimestamp
    return this.col(ref).add({
      ...data,
      updatedAt: stamp,
      createdAt: stamp,
    })
  }

  /**
   * Creates a document or updates non-destructively (only adds property)
   * @param {DocPredicate<T>} ref path to doc or reference
   * @param {any} data The function to restrict.
   * @returns {Promise<void>} Returns a Success Promise
   * @example
   *  this.db.upsert('notes/xyz', { content: 'hello dude' })
   */
  upsert<T>(ref: DocPredicate<T>, data: any): Promise<void> {
    const doc = this.doc(ref)
      .snapshotChanges()
      .pipe(first())
      .toPromise()
    return doc.then(
      (
        snap: Action<DocumentSnapshotDoesNotExist | DocumentSnapshotExists<T>>
      ) => {
        return snap.payload.exists
          ? this.update(ref, data)
          : this.set(ref, data)
      }
    )
  }

  // #region Inspect Data

  /**
   * console.log()s the doc
   * @param {DocPredicate<T>} ref path to doc or reference
   * @returns {void}
   * @example this.db.inspectDoc('notes/xyz')
   */
  inspectDoc(ref: DocPredicate<any>): void {
    const tick = new Date().getTime()
    this.doc(ref)
      .snapshotChanges()
      .pipe(
        first(),
        tap(
          (
            d: Action<
              DocumentSnapshotDoesNotExist | DocumentSnapshotExists<any>
            >
          ) => {
            const tock = new Date().getTime() - tick
            console.log(`Loaded Document in ${tock}ms`, d)
          }
        )
      )
      .subscribe()
  }

  /**
   * console.log()s the doc load time
   * @param {CollectionPredicate<T>} ref name of the collection or reference
   * @returns {void}
   * @example this.db.inspectCol('notes')
   */
  inspectCol(ref: CollectionPredicate<any>): void {
    const tick = new Date().getTime()
    this.col(ref)
      .snapshotChanges()
      .pipe(
        first(),
        tap((c: Array<DocumentChangeAction<any>>) => {
          const tock = new Date().getTime() - tick
          console.log(`Loaded Collection in ${tock}ms`, c)
        })
      )
      .subscribe()
  }

  /**
   * Starts a batch for an atomic write
   * @returns {WriteBatch}
   */
  get batch(): firebase.firestore.WriteBatch {
    return this.afs.firestore.batch()
  }

  get newId() {
    return this.afs.createId()
  }
}
