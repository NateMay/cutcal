import { Injectable } from '@angular/core'

@Injectable()
export class MockAngularFirestore {
  set collectionValue(value: any) {
    this._collectionValue = value
  }
  set docValue(value: any) {
    this._docValue = value
  }

  _collectionValue: any

  _docValue: any
  collection(...args: any) {
    return this._collectionValue
  }
  doc(...args: any) {
    return this._docValue
  }
}
