import { TestBed } from '@angular/core/testing';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from '@cutcal/auth';
import { FirestoreService } from '../fireStore/fireStore.service';
import { FoodService } from './food.service';

// DEPENDS ON (recipe) then TEST (food-service)

describe('Food Service', () => {
  let foodSvc: FoodService;

  const storageSub = {
    upload: (): void => {},
    ref: (): void => {}
  };

  const dbDouble = {
    add: (): void => {},
    colWithIds: (): void => {},
    docWithId: (): void => {},
    delete: (): void => {}
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FoodService,
        { provide: FirestoreService, useValue: dbDouble },
        { provide: AuthService, useValue: { uid: 'userId' } },
        { provide: AngularFireStorage, useValue: storageSub }
      ]
    });

    foodSvc = TestBed.inject(FoodService);
  });

  it('injects the food service', () => {
    expect(foodSvc).toBeTruthy();
  });

  // _it('createMeal', () => {

  // })

  // _it('getMealRange', () => {

  // })

  // _it('getMealByID', () => {

  // })

  // _it('addIngredientAndUpdate', () => {

  // })

  // _it('removeIngredientAndUpdate', () => {

  // })

  // _it('deleteMeal', () => {

  // })

  // _it('addFoodToMeal', () => {

  // })

  // _it('changeMealtime', () => {

  // })

  // _it('getMealIngredients', () => {

  // })

  // _it('getIngredients', () => {

  // })

  // _it('getFoods', () => {

  // })
});
