import { coerceBooleanProperty } from '@angular/cdk/coercion'
import { ScrollDispatcher } from '@angular/cdk/scrolling'
import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core'
import { Observable, of, Subject } from 'rxjs'
import {
  delay,
  distinctUntilChanged,
  flatMap,
  map,
  scan,
  startWith,
  takeUntil,
  takeWhile,
  tap,
} from 'rxjs/operators'
import { ANIMATIONS } from './animate.animations'

export type Animations =
  | 'landing'
  | 'pulse'
  | 'beat'
  | 'heartBeat'
  | 'fadeIn'
  | 'fadeInRight'
  | 'fadeInLeft'
  | 'fadeInUp'
  | 'fadeInDown'
  | 'zoomIn'
  | 'bumpIn'
  | 'fadeOut'
  | 'fadeOutRight'
  | 'fadeOutLeft'
  | 'fadeOutDown'
  | 'fadeOutUp'
  | 'zoomOut'
  | 'flip'
  | 'flipInX'
  | 'flipInY'
  | 'flipOutX'
  | 'flipOutY'

export type AnimateSpeed = 'slower' | 'slow' | 'normal' | 'fast' | 'faster'

export class AnimateRect {
  get width(): number {
    return this.right - this.left
  }
  get height(): number {
    return this.bottom - this.top
  }

  constructor(
    readonly left: number,
    readonly top: number,
    readonly right: number,
    readonly bottom: number
  ) {}
}

@Component({
  selector: '[ccAnimate],cc-animate',
  template: '<ng-content></ng-content>',
  animations: ANIMATIONS,
})
export class AnimateComponent implements OnInit, OnDestroy {
  readonly timings = {
    slower: '3s',
    slow: '2s',
    normal: '1s',
    fast: '500ms',
    faster: '300ms',
  }

  private replay$ = new Subject<boolean>()
  private dispose$ = new Subject<void>()

  // Animating properties
  animating = false
  animated = false

  /** Selects the animation to be played */
  @Input('ccAnimate') animate: Animations

  // @Input() delay: number|string;

  /** Speeds up or slows down the animation */
  @Input() speed: AnimateSpeed = 'normal'

  @HostBinding('@animate') private trigger: string | {} = 'idle'
  @HostBinding('@.disabled') public disabled = false

  /** Emits at the end of the animation */
  @Output() start = new EventEmitter<void>()

  /** Emits at the end of the animation */
  @Output() done = new EventEmitter<void>()
  public paused: boolean = false
  public aos: boolean = false
  public once: boolean = false

  /** Specifies the amout of visibility triggering AOS */
  @Input() threshold: number = 0.2

  @Input('disabled') set disableAnimation(value: boolean) {
    this.disabled = coerceBooleanProperty(value)
  }

  /** When true, keeps the animation idle until the next replay triggers */
  @Input('paused') set pauseAnimation(value: boolean) {
    this.paused = coerceBooleanProperty(value)
  }

  /** When true, triggers the animation on element scrolling in the viewport */
  @Input('aos') set enableAOS(value: boolean) {
    this.aos = coerceBooleanProperty(value)
  }

  /** When true, triggers the animation on element scrolling in the viewport */
  @Input('once') set aosOnce(value: boolean) {
    this.once = coerceBooleanProperty(value)
  }

  /** Replays the animation */
  @Input() set replay(replay: any) {
    // Skips whenever the animation never triggered
    if (this.trigger === 'idle') return

    // Re-triggers the animation again on request
    if (coerceBooleanProperty(replay)) {
      this.trigger = this.idle
      this.replay$.next(true)
    }
  }

  // Computes the element visibility ratio
  private get visibility() {
    return this.intersectRatio(
      this.clientRect(this.host),
      this.getScrollingArea(this.host)
    )
  }

  private get idle() {
    return { value: 'idle' }
  }

  private get play() {
    return {
      value: this.animate,
      // delay: this.delay,
      params: {
        timing: this.timings[this.speed] || '1s',
      },
    }
  }

