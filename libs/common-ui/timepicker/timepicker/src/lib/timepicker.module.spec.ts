import { async, TestBed } from '@angular/core/testing';
import { TimepickerModule } from './timepicker.module';

describe('TimepickerModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TimepickerModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(TimepickerModule).toBeDefined();
  });
});
