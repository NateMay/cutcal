import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { Doc4CarouselComponent } from './doc4-carousel.component'

@NgModule({
  declarations: [Doc4CarouselComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: Doc4CarouselComponent,
      },
    ]),
  ],
})
export class Doc4CarouselModule {}
