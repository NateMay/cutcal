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
  collection(): any {
    return this._collectionValue
  }
  doc(): any {
    return this._docValue
  }
}
