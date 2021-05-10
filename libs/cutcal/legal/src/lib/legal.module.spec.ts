import { TestBed } from '@angular/core/testing';
import { LegalModule } from './legal.module';

describe('LegalModule', () => {
  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [LegalModule]
    }).compileComponents();
  });

  it('should create', () => {
    expect(LegalModule).toBeDefined();
  });
});
