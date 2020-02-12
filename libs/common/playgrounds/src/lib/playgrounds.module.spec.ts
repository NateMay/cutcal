import { async, TestBed } from '@angular/core/testing';
import { CommonPlaygroundsModule } from './common-playgrounds.module';

describe('CommonPlaygroundsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonPlaygroundsModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(CommonPlaygroundsModule).toBeDefined();
  });
});
