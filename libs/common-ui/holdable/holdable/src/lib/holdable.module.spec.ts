import { async, TestBed } from '@angular/core/testing';
import { HoldableModule } from './holdable.module';

describe('HoldableModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HoldableModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(HoldableModule).toBeDefined();
  });
});
