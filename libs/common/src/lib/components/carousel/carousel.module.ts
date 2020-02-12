import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { CarouselSlide } from './carousel-slide'
import { CarouselComponent } from './carousel.component'

@NgModule({
  declarations: [CarouselComponent, CarouselSlide],
  exports: [CarouselComponent, CarouselSlide],
  imports: [CommonModule, MatButtonModule, MatIconModule],
})
export class CarouselModule {}
