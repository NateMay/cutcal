import { async, TestBed } from '@angular/core/testing';
import { DragNDropModule } from './drag-n-drop.module';

describe('DragNDropModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DragNDropModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(DragNDropModule).toBeDefined();
  });
});
