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
  selector: '[drop],[ccDrop]'
})
export class DropTarget {
  @Input() drop: any

  @Output() onDrop = new EventEmitter<DndPayload<any, any>>()

  constructor(public readonly svc: DndSvc) {}

  @HostListener('mouseup')
  dropEmit(): void {
    if (this.svc.isDragging)
      this.onDrop.emit({
        drop: this.drop,
        drag: this.svc.dragData
      })
  }
}
