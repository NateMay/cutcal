import { Directive, ElementRef } from '@angular/core'

// TEST
// eslint-disable-next-line @angular-eslint/directive-selector
@Directive({ selector: 'img' })
export class LazyImgDirective {
  constructor({ nativeElement }: ElementRef<HTMLImageElement>) {
    const supports = 'loading' in HTMLImageElement.prototype

    if (supports) {
      nativeElement.setAttribute('loading', 'lazy')
    }
  }
}
