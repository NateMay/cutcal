import * as functions from 'firebase-functions'

export function ensureLoggedIn(
  context: functions.https.CallableContext,
  errorMessage: string = '[CutCal] Must be logged in'
): void {
  if (!(context.auth && context.auth.token)) {
    console.log(context)
    throw new functions.https.HttpsError('permission-denied', errorMessage)
  }
}
