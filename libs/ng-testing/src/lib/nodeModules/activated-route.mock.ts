import { Injectable } from '@angular/core'
import { Params } from '@angular/router'
import { Subject } from 'rxjs'

@Injectable()
export class MockActivedRoute {
  data: any

  private _params = new Subject()

  snapshot: Params

  get params() {
    return this._params.asObservable()
  }
  set params(params: Params) {
    this._params.next(params)
    this.snapshot = { params }
  }
}
