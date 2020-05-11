/* eslint-disable @typescript-eslint/no-misused-promises */
import { NestFactory } from '@nestjs/core'
import { ExpressAdapter } from '@nestjs/platform-express'
import { AppModule } from './app.module'

export const createNestApp = async (expressInstance: any): Promise<void> => {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance)
  )
  await app.init()
}
