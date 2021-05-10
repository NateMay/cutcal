import { Injectable } from '@angular/core'
@Injectable()
export class MockWindowRef {
  _window = {}
  get window(): any {
    return this._window
  }
  set window(win: any) {
    this._window = {
      ...this._window,
      ...win
    }
  }
}
