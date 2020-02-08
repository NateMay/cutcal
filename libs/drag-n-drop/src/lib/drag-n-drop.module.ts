import { ModuleWithProviders, NgModule } from '@angular/core'
import { WINDOW_PROVIDER } from '@cutcal/cc-ng-core'
import { DndSvc } from './dnd.service'
import { DragItem } from './dragItem'
import { DropTarget } from './dropTarget'

@NgModule({
  declarations: [DropTarget, DragItem],
  exports: [DropTarget, DragItem],
  providers: [WINDOW_PROVIDER],
})
export class DragNDropModule {
  static forRoot(): ModuleWithProviders<DragNDropModule> {
    return {
      ngModule: DragNDropModule,
      providers: [DndSvc],
    }
  }
}
