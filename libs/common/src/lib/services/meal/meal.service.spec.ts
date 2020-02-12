import { TestBed } from '@angular/core/testing';
import { AngularFireFunctions } from '@angular/fire/functions';
import { AngularFireStorage } from '@angular/fire/storage';
import { StoreModule } from '@ngrx/store';
import * as _ from 'lodash';
import { of } from 'rxjs';
import { first } from 'rxjs/operators';
import {
  bread,
  jam,
  peanutButter,
} from '../../../../../batches/data/food-seed';
import {
  lunch1,
  lunch1_bread,
  lunch1_id,
  lunch1_jam,
  lunch1_pb,
} from '../../../../../batches/data/meal-seed';
import { RUNTIME_CHECKS } from '../../../../testing/ngrx-runtime-config';
import { AuthService } from '../../../auth/auth.service';
import { authReducer } from '../../../auth/auth.store';
import { reducers } from '../../../redux/app.state';
import { FirestoreService } from '../fireStore/fireStore.service';
import { MealService } from './meal.service';

// DEPENDS ON (recipe) then TEST (meal-service)

describe('MealService', () => {
  let mealSvc: MealService;

  const dbSpy = jasmine.createSpyObj<FirestoreService>([
    'docWithId$',
    'colWithIds$',
    'add',
    'delete',
    'upsert',
  ]);

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
            auth: authReducer,
          },
          RUNTIME_CHECKS
        ),
      ],
      providers: [
        MealService,
        { provide: AngularFireStorage, useValue: storageStub },
        { provide: FirestoreService, useValue: dbSpy },
        { provide: AuthService, useValue: { uid: '#userId#' } },
        { provide: AngularFireFunctions, useValue: fnsStub },
      ],
    });

    mealSvc = TestBed.get(MealService);
  });

  it('injects the meal service', () => {
    expect(mealSvc).toBeTruthy();
  });

  it('injects the meal service', () => {
    dbSpy.docWithId$.and.returnValues(
      of(lunch1),
      of(peanutButter),
      of(jam),
      of(bread)
    );

    dbSpy.colWithIds$.and.returnValue(
      of([lunch1_pb, lunch1_jam, lunch1_bread])
    );

    let returned = false;

    mealSvc
      .getMealUsagesFoods(lunch1_id)
      .pipe(first())
      .subscribe(([meal, usages, foods]) => {
        returned = true;
        expect(meal).toEqual(lunch1);
        expect(_.values(usages)).toEqual([lunch1_pb, lunch1_jam, lunch1_bread]);
        expect(_.values(foods)).toEqual([peanutButter, jam, bread]);
      });

    expect(returned).toBe(true);
  });
});
