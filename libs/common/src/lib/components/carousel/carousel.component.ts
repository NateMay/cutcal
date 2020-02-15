import { animate, state, style, transition, trigger } from '@angular/animations'
import { LiveAnnouncer } from '@angular/cdk/a11y'
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  KeyValueDiffer,
  KeyValueDiffers,
  OnDestroy,
  Output,
  QueryList,
  Renderer2,
  ViewChildren,
} from '@angular/core'
import { CarouselSlide } from './carousel-slide'

export interface ActiveSlides {
  previous: number
  current: number
  next: number
}

const TRANSITION_TIME = 500

let nextUniqueId: number = 0

@Component({
  selector: 'cc-carousel',
  host: {
    class: 'cc-carousel',
    '(focusin)': 'onCarouselFocus()',
    '(focusout)': 'onCarouselBlur()',
    role: 'dialog',
  },
  styleUrls: ['./carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      mat-mini-fab
      *ngIf="showPause"
      class="pause-play mat-elevation-z2"
      [color]="buttonColor"
      aria-label="next slide"
      (click)="pause()"
      (keydown.enter)="pause()"
    >
      <mat-icon>pause_circle_outline</mat-icon>
    </button>

    <button
      mat-mini-fab
      *ngIf="!showPause"
      class="pause-play mat-elevation-z2"
      [color]="buttonColor"
      aria-label="next slide"
      (click)="play()"
      (keydown.enter)="play()"
    >
      <mat-icon>play_circle_outline</mat-icon>
    </button>

    <div
      #carousel
      (mouseenter)="stopTimer()"
      (mouseleave)="startTimer()"
      [attr.id]="idStr + '-items'"
      class="slides"
    >
      <!-- slide -->

      <div
        #slide
        role="group"
        *ngFor="let carouselSlide of carouselSlides; let i = index"
        [class.is-active]="i === activeSlides.current"
        [@slideState]="getAnimationSlideState(i)"
        (@slideState.done)="animationEnd()"
        class="slide"
      >
        <ng-container [ngTemplateOutlet]="carouselSlide.tpl"></ng-container>
      </div>
    </div>

    <div
      class="static-content"
      (mouseenter)="stopTimer()"
      (mouseleave)="startTimer()"
    >
      <ng-content select="[staticContent]"></ng-content>
    </div>

    <!-- previous arrow -->
    <button
      (mouseenter)="stopTimer()"
      (mouseleave)="startTimer()"
      [attr.aria-controls]="idStr + '-items'"
      (keydown.enter)="select(activeSlides.previous)"
      (click)="select(activeSlides.previous)"
      *ngIf="slideCount > 1 && isNavigation"
      class="next mat-elevation-z2"
      mat-mini-fab
      [color]="buttonColor"
      aria-label="previous slide"
    >
      <mat-icon>chevron_left</mat-icon>
    </button>

    <!-- next arrow -->

    <button
      class="prev mat-elevation-z2"
      (mouseenter)="stopTimer()"
      (mouseleave)="startTimer()"
      (click)="select(activeSlides.next)"
      *ngIf="slideCount > 1 && isNavigation"
      [attr.aria-controls]="idStr + '-items'"
      (keydown.enter)="select(activeSlides.next)"
      mat-mini-fab
      [color]="buttonColor"
      aria-label="next slide"
    >
      <mat-icon>chevron_right</mat-icon>
    </button>

    <div class="indicators" *ngIf="slideCount > 1 && isControls">
      <!-- INDICATOR -->

      <a
        tabindex="0"
        role="button"
        class="indicator"
        (click)="select(i)"
        (keydown.enter)="select(i)"
        [attr.id]="idStr + 'Dot' + (i + 1)"
        [attr.aria-controls]="idStr + '-items'"
        *ngFor="let carouselSlide of carouselSlides; let i = index"
        [class.is-active]="i === activeSlides.current"
        [attr.aria-label]="'carousel slide ' + (i + 1) + ' of ' + slideCount"
      ></a>
    </div>
  `,
  animations: [
    trigger('slideState', [
      state('current', style({ transform: 'translateX(0%)', zIndex: 1 })),
      state('next', style({ transform: 'translateX(100%)', zIndex: 1 })),
      state('previous', style({ transform: 'translateX(-100%)', zIndex: 1 })),
      transition(
        'current => previous',
        animate(`${TRANSITION_TIME}ms ease-out`)
      ),
      transition('next => current', animate(`${TRANSITION_TIME}ms ease-out`)),
      transition('current => next', animate(`${TRANSITION_TIME}ms ease-out`)),
      transition(
        'previous => current',
        animate(`${TRANSITION_TIME}ms ease-out`)
      ),
    ]),
  ],
})
export class CarouselComponent implements OnDestroy, AfterContentInit {
  private differ: KeyValueDiffer<ActiveSlides, any>

  private animationComplete = true

  // TODO (carousel) switch out with rxjs timer

  private currentInterval: any

  showPause: boolean = false

  hasFocus: boolean = false

  /**
   * @description id for the carousel
   */
  @Input()
  get idStr(): string {
    return this._id
  }
  set idStr(value: string) {
    this._id = value || this._uid
  }
  private _id: string
  private _uid = `cc-carousel-${nextUniqueId++}`

  /**
   * @description show/hide NEXT/PREV button
   */
  @Input() isNavigation: boolean = false

  /**
   * @description passed to the mat-buttons
   */
  @Input() buttonColor: string = ''

  /**
   * @description show/hide controls
   */
  @Input() isControls: boolean = false

  /**
   * @description set the auto rotation time
   */
  @Input() autoPlayDuration: number = 0

  /**
   * @description This defines the custom value for the aria-label attribute of the play button
   */
  @Input() playAriaLabel: string = 'Play'

  /**
   * @description This defines the custom value for the aria-label attribute of the pause button
   */
  @Input() pauseAriaLabel: string = 'Pause'

  /**
   * @description This defines the index of the active slide that the carousel should display initially
   * @twoway true
   */
  @Input() set activeSlide(activeSlide: number) {
    if (this._activeSlide === activeSlide) return
    this._activeSlide = activeSlide || 0
    if (this.slideCount) this.activeNewSlide(this._activeSlide)
  }
  get activeSlide(): number {
    return this._activeSlide
  }
  private _activeSlide: number = 0
  @Output() activeSlideChange: EventEmitter<number> = new EventEmitter()

  /**
   * @description store the next, current, and previous indecies
   */
  get activeSlides(): ActiveSlides {
    return this._activeSlides
  }
  set activeSlides(activeSlides: ActiveSlides) {
    if (this._activeSlides === activeSlides) return
    this._activeSlides = activeSlides
  }
  private _activeSlides: ActiveSlides

  get slideText(): string {
    const slide = this.findSlide(this.activeSlides.current)
    return slide ? slide.nativeElement.textContent : ''
  }

  @ViewChildren('slide', { read: ElementRef }) slideRefs!: QueryList<ElementRef>

  @ContentChildren(CarouselSlide)
  carouselSlides: QueryList<CarouselSlide>

  get slideCount(): number {
    return this.carouselSlides ? this.carouselSlides.length : 0
  }

  constructor(
    private cd: ChangeDetectorRef,
    private differs: KeyValueDiffers,
    private announcer: LiveAnnouncer,
    private renderer: Renderer2
  ) {
    this.idStr = this.idStr
  }

  ngAfterContentInit() {
    this.activeSlides = this.getPreviousCurrentNextIndexes(0)
    this.differ = this.differs.find(this.activeSlides).create()
    if (this.slideCount > 1 && this.autoPlayDuration > 0) this.startTimer()
  }

  ngOnDestroy() {
    this.cd.detach()
    this.stopTimer()
  }

  select(index: number): void {
    // prevents user from clicking too fast
    if (!this.animationComplete) return
    else setTimeout(() => (this.animationComplete = true), TRANSITION_TIME)

    this.animationComplete = false
    this.activeSlides = this.getPreviousCurrentNextIndexes(index)
    this.activeSlideChange.emit(index)

    if (this.differ.diff(this.activeSlides)) this.cd.detectChanges()
  }

  getPreviousCurrentNextIndexes(index: number): ActiveSlides {
    return {
      previous:
        (index === 0 ? this.slideCount - 1 : index - 1) % this.slideCount,
      current: index % this.slideCount,
      next: (index === this.slideCount - 1 ? 0 : index + 1) % this.slideCount,
    }
  }

  getAnimationSlideState(index: number): string {
    switch (index) {
      case this.activeSlides.current:
        return 'current'
      case this.activeSlides.next:
        return 'next'
      case this.activeSlides.previous:
        return 'previous'
      default:
        return ''
    }
  }

  startTimer(): void {
    this.showPause = false

    if (this.autoPlayDuration > 0) {
      this.currentInterval = setInterval(
        () => this.select(this.activeSlides.next),
        this.autoPlayDuration
      )
    }
  }

  stopTimer(): void {
    this.showPause = true
    if (this.currentInterval) {
      clearInterval(this.currentInterval)
    }
  }

  onCarouselFocus(): void {
    this.stopTimer()
    this.showPause = true
    this.announceSlide()
  }

  onCarouselBlur(): void {
    this.hasFocus = false
  }

  activeNewSlide(index: number = 0): void {
    this._activeSlide = index
    this.activeSlideChange.emit(index)
  }

  announceSlide(): void {
    this.announcer.announce(
      `Now Displaying slide ${this.activeSlides.current + 1} out of ${
        this.slideCount
      }. ${this.slideText}`
    )
  }

  play(): void {
    this.showPause = true
    this.startTimer()
    this.announcer.announce(`Click To pause.`)
  }
  pause(): void {
    this.showPause = false
    this.stopTimer()
    this.announcer.announce(`Click To play.`)
  }

  animationEnd(): void {
    this.toggleSlide(this.activeSlides.current, 'block')

    setTimeout(() => {
      this.toggleSlide(this.activeSlides.previous, 'none')
      this.toggleSlide(this.activeSlides.next, 'none')
    }, TRANSITION_TIME)
  }

  toggleSlide(index: number, display: 'block' | 'none'): void {
    const slide = this.findSlide(index)
    if (slide) this.renderer.setStyle(slide.nativeElement, 'display', display)
    else console.error('[CutCal] could not find slide')
  }

  findSlide(index: number): ElementRef | undefined {
    return this.slideRefs.find((slide, i) => i == index)
  }
}
