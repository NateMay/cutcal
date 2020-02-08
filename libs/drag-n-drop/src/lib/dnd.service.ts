import { DOCUMENT } from '@angular/common'
import {
  Inject,
  Injectable,
  OnDestroy,
  Renderer2,
  RendererFactory2,
} from '@angular/core'
import { BehaviorSubject, fromEvent } from 'rxjs'
import { tap } from 'rxjs/operators'

@Injectable()
export class DndSvc implements OnDestroy {
  private renderer: Renderer2

  private _lockImage: boolean = false
  get lockImage() {
    return this._lockImage
  }

  private _showTrash = new BehaviorSubject<boolean>(false)
  get showTrash$() {
    return this._showTrash.asObservable()
  }

  private _isDragging = new BehaviorSubject<boolean>(false)

  get isDragging() {
    return this._isDragging.getValue()
  }

  private _dragData: any
  get dragData() {
    return this._dragData
  }

  private _ghost: HTMLImageElement
  get ghost(): HTMLImageElement {
    this._ghost = this.renderer.createElement('img')
    this.renderer.setAttribute(this._ghost, 'id', 'drag-obj')
    this.renderer.setAttribute(this._ghost, 'alt', 'drag and drop image')
    this.renderer.setAttribute(
      this._ghost,
      'src',
      '../../../../assets/svgs/meal.svg'
    )
    return this._ghost
  }

  constructor(
    rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.renderer = rendererFactory.createRenderer(null, null)
    const root = this.document.getElementById('app-root')
    if (root) root.appendChild(this.ghost)

    fromEvent(this.document, 'mousedown')
      .pipe(tap((mousemove: MouseEvent) => (this._lockImage = true)))
      .subscribe()

    fromEvent(this.document, 'mouseup')
      .pipe(tap((mousemove: MouseEvent) => (this._lockImage = false)))
      .subscribe()
  }

  ngOnDestroy() {
    // clean up for tests
    const root = this.document.getElementById('app-root')
    if (root) this.renderer.removeChild(root, this._ghost)
  }

  startDrag(payload: any, showTrash: boolean) {
    if (showTrash) this._showTrash.next(true)
    this._dragData = payload
    this._isDragging.next(true)
  }

  endDrag() {
    this._dragData = null
    this._showTrash.next(false)
    setTimeout(() => this._isDragging.next(false))
  }
}
