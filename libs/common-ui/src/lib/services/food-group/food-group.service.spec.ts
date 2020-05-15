import { TestBed } from '@angular/core/testing';
import { FoodGroupSvc } from './food-group.service';

// DEPENDS ON (food-group) then TEST (food-group)

describe('Foodgroup Service', () => {
  let foodGroupSvc: FoodGroupSvc;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FoodGroupSvc]
    });

    foodGroupSvc = TestBed.inject(FoodGroupSvc);
  });

  it('injects the foodgroup service', () => {
    expect(foodGroupSvc).toBeTruthy();
  });
});
