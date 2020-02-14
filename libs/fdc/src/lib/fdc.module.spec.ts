import { async, TestBed } from '@angular/core/testing';
import { FdcModule } from './fdc.module';

describe('FdcModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FdcModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(FdcModule).toBeDefined();
  });
});
