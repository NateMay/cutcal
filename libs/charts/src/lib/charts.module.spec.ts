import { TestBed } from '@angular/core/testing';
import { ChartsModule } from './charts.module';

describe('ChartsModule', () => {
  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [ChartsModule]
    }).compileComponents();
  });

  it('should create', () => {
    expect(ChartsModule).toBeDefined();
  });
});
