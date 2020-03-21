import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { DndModule } from '../../modules/dnd/dnd.module'
import { TrashComponent } from './trash.component'

@NgModule({
  declarations: [TrashComponent],
  imports: [CommonModule, DndModule],
})
export class TrashModule {}
