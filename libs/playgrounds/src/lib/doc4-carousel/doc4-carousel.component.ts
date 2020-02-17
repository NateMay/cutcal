import { Component } from '@angular/core'

@Component({
  selector: 'cutcal-doc4-carousel',
  template: `
    <h2>Carousel</h2>
    <hr />

    <cc-carousel
      [isControls]="true"
      [isNavigation]="true"
      [(activeSlide)]="activeSlide"
    >
      <ng-container *carousel-slide>
        <div class="my-slide">
          <img src="../../../../assets/images/carousel-example/autumn.webp" />
        </div>
      </ng-container>

      <ng-container *carousel-slide>
        <div class="my-slide">
          <img src="../../../../assets/images/carousel-example/spring.jpg" />
        </div>
      </ng-container>

      <ng-container *carousel-slide>
        <div class="my-slide">
          <img src="../../../../assets/images/carousel-example/winter.jpg" />
        </div>
      </ng-container>

      <ng-container *carousel-slide>
        <div class="my-slide">
          <img src="../../../../assets/images/carousel-example/summer.jpg" />
        </div>
      </ng-container>
    </cc-carousel>
  `,
  styleUrls: ['./doc4-carousel.component.css'],
})
export class Doc4CarouselComponent {
  activeSlide = 0

  slides = ['autumn', 'spring', 'winter', 'summer']
}
