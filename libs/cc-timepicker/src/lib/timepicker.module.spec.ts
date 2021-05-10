import { async, TestBed } from '@angular/core/testing';
import { DsTimepickerModule } from './timepicker.module';

describe('DsTimepickerModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DsTimepickerModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(DsTimepickerModule).toBeDefined();
  });
});
