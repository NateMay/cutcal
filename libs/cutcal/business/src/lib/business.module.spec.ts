import { TestBed } from '@angular/core/testing';
import { BusinessModule } from './business.module';

describe('BusinessModule', () => {
  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [BusinessModule]
    }).compileComponents();
  });

  it('should create', () => {
    expect(BusinessModule).toBeDefined();
  });
});
