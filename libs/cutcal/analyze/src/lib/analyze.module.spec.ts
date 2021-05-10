import { TestBed } from '@angular/core/testing';
import { AnalyzeModule } from './analyze.module';

describe('AnalyzeModule', () => {
  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [AnalyzeModule]
    }).compileComponents();
  });

  it('should create', () => {
    expect(AnalyzeModule).toBeDefined();
  });
});
