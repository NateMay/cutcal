import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { Doc4AnimateComponent } from './doc4-animate.component'

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: Doc4AnimateComponent,
      },
    ]),
  ],
})
export class Doc4AnimateModule {}
