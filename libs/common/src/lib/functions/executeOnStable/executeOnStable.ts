import { NgZone } from '@angular/core'
import { first } from 'rxjs/operators'

/**
 * @description Executes the provided function after the microtask queue is empty
 * @param {NgZone} ngZone component's instance of NgZone
 * @param {Function} function to execute
 * @returns {void}
 * @example
 *   executeOnStable(ngZone, () => button.focus());
 */

export function executeOnStable(ngZone: NgZone, func: () => any): void {
  ngZone.runOutsideAngular(() =>
    ngZone.onStable
      .asObservable()
      .pipe(first())
      .subscribe(() => func())
  )
}
