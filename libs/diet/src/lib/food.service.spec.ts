import { TestBed } from '@angular/core/testing';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from '@cutcal/auth';
import { FirestoreService } from '@cutcal/fire';
import { FoodService } from './food.service';

// DEPENDS ON (recipe) then TEST (food-service)

describe('Food Service', () => {
  let foodSvc: FoodService;

  const storageSub = {
    upload: () => {},
    ref: () => {},
  };

  const dbDouble = {
    add: () => {},
    colWithIds: () => {},
    docWithId: () => {},
    delete: () => {},
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FoodService,
        { provide: FirestoreService, useValue: dbDouble },
        { provide: AuthService, useValue: { uid: 'userId' } },
        { provide: AngularFireStorage, useValue: storageSub },
      ],
    });

    foodSvc = TestBed.inject(FoodService);
  });

  it('injects the food service', () => {
    expect(foodSvc).toBeTruthy();
  });

  // it('createMeal', () => {

  // })

  // it('getMealRange', () => {

  // })

  // it('getMealByID', () => {

  // })

  // it('addIngredientAndUpdate', () => {

  // })

  // it('removeIngredientAndUpdate', () => {

  // })

  // it('deleteMeal', () => {

  // })

  // it('addFoodToMeal', () => {

  // })

  // it('changeMealtime', () => {

  // })

  // it('getMealIngredients', () => {

  // })

  // it('getIngredients', () => {

  // })

  // it('getFoods', () => {

  // })
});
