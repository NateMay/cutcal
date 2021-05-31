import { DOCUMENT } from '@angular/common'
import {
  Inject,
  Injectable,
  OnDestroy,
  Renderer2,
  RendererFactory2
} from '@angular/core'
import { BehaviorSubject, fromEvent, Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

@Injectable({ providedIn: 'root' })
export class DndSvc implements OnDestroy {
  private renderer: Renderer2

  private _lockImage: boolean = false
  get lockImage(): boolean {
    return this._lockImage
  }

  private _showTrash = new BehaviorSubject<boolean>(false)
  get showTrash$(): Observable<boolean> {
    return this._showTrash.asObservable()
  }

  private _isDragging = new BehaviorSubject<boolean>(false)

  get isDragging(): boolean {
    return this._isDragging.getValue()
  }

  private _dragData: unknown
  get dragData(): unknown {
    return this._dragData
  }

  private _ghost: HTMLImageElement
  get ghost(): HTMLImageElement {
    this._ghost = this.renderer.createElement('img') as HTMLImageElement
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
    private readonly rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private readonly document: Document
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null)
    const root = this.document.getElementById('app-root')
    if (root) root.appendChild(this.ghost)

    fromEvent(this.document, 'mousedown')
      .pipe(tap(() => (this._lockImage = true)))
      .subscribe()

    fromEvent(this.document, 'mouseup')
      .pipe(tap(() => (this._lockImage = false)))
      .subscribe()
  }

  ngOnDestroy(): void {
    // clean up for tests
    const root = this.document.getElementById('app-root')
    if (root) this.renderer.removeChild(root, this._ghost)
  }

  startDrag(payload: unknown, showTrash: boolean): void {
    if (showTrash) this._showTrash.next(true)
    this._dragData = payload
    this._isDragging.next(true)
  }

  endDrag(): void {
    this._dragData = null
    this._showTrash.next(false)
    setTimeout(() => this._isDragging.next(false))
  }
}
