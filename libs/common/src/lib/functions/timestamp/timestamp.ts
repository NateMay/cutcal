import { firestore } from 'firebase/app';

/**
 * Creates a firebase timestamp
 * @param {Date} date date of the timestamp
 */

export function timestamp(date: Date = new Date()): firestore.Timestamp {
  return firestore.Timestamp.fromDate(date)
}
