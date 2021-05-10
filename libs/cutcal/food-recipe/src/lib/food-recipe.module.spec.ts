import { TestBed } from '@angular/core/testing';
import { FoodRecipeModule } from './food-recipe.module';

describe('FoodRecipeModule', () => {
  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [FoodRecipeModule]
    }).compileComponents();
  });

  it('should create', () => {
    expect(FoodRecipeModule).toBeDefined();
  });
});
