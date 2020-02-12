import { Component, EventEmitter, HostBinding, Output } from '@angular/core'

@Component({
  selector: 'cc-flip-card',
  host: { tabIndex: '0' },
  template: `
    <div class="flip-card-inner">
      <div
        class="flip-card-front"
        [ngStyle]="{
          position: position
        }"
        (mouseenter)="hover.emit()"
      >
        <ng-content select="[front]"></ng-content>
      </div>

      <div
        class="flip-card-back"
        [ngStyle]="{
          transform: transform,
          position: position,
          opacity: opacity
        }"
      >
        <ng-content select="[back]"></ng-content>
      </div>
    </div>
  `,
  styleUrls: ['./flip-card.component.scss'],
})
export class FlipCardComponent {
  transform = 'none'
  position = 'relative'
  opacity = 0.01

  @HostBinding('style.width') width: string = '240px'
  @HostBinding('style.height') height: string = '200px'

  @Output() hover = new EventEmitter<void>()

  constructor() {
    setTimeout(() => {
      this.transform = 'rotateY(180deg)'
      this.position = 'absolute'
      this.opacity = 1
    }, 0)
  }
}
