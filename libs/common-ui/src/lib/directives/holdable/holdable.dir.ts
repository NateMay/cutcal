import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  Output
} from '@angular/core'
import { interval, Observable, Subject } from 'rxjs'
import { filter, takeUntil, tap } from 'rxjs/operators'

// const STOP_MSG = ['%c stopped hold', 'color: #ec6969; font-weight: bold;']
// const START_MSG = ['%c started hold', 'color: #5fba7d; font-weight: bold;']

@Directive({
  selector: '[holdable],[ccHoldable]'
})
export class HoldableDirective implements OnDestroy {
  @Output() holdTime = new EventEmitter<number>()

  @Output() complete = new EventEmitter<void>()

  @Input() duration: number = 1000

  @Input() interval: number = 100

  state: Subject<string> = new Subject()

  cancel: Observable<string>

  constructor() {
    this.cancel = this.state.pipe(
      filter(state => state === 'cancel'),
      tap(() => this.holdTime.emit(0))
    )
  }

  @HostListener('mouseup')
  @HostListener('mouseleave')
  onExit(): void {
    this.state.next('cancel')
  }

  @HostListener('mousedown')
  onHold(): void {
    this.state.next('start')

    interval(this.interval)
      .pipe(
        takeUntil(this.cancel),
        tap(n => this.holdTime.emit(n * this.interval)),
        tap(n => {
          if (n * 100 > this.duration) {
            this.complete.emit()
            this.state.next('cancel')
          }
        })
      )
      .subscribe()
  }

  ngOnDestroy(): void {
    this.state.next('cancel')
  }
}
