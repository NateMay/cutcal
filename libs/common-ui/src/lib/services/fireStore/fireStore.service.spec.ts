import { inject, TestBed } from '@angular/core/testing';
import { AngularFireModule, FirebaseApp } from '@angular/fire';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  AngularFirestoreModule
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FirestoreService } from './fireStore.service';

// TEST https://github.com/angular/angularfire2/blob/master/src/firestore/collection/collection.spec.ts

// async function collectionHarness(afs: AngularFirestore, items: number, queryFn?: QueryFn) {
//   const randomCollectionName = randomName(afs.firestore);
//   const ref = afs.firestore.collection(`${randomCollectionName}`);
//   if(!queryFn) { queryFn = (ref) => ref; }
//   const stocks = new AngularFirestoreCollection<Stock>(ref, queryFn(ref), afs);
//   let names = await createRandomStocks(afs.firestore, ref, items);
//   return { randomCollectionName, ref, stocks, names };
// }

describe('AngularFirestore', () => {
  let app: FirebaseApp;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let afs: AngularFirestore;
  let service: FirestoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        // TEST https://github.com/soumak77/firebase-mock
        AngularFireModule.initializeApp({
          apiKey: 'A;kjsbdfkjabsd;kjabscoidaoiabvpabdv',
          authDomain: 'kjhadsfkpjhsdlfkjhasd.firebaseapp.com',
          databaseURL: 'https://angularfirestore.firebaseio.com',
          projectId: 'kjnd;kcjz;cvkjnsdvkj',
          storageBucket: 'angularfirestore.appspot.com',
          messagingSenderId: '7i623471298410'
        }),
        AngularFirestoreModule
      ]
    });
    inject(
      [FirebaseApp, AngularFirestore, FirestoreService],
      (_app: FirebaseApp, _afs: AngularFirestore, _fsSvc: FirestoreService) => {
        app = _app;
        afs = _afs;
        service = _fsSvc;
      }
    )();
  });

  afterEach((done) => {
    // can't await here https://github.com/firebase/firebase-js-sdk/issues/605
    app.delete();
    done();
  });

  it('col() returns a AngularFirestoreCollection when a predicate is passed', () => {
    const col = service.col('path/to/doc');
    expect(col instanceof AngularFirestoreCollection).toBe(true);
  });

  it('doc() returns a AngularFirestoreDocument when a predicate is passed', () => {
    const doc = service.doc('path/to/a/document');
    expect(doc instanceof AngularFirestoreDocument).toBe(true);
  });

  // TEST (firestore-service) mock
  it('col$() returns an Observable when a predicate is passed', () => {
    const ob$ = service.col$('path/to/doc');
    expect(ob$ instanceof Observable).toBe(true);
  });

  // TEST (firestore-service) mock
  it('doc$() returns a AngularFirestoreDocument when a predicate is passed', () => {
    const ob$ = service.doc$('path/to/a/document');
    expect(ob$ instanceof Observable).toBe(true);
  });

  // TEST (firestore-service) mock
  it('docWithId$() returns a AngularFirestoreDocument when a predicate is passed', () => {
    const ob$ = service.docWithId$('path/to/a/document');
    expect(ob$ instanceof Observable).toBe(true);
  });

  it('colWithIds$() returns an Observable when a predicate is passed', () => {
    const ob$ = service.colWithIds$('path/to/doc');
    expect(ob$ instanceof Observable).toBe(true);
  });

  it('set() returns a Promise', () => {
    const doc = service.doc('path/to/a/document');
    const promise = service.set(doc, {});
    expect(promise instanceof Promise).toBe(true);
  });

  it('update() returns a Promise', () => {
    const doc = service.doc('path/to/a/document');
    const promise = service.update(doc, {});
    expect(promise instanceof Promise).toBe(true);
  });

  // TEST (firestore-service) mock
  it('upsert() returns a Promise', () => {
    const doc = service.doc('path/to/a/document');
    const promise = service.upsert(doc, {});
    expect(promise instanceof Promise).toBe(true);
  });

  it('add() returns a Promise', () => {
    const col = service.col('path/to/doc');
    const promise = service.add(col, {});
    expect(promise instanceof Promise).toBe(true);
  });

  it('delete() returns a Promise', () => {
    const doc = service.doc('path/to/a/document');
    const promise = service.delete(doc);
    expect(promise instanceof Promise).toBe(true);
  });

  // TEST (firestore-service) mock
  it('inspectCol() returns a Promise', () => {
    const spy = jest.spyOn(Date.prototype, 'getTime');
    const col = service.col('path/to/doc');
    service.inspectCol(col);
    expect(spy).toHaveBeenCalled();
  });

  // TEST (firestore-service) mock
  it('inspectDoc() returns a Promise', () => {
    const spy = jest.spyOn(Date.prototype, 'getTime');
    const doc = service.doc('path/to/a/document');
    service.inspectDoc(doc);
    expect(spy).toHaveBeenCalled();
  });
});
