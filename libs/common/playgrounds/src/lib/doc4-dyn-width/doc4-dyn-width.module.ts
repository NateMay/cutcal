import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { Doc4DynWidthComponent } from './doc4-dyn-width.component'

@NgModule({
  declarations: [Doc4DynWidthComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: Doc4DynWidthComponent,
      },
    ]),
  ],
})
export class Doc4DynWidthModule {}
