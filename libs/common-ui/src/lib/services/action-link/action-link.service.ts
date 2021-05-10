import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, ParamMap } from '@angular/router'
import { KVP } from '@cutcal/core'
import { Observable, Subject } from 'rxjs'
import { filter, map } from 'rxjs/operators'

/** Actinng as a CanActivate guard to intercept routing actions */
@Injectable()
export class ActionLinkObserver implements CanActivate {
  private observers$ = new Subject<ActivatedRouteSnapshot>()

  // Implements single route user authentication guarding
  canActivate(route: ActivatedRouteSnapshot): boolean {
    // Pushes the snapshot for observers to react, eventually
    this.observers$.next(route)
    // Always prevents the real routing
    return false
  }

  /** @description Turns a ParamMap into an object */
  private extract(params: ParamMap): { [key: string]: string } | undefined {
    // Skips when no params are present
    if (!params || params.keys.length <= 0) {
      return undefined
    }
    // Reduces the keys arrayn into the resulting object
    return params.keys.reduce((obj: KVP<any>, key: string) => {
      // Adds the single key, value pair
      obj[key] = params.get(key)
      return obj
    }, {})
  }

  /** @description Register the observer returning the observable emitting on the specified action(s) */
  public register(
    ...actions: string[]
  ): Observable<{ [key: string]: string } | undefined> {
    return this.observers$.pipe(
      // Filters the request based on the action code
      filter((request) =>
        actions.some((action) => {
          const config = request.routeConfig
          if (!config) return false
          return config.path === action
        })
      ),
      // Emits the route's quesy parameters' map as an object
      map((route) => this.extract(route.queryParamMap))
    )
  }
}
