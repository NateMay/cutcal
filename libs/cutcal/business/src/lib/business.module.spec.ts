import { async, TestBed } from '@angular/core/testing';
import { BusinessModule } from './business.module';

describe('BusinessModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BusinessModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(BusinessModule).toBeDefined();
  });
});
