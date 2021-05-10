import { async, TestBed } from '@angular/core/testing';
import { AnalyzeModule } from './analyze.module';

describe('AnalyzeModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AnalyzeModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(AnalyzeModule).toBeDefined();
  });
});
