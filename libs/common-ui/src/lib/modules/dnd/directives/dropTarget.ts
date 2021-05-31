import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  Output
} from '@angular/core'
import { DndPayload } from '../dnd.payload'
import { DndSvc } from '../dnd.service'

@Directive({
  selector: '[dsDrop],[drop]'
})
export class DropTarget {
  @Input() payload: unknown

  @Output() dsDrop = new EventEmitter<DndPayload<any, any>>()

  constructor(public readonly svc: DndSvc) {}

  @HostListener('mouseup')
  dropEmit(): void {
    if (this.svc.isDragging)
      this.dsDrop.emit({
        drop: this.payload,
        drag: this.svc.dragData
      })
  }
}
