// TODO move to @cutcal/fire
import { firestore } from 'firebase/app'

/**
 * @description Converts document snapshots into the underlying document objects with the _id added as a property
 * @param {firebase.firestore.DocumentSnapshot[]} snaps result from DocumentReference.get()
 * @returns {T[]} and array of that object with the _ids merged
 */
export const convertSnaps = <T>(
  snaps: firestore.DocumentSnapshot[]
): T[] => <T[]>snaps.map((snap: firestore.DocumentSnapshot) => ({
    _id: snap.id,
    ...(snap.data() as T)
  }))
