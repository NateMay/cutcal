import { async, TestBed } from '@angular/core/testing';
import { AmPmPlaygroundModule } from './playground.module';

describe('PlaygroundModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AmPmPlaygroundModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(AmPmPlaygroundModule).toBeDefined();
  });
});
