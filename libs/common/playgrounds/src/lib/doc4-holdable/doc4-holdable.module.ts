import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { Doc4HoldableComponent } from './doc4-holdable.component'

@NgModule({
  declarations: [Doc4HoldableComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: Doc4HoldableComponent,
      },
    ]),
  ],
})
export class Doc4HoldableModule {}
