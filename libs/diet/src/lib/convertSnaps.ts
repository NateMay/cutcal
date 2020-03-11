/**
 * @description Converts document snapshots into the underlying document objects with the _id added as a property
 * @param {firebase.firestore.DocumentSnapshot[]} snaps result from DocumentReference.get()
 * @returns {T[]} and array of that object with the _ids merged
 */
export const convertSnaps = <T>(
  snaps: firebase.firestore.DocumentSnapshot[]
): T[] => <T[]>snaps.map((snap: firebase.firestore.DocumentSnapshot) => ({
    _id: snap.id,
    ...(snap.data() as T),
  }))
