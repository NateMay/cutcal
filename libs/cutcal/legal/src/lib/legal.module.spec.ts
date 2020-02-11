import { async, TestBed } from '@angular/core/testing';
import { LegalModule } from './legal.module';

describe('LegalModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [LegalModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(LegalModule).toBeDefined();
  });
});
