import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core'
import { interval, Subject } from 'rxjs'
import { takeUntil, tap } from 'rxjs/operators'

@Directive({
  selector: '[dynamicWidth],[ccDynamicWidth]',
})
export class DynamicWidthDirective implements OnInit, OnDestroy {
  private unsub$: Subject<void> = new Subject()

  private _storedWidth: number

  @Output() width = new EventEmitter<number>()

  @Input() interval: number = 200

  get currentWidth(): number {
    return (<HTMLElement>this.host.nativeElement).getBoundingClientRect().width
  }

  get isNewWidth(): boolean {
    return Math.abs(this._storedWidth - this.currentWidth) > 2
  }

  constructor(private host: ElementRef) {}

  ngOnInit(): void {
    this._storedWidth = this.currentWidth

    setTimeout(() => this.width.emit(this._storedWidth))

    interval(this.interval)
      .pipe(
        takeUntil(this.unsub$),
        tap(() => {
          if (this.isNewWidth) {
            this._storedWidth = this.currentWidth
            this.width.emit(this._storedWidth)
          }
        })
      )
      .subscribe()
  }

  ngOnDestroy(): void {
    // this.width.emit(0);
    this.unsub$.next()
    this.unsub$.complete()
  }
}
