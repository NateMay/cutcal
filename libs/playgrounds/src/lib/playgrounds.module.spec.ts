import { async, TestBed } from '@angular/core/testing';
import { PlaygroundsModule } from './playgrounds.module';

describe('CommonPlaygroundsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PlaygroundsModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(PlaygroundsModule).toBeDefined();
  });
});
