import { async, TestBed } from '@angular/core/testing';
import { CcTimepickerModule } from './timepicker.module';

describe('CcTimepickerModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CcTimepickerModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(CcTimepickerModule).toBeDefined();
  });
});
