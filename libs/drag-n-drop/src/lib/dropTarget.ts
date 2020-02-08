import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core'
import { DndPayload } from './dnd.payload'
import { DndSvc } from './dnd.service'

@Directive({
  selector: '[ccDrop]',
})
export class DropTarget {
  @Input() ccDrop: any
  constructor(public svc: DndSvc) {}

  @Output() onDrop = new EventEmitter<DndPayload<any, any>>()

  @HostListener('mouseup')
  dropEmit(): void {
    if (this.svc.isDragging)
      this.onDrop.emit({
        drop: this.ccDrop,
        drag: this.svc.dragData,
      })
  }
}
