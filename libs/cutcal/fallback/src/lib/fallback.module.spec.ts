import { TestBed } from '@angular/core/testing';
import { FallbackModule } from './fallback.module';

describe('FallbackModule', () => {
  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [FallbackModule]
    }).compileComponents();
  });

  it('should create', () => {
    expect(FallbackModule).toBeDefined();
  });
});