  // @HostListener('@animate.start')
  // private animationStart() {
  //   this.animating = true
  //   this.animated = false
  //   this.start.emit()
  // }

  // @HostListener('@animate.done')
  // private animationDone() {
  //   this.animating = false
  //   this.animated = true
  //   this.done.emit()
  // }

  constructor(
    private host: ElementRef,
    private scroll: ScrollDispatcher,
    private zone: NgZone
  ) {}

  ngOnInit() {
    // Triggers the animation based on the input flags
    this.animateTrigger(this.host)
      .pipe(tap(trigger => (this.trigger = trigger ? this.play : this.idle)))
      .subscribe()
  }

  ngOnDestroy() {
    this.dispose()
  }

  private dispose() {
    this.dispose$.next()
    this.dispose$.complete()
  }

  // Triggers the animation
  private animateTrigger(elm: ElementRef<HTMLElement>): Observable<boolean> {
    return this.animateReplay().pipe(
      flatMap(trigger => (this.aos ? this.animateOnScroll(elm) : of(trigger)))
    )
  }

  // Triggers the animation deferred
  private animateReplay(): Observable<boolean> {
    return this.replay$.pipe(
      takeUntil(this.dispose$),
      delay(0),
      startWith(!this.paused)
    )
  }

  // Triggers the animation on scroll
  private animateOnScroll(elm: ElementRef<HTMLElement>): Observable<boolean> {
    // Returns an AOS observable
    return this.scroll.ancestorScrolled(elm, 100).pipe(
      takeUntil(this.dispose$),
      // Starts with initial element visibility
      startWith(!this.paused && this.visibility >= this.threshold),
      // Maps the scrolling to the element visibility value
      map(() => this.visibility),
      // Applies an hysteresys, so, to trigger the animation on based on the treshold while off on full invisibility
      scan<number, boolean>(
        (result, visiblility) =>
          visiblility >= this.threshold || (result ? visiblility > 0 : false)
      ),
      // Distincts the resulting triggers
      distinctUntilChanged(),
      // Stop taking the first on trigger when aosOnce is set
      takeWhile(trigger => !trigger || !this.once, true),
      // Run NEXT within the angular zone to trigger change detection back on
      flatMap(
        trigger =>
          new Observable<boolean>(observer =>
            this.zone.run(() => observer.next(trigger))
          )
      )
    )
  }

  private intersectRatio(rect: AnimateRect, cont: AnimateRect): number {
    // Return 1.0 when the element is fully within its scroller container
    if (
      rect.left > cont.left &&
      rect.top > cont.top &&
      rect.right < cont.right &&
      rect.bottom < cont.bottom
    )
      return 1.0

    // Computes the intersection area otherwise
    const a = Math.round(rect.width * rect.height)
    const b = Math.max(
      0,
      Math.min(rect.right, cont.right) - Math.max(rect.left, cont.left)
    )
    const c = Math.max(
      0,
      Math.min(rect.bottom, cont.bottom) - Math.max(rect.top, cont.top)
    )

    // Returns the amount of visible area
    return Math.round(((b * c) / a) * 10) / 10
  }

  // Returns the rectangular surface area of the element's scrolling container
  private getScrollingArea(elm: ElementRef<HTMLElement>): AnimateRect {
    // Gets the cdkScolling container, if any
    const scroller = this.scroll.getAncestorScrollContainers(elm).pop()
    // Returns the element's most likely scrolling container area
    return !!scroller
      ? this.clientRect(scroller.getElementRef())
      : this.windowRect()
  }

  // Element client bounding rect helper
  private clientRect(elm: ElementRef<HTMLElement>): AnimateRect {
    const el = !!elm && elm.nativeElement
    return !!el && el.getBoundingClientRect()
  }

  private windowRect(): AnimateRect {
    return new AnimateRect(0, 0, window.innerWidth, window.innerHeight)
  }
}
