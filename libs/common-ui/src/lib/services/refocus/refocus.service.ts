import { Injectable, NgZone } from '@angular/core'
import { NavigationEnd, Router } from '@angular/router'
import { throwError } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import { onStable } from '../../functions/onStable/onStable'

/**
 * Service which recasts focus to an element after some disruptive operation
 */

@Injectable({
  providedIn: 'root'
})
export class RefocusService {
  id!: string | null
  refocus: boolean = false

  constructor(
    private readonly router: Router,
    private readonly ngZone: NgZone
  ) {
    this.router.events
      .pipe(
        tap((event) => {
          if (this.refocus && event instanceof NavigationEnd) {
            this.refocus = false
            onStable(this.ngZone, () => {
              if (this.id) {
                const element = document.getElementById(this.id)
                if (element) element.focus()
              }
            })
          }
        }),
        catchError((e) => throwError(e))
      )
      .subscribe()
  }

  reCastFocusId(id: string): void {
    this.id = id
    this.refocus = true
  }
}
