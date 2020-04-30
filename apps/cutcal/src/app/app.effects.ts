import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { createAction } from '@ngrx/store'
import { tap } from 'rxjs/operators'

export const logout = createAction('[Auth] Logout')

@Injectable()
export class AppEffects {
  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logout),
        tap(() => {
          localStorage.removeItem('user')
        }),
        tap(() => {
          this.router.navigate(['/'])
        })
      ),
    { dispatch: false }
  )

  constructor(
    private readonly actions$: Actions,
    private readonly router: Router
  ) {}
}
