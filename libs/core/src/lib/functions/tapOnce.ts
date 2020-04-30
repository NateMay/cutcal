import { defer, Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

export const tapOnce = <T>(fn: (value: any) => void) => (
  source: Observable<any>
): Observable<T> =>
  defer(() => {
    let first = true
    return source.pipe(
      tap<T>(payload => {
        if (first) {
          fn(payload)
        }
        first = false
      })
    )
  })
