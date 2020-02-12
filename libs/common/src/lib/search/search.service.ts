import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SearchService {

  _focusFirst: Subject<void> = new Subject();

  get listenFocusFirst() {
    return this._focusFirst.asObservable();
  }

  focusFirst() {
    this._focusFirst.next();
  }

}
