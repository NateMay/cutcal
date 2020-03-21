/* eslint-disable @typescript-eslint/no-unused-vars */
/*
 * Testing a simple Angular 2 component
 * More info: {@link https://angular.io/docs/ts/latest/guide/testing.html#!#simple-component-test}
 */

import { Component, DebugElement } from '@angular/core';
import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { WINDOW_PROVIDER } from '@cutcal/core';
import { getDe, getDirective } from '@cutcal/ng-testing';
import { DndModule } from '../dnd.module';
import { DndSvc } from '../dnd.service';
import { DragItem, DRAG_SKIP_COUNT } from './dragItem';
import { DropTarget } from './dropTarget';

@Component({
  template: `
    <div id="app-root">
      <div
        class="drag"
        [drag]="dragData"
        [dragImage]="dragImage"
        [immediate]="true"
      >
        drag
      </div>

      <div class="drop" [drop]="dropData">drop</div>
    </div>
  `,
})
class TestDndComponent {
  dragImage = '../../../assets/images/april.jpg';
  dragData = 'A';
  dropData = 'B';
}

describe('Drag and Drop directives', () => {
  let fixture: ComponentFixture<TestDndComponent>;
  let dragEl: DebugElement;
  let dragDir: DragItem;
  let dropDir: DropTarget;
  let dropEl: DebugElement;
  let dndSvc: DndSvc;

  const mouseEvent = (el: any, type: string): void =>
    el.dispatchEvent(
      new MouseEvent(type, <any>{
        preventDefault: () => {},
        clientX: 432,
        clientY: 532,
      })
    );

  const mousemoveToStart = (): void => {
    for (let e = 0; e <= DRAG_SKIP_COUNT; e++)
      mouseEvent(document, 'mousemove');
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestDndComponent],
      imports: [DndModule],
      providers: [DndSvc, WINDOW_PROVIDER],
    });

    fixture = TestBed.createComponent(TestDndComponent);
    fixture.detectChanges();

    dndSvc = TestBed.inject(DndSvc);

    dragEl = getDe(fixture, '.drag');
    dragDir = getDirective<DragItem>(fixture.debugElement, DragItem);

    dropEl = getDe(fixture, '.drop');
    dropDir = getDirective<DropTarget>(fixture.debugElement, DropTarget);
  });

  describe('after drag start', () => {
    beforeEach(() => {
      mouseEvent(dragEl.nativeElement, 'mousedown');
      mousemoveToStart();
      fixture.detectChanges();
    });

    afterEach(() => {
      mouseEvent(document, 'mouseup');
    });

    // TEST (dnd)
    it('dragSpecs payload stores in service', () => {
      expect(dndSvc.dragData).toEqual('A');
    });

    it('drag images updates styles and position properly', async(() => {
      fixture.detectChanges();

      // This element is programatically appended and not accessible through the fixture
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        const image = document.getElementById('drag-obj');
        expect(image?.style?.left).toBe('400px');
        expect(image?.style?.top).toBe('500px');
        expect(image?.style?.transform).toBe('scale(1, 1)');
      });
    }));
  });

  it('calls data getter and setter appropriately', fakeAsync(() => {
    const setter = jest.spyOn(dndSvc, 'startDrag');
    const getter = jest.spyOn(dndSvc, 'endDrag');

    mouseEvent(dragEl.nativeElement, 'mousedown');
    mousemoveToStart();
    fixture.detectChanges();
    expect(setter).toHaveBeenCalledWith('A', true);
    expect(dndSvc.isDragging).toBe(true);

    mouseEvent(dropEl.nativeElement, 'mouseup');
    mouseEvent(document, 'mouseup');
    fixture.detectChanges();
    expect(getter).toHaveBeenCalledTimes(1);
    tick(1);
    expect(dndSvc.isDragging).toBe(false);
  }));
});
