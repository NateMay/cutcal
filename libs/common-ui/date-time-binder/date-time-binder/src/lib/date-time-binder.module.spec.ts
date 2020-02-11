import { async, TestBed } from '@angular/core/testing';
import { DateTimeBinderModule } from './date-time-binder.module';

describe('DateTimeBinderModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DateTimeBinderModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(DateTimeBinderModule).toBeDefined();
  });
});
