import { TestBed } from '@angular/core/testing';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from '../../../auth/auth.service';
import { FirestoreService } from '../fireStore/fireStore.service';
import { FoodService } from './food.service';

// DEPENDS ON (recipe) then TEST (food-service)

describe('Food Service', () => {

  let foodSvc: FoodService;

  const storageSub = {
    upload: () => {},
    ref: () => {}
  }

  const dbDouble = {
    add: () => { },
    colWithIds: () => { },
    docWithId: () => { },
    delete: () => { }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FoodService,
        { provide: FirestoreService, useValue: dbDouble },
        { provide: AuthService, useValue: { uid: 'userId' } },
        { provide: AngularFireStorage, useValue: storageSub }
      ]
    })

    foodSvc = TestBed.get(FoodService)
  })

  it('injects the food service', () => {
    expect(foodSvc).toBeTruthy()
  })

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
})
