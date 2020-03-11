import { DocumentChangeAction } from '@angular/fire/firestore'

/**
 * @description Converts document snapshots into the underlying document objects with the _id added as a property
 * @param {DocumentChangeAction<T>[]} snaps result from firestore snapshotChanges()
 * @returns {T[]} and array of that object with the _ids merged
 */
export const convertChangeAction = <T>(snaps: DocumentChangeAction<T>[]): T[] =>
  <T[]>snaps.map((snap: DocumentChangeAction<T>) => ({
    _id: snap.payload.doc.id,
    ...snap.payload.doc.data(),
  }))
