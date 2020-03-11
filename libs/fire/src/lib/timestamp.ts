import { firestore } from 'firebase/app'

/**
 * @description Creates a firebase timestamp
 * @param {Date} date date of the timestamp
 */

export const timestamp = (date: Date = new Date()): firestore.Timestamp =>
  firestore.Timestamp.fromDate(date)
