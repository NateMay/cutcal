import * as functions from 'firebase-functions'

export function ensureLoggedIn(context: functions.https.CallableContext): void {
  if (!(context.auth && context.auth.token)) {
    console.log(context)
    throw new functions.https.HttpsError(
      'permission-denied',
      'Must be logged in to initiate delete.'
    )
  }
}
