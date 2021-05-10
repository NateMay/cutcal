import { TestBed } from '@angular/core/testing';
import { MealIngredientModule } from './meal-ingredient.module';

describe('MealIngredientModule', () => {
  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [MealIngredientModule]
    }).compileComponents();
  });

  it('should create', () => {
    expect(MealIngredientModule).toBeDefined();
  });
});
