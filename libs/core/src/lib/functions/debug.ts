import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

export enum RxjsLoggingLevel {
  TRACE,
  DEBUG,
  INFO,
  ERROR
}

let rxjsLoggingLevel = RxjsLoggingLevel.INFO

export const setRxjsLoggingLevel = (level: RxjsLoggingLevel) =>
  (rxjsLoggingLevel = level)

export const debug = (level: RxjsLoggingLevel, message: string) => (
  source: Observable<any>
) =>
  source.pipe(
    tap((value) => {
      if (level > rxjsLoggingLevel) {
        console.log(`debug() - ${message}:`, value)
      }
    })
  )
