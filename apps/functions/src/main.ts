/* eslint-disable @typescript-eslint/no-misused-promises */
import { NestFactory } from '@nestjs/core'
import { ExpressAdapter } from '@nestjs/platform-express'
import * as express from 'express'
import * as functions from 'firebase-functions'
import { AppModule } from './app.module'

const expressServer = express()

const createFunction = async (expressInstance: any): Promise<void> => {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance)
  )

  await app.init()
}

export const api = functions
  .region('us-central1')
  .https.onRequest(async (request, response) => {
    await createFunction(expressServer)
    expressServer(request, response)
  })

/**
 * @enpoint https://us-central1-cutcal.cloudfunctions.net/helloWorld
 */
export const helloWorld = functions.https.onRequest((request, response) => {
  response.send('Hello from Firebase 2!')
})

export const addFood = functions.https.onCall(
  (data, context) => `FDC item:: ${data.fdcId}`
)
