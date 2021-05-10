import { TestBed } from '@angular/core/testing';
import { BasicsModule } from './basics.module';

describe('CommonModule', () => {
  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [BasicsModule]
    }).compileComponents();
  });

  it('should create', () => {
    expect(BasicsModule).toBeDefined();
  });
});
