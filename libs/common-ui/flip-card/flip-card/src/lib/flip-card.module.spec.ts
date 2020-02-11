import { async, TestBed } from '@angular/core/testing';
import { FlipCardModule } from './flip-card.module';

describe('FlipCardModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FlipCardModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(FlipCardModule).toBeDefined();
  });
});
