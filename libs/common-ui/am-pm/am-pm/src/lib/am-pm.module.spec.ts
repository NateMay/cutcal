import { async, TestBed } from '@angular/core/testing';
import { AmPmModule } from './am-pm.module';

describe('AmPmModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AmPmModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(AmPmModule).toBeDefined();
  });
});
