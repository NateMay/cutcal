import { async, TestBed } from '@angular/core/testing';
import { CCAnimationsModule } from './animations.module';

describe('AnimationsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CCAnimationsModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(CCAnimationsModule).toBeDefined();
  });
});
