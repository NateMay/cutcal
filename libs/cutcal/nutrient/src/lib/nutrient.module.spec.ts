import { async, TestBed } from '@angular/core/testing';
import { NutrientModule } from './nutrient.module';

describe('NutrientModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NutrientModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(NutrientModule).toBeDefined();
  });
});
