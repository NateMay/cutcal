import { async, TestBed } from '@angular/core/testing';
import { FallbackModule } from './fallback.module';

describe('FallbackModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FallbackModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(FallbackModule).toBeDefined();
  });
});
