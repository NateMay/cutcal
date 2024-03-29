import { Injectable } from '@angular/core'
import { Params, RouterStateSnapshot } from '@angular/router'
import { RouterStateSerializer } from '@ngrx/router-store'

export interface RouterStateUrl {
  url: string
  params: Params
  queryParams: Params
}

/**
 * @description required for the RouterStore to work properly
 */
@Injectable()
export class CustomSerializer implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    let route = routerState.root

    while (route.firstChild) {
      route = route.firstChild
    }

    const {
      url,
      root: { queryParams }
    } = routerState
    const { params } = route

    // Only return an object including the URL, params and query params
    // instead of the entire snapshot
    return { url, params, queryParams }
  }
}
