import {
  Directive,
  EventEmitter,
  HostListener,
  Inject,
  Input,
  NgZone,
  Output,
  Renderer2,
} from '@angular/core'
import { fromEvent } from 'rxjs'
import { finalize, first, skip, takeUntil, tap } from 'rxjs/operators'
import { Boolish } from '../../../decorators/boolish/boolish'
import { executeOnStable } from '../../../functions'
import { WINDOW } from '../../../services/window.service'
import { DndSvc } from '../dnd.service'

// delays the drag-obj so it doesn't appear on clicks
export const DRAG_SKIP_COUNT = 6

@Directive({
  selector: '[drag],[ccDrag]',
})
export class DragItem {
  private img = <HTMLImageElement>document.getElementById('drag-obj')
  private app = <HTMLImageElement>document.getElementById('app-root')

  private default: string = '../../../../assets/svgs/meal.svg'

  @Input() drag: any
  // @Input() dropID: string;
  @Input() immediate = false // for testing
  @Input() dragImage: string

  @Boolish
  @Input()
  showTrash: boolean = true
  @Output() dragStart = new EventEmitter<MouseEvent>()

  constructor(
    public dndSvc: DndSvc,
    @Inject(WINDOW) private _window: Window,
    private renderer: Renderer2,
    private ngZone: NgZone
  ) {}

  @HostListener('mouseenter')
  loadImage() {
    if (!this.dndSvc.lockImage)
      this.renderer.setAttribute(
        this.img,
        'src',
        this.dragImage || this.default
      )
  }

  @HostListener('mousedown')
  onDragstart(): void {
    const mouseUp$ = fromEvent(document, 'mouseup').pipe(first())
    mouseUp$.subscribe()

    fromEvent(document, 'mousemove')
      .pipe(
        skip(this.immediate ? 0 : DRAG_SKIP_COUNT), // prevents accidental drag on clicks
        tap((mousemove: MouseEvent) => this.update(mousemove)),
        takeUntil(mouseUp$),
        finalize(() => executeOnStable(this.ngZone, () => this.reset()))
      )
      .subscribe()
  }

  initialize(mousemove: MouseEvent): void {
    mousemove.preventDefault()
    mousemove.stopPropagation()
    // this.dndSvc.dropID = this.dropID || 'no dropID';
    this.dndSvc.startDrag(this.drag, this.showTrash)
    this.renderer.setStyle(this.img, 'transform', 'scale(1, 1)')
    this.renderer.setStyle(this.app, 'user-select', 'none')
    const selection = this._window.getSelection()
    if (selection) selection.removeAllRanges()
    this.dragStart.emit(mousemove)
  }

  update(mousemove: MouseEvent): void {
    mousemove.preventDefault()
    if (!this.dndSvc.isDragging && !!this.drag) this.initialize(mousemove)
    this.setPosition(mousemove)
  }

  setPosition(event: MouseEvent): void {
    this.renderer.setStyle(this.img, 'left', `${event.clientX - 32}px`)
    this.renderer.setStyle(this.img, 'top', `${event.clientY - 32}px`)
  }

  reset(): void {
    this.dndSvc.endDrag()
    this.renderer.setStyle(this.img, 'transform', 'scale(0, 0)')
    this.renderer.setStyle(this.app, 'user-select', 'auto')
    const selection = this._window.getSelection()
    if (selection) selection.removeAllRanges()
  }
}
