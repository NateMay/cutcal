import { async, TestBed } from '@angular/core/testing';
import { NutritionLabelModule } from './nutrition-label.module';

describe('NutritionLabelModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NutritionLabelModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(NutritionLabelModule).toBeDefined();
  });
});
