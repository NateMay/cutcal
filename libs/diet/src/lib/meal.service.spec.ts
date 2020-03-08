import { TestBed } from '@angular/core/testing';
import { AngularFireFunctions } from '@angular/fire/functions';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from '@cutcal/auth';
import { reducers } from '@cutcal/common';
import { STRICT_RUNTIME_CHECKS } from '@cutcal/core';
import { StoreModule } from '@ngrx/store';
import { values } from 'lodash';
import { first } from 'rxjs/operators';
import { bread, jam } from '../../../../data/food-seed';
import {
  lunch1,
  lunch1_bread,
  lunch1_id,
  lunch1_jam,
  lunch1_pb,
} from '../../../../data/meal-seed';
import { peanutButter } from './../../../../data/food-seed';
import { MealService } from './meal.service';

// FIXME
xdescribe('MealService', () => {
  let mealSvc: MealService;

  // const dbSpy = createSpyObj<FirestoreService>([
  //   'docWithId$',
  //   'colWithIds$',
  //   'add',
  //   'delete',
  //   'upsert',
  // ]);

  const storageStub = {
    storage: {
      refFromURL: () => ({ delete: () => {} }),
    },
  };

  const fnsStub = {
    httpsCallable: () => {},
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(
          {
            ...reducers,
            // auth: authReducer,
          },
          STRICT_RUNTIME_CHECKS
        ),
      ],
      providers: [
        MealService,
        { provide: AngularFireStorage, useValue: storageStub },
        // { provide: FirestoreService, useValue: dbSpy },
        { provide: AuthService, useValue: { uid: '#userId#' } },
        { provide: AngularFireFunctions, useValue: fnsStub },
      ],
    });

    mealSvc = TestBed.inject(MealService);
  });

  it('injects the meal service', () => {
    expect(mealSvc).toBeTruthy();
  });

  it('injects the meal service', () => {
    // dbSpy.docWithId$.and.returnValues(
    //   of(lunch1),
    //   of(peanutButter),
    //   of(jam),
    //   of(bread)
    // );

    // dbSpy.colWithIds$.and.returnValue(
    //   of([lunch1_pb, lunch1_jam, lunch1_bread])
    // );

    let returned = false;

    mealSvc
      .getMealUsagesFoods(lunch1_id)
      .pipe(first())
      .subscribe(([meal, usages, foods]) => {
        returned = true;
        expect(meal).toEqual(lunch1);
        expect(values(usages)).toEqual([lunch1_pb, lunch1_jam, lunch1_bread]);
        expect(values(foods)).toEqual([peanutButter, jam, bread]);
      });

    expect(returned).toBe(true);
  });
});
