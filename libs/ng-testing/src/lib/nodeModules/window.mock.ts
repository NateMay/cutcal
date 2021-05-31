import { Injectable } from '@angular/core'
@Injectable()
export class MockWindowRef {
  _window = {}
  get window(): Partial<Window> | null {
    return this._window
  }
  set window(win: Partial<Window> | null) {
    this._window = {
      ...this._window,
      ...win
    }
  }
}
