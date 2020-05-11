import { NgModule } from '@angular/core'
import { WINDOW_PROVIDER } from '../../services/window.service'
import { DragItem } from './directives/dragItem'
import { DropTarget } from './directives/dropTarget'

@NgModule({
  declarations: [DropTarget, DragItem],
  exports: [DropTarget, DragItem],
  providers: [WINDOW_PROVIDER]
})
export class DndModule {}
