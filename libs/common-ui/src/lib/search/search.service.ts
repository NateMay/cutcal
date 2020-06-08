import { Injectable } from '@angular/core'
import { Observable, Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private _focusFirst: Subject<void> = new Subject()

  get listenFocusFirst(): Observable<void> {
    return this._focusFirst.asObservable()
  }

  focusFirst(): void {
    this._focusFirst.next()
  }
}
