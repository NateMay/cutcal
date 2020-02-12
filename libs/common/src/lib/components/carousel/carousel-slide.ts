import { Directive, HostBinding, TemplateRef } from '@angular/core'

@Directive({
  selector: '[ccCarouselSlide],[cc-carousel-slide]',
})
export class CarouselSlide {
  @HostBinding('style.display') display: 'block' | 'none' = 'none'

  constructor(public tpl: TemplateRef<any>) {}
}
