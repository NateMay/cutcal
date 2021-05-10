import { TestBed } from '@angular/core/testing';
import { CCAnimationsModule } from './animations.module';

describe('AnimationsModule', () => {
  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [CCAnimationsModule]
    }).compileComponents();
  });

  it('should create', () => {
    expect(CCAnimationsModule).toBeDefined();
  });
});
