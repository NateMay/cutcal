import { TestBed } from '@angular/core/testing';
import { DndSvc } from './dnd.service';

describe('DndSvc', () => {
  let service: DndSvc;
  let appendSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DndSvc],
    });
    service = TestBed.inject(DndSvc);
    appendSpy = spyOn(document.body, 'appendChild');
  });

  it('dragging starts as false', () => {
    expect(service.isDragging).toBe(false);
  });

  it('dragData getter and setter works', () => {
    service.startDrag('a value', true);
    expect(service.dragData).toBe('a value');
  });

  it('Ghost getters creates a node', () => {
    const ghost = service.ghost;
    expect(ghost.getAttribute('id')).toBe('drag-obj');
    expect(ghost.getAttribute('alt')).toBe('drag and drop image');
  });
});
