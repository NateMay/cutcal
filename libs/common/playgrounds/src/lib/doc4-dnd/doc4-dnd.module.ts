import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { DocUtilModule } from '../doc-utils.module'
import { Doc4DndComponent } from './doc4-dnd.component'

@NgModule({
  declarations: [Doc4DndComponent],
  imports: [
    CommonModule,
    DocUtilModule,
    RouterModule.forChild([
      {
        path: '',
        component: Doc4DndComponent,
      },
    ]),
  ],
})
export class Doc4DndModule {}
