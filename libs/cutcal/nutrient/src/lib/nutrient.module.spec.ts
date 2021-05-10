import { TestBed } from '@angular/core/testing';
import { NutrientModule } from './nutrient.module';

describe('NutrientModule', () => {
  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [NutrientModule]
    }).compileComponents();
  });

  it('should create', () => {
    expect(NutrientModule).toBeDefined();
  });
});
