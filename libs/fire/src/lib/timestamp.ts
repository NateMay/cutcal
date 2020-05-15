import { firestore } from 'firebase/app'

/**
 * @description Creates a firebase timestamp
 * @param {Date} date date of the timestamp
 * @note I don't think this can be tested
 * @note This can only be used on the frontent use admin
 * on the backend admin.firestore.Timestamp
 */

export const timestamp = (date: Date = new Date()): firestore.Timestamp =>
  firestore.Timestamp.fromDate(date)
