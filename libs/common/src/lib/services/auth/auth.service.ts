import { Injectable } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { BehaviorSubject, Observable } from 'rxjs'
import { filter, tap } from 'rxjs/operators'
import { AppState } from '../redux/app.state'
import { userSelector } from './auth.store'

@Injectable()
export class AuthService {
  private _activeUid = new BehaviorSubject<string>('')
  get activeUid() {
    return this._activeUid.getValue()
  }
  get activeUser$(): Observable<string> {
    return this._activeUid.asObservable()
  }

  private _trueUid = new BehaviorSubject<string>('')
  get trueUid() {
    return this._trueUid.getValue()
  }
  get user$(): Observable<string> {
    return this._trueUid.asObservable()
  }

  constructor(private store: Store<AppState>) {
    this.store
      .pipe(
        select(userSelector),
        filter(user => !!user),
        tap(user => this._activeUid.next(user.uid)), // TODO (permission) change logic
        tap(user => this._trueUid.next(user.uid))
      )
      .subscribe()
  }
}
