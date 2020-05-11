import * as express from 'express'
import * as functions from 'firebase-functions'
import { createNestApp } from './createNestApp'

const expressServer = express()

export const createServer = async (
  request: functions.https.Request,
  response: express.Response<any>
): Promise<void> => {
  await createNestApp(expressServer)
  expressServer(request, response)
}
