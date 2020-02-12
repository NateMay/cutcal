import { NgModule } from '@angular/core'
import { WINDOW_PROVIDER } from '../../services/window.service'
import { DragItem } from './directives/dragItem'
import { DropTarget } from './directives/dropTarget'
import { TrashComponent } from './trash/trash.component'

@NgModule({
  declarations: [DropTarget, DragItem, TrashComponent],
  exports: [DropTarget, DragItem, TrashComponent],
  providers: [WINDOW_PROVIDER],
})
export class DndModule {}
