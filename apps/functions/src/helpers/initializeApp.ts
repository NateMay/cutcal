import * as admin from 'firebase-admin'

// prevent reinitialization for test watching
if (!admin.apps.length) {
  admin.initializeApp()
}

export const firestore = admin.firestore()
