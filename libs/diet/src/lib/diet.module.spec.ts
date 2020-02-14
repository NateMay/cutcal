import { async, TestBed } from '@angular/core/testing';
import { DietModule } from './diet.module';

describe('DietModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DietModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(DietModule).toBeDefined();
  });
});
