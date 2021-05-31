import { NgZone } from '@angular/core'
import { first } from 'rxjs/operators'

/**
 * @description Executes the provided function after the microtask queue is empty
 * @param {NgZone} ngZone component's instance of NgZone
 * @param function to execute
 * @returns {void}
 * @example
 *   onStable(ngZone, () => button.focus());
 */

export function onStable(ngZone: NgZone, func: () => void): void {
  ngZone.runOutsideAngular(() =>
    ngZone.onStable
      .asObservable()
      .pipe(first())
      .subscribe(() => func())
  )
}
