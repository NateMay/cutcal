import { async, TestBed } from '@angular/core/testing';
import { DynamicWidthModule } from './dynamic-width.module';

describe('DynamicWidthModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DynamicWidthModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(DynamicWidthModule).toBeDefined();
  });
});
