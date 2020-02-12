import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay'
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal'
import {
  Component,
  ComponentRef,
  ElementRef,
  EventEmitter,
  HostListener,
  Injector,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewContainerRef,
} from '@angular/core'
import { Boolish } from '../../../decorators/boolish/boolish'
import { eventWithin } from '../../../functions/eventWithin/eventWithin'
import { ImageCroppedEvent } from '../interfaces/image-cropped-event'
import { UploadDialogComponent } from '../upload-dialog/upload-dialog.component'
import {
  ImageCroperData,
  IMAGE_CROPPER_DATA,
} from '../utils/image-cropper.data'

let nextUniqueId = 0

@Component({
  selector: 'cc-upload-button',
  styleUrls: ['./upload-button.component.scss'],
  template: `
    <label
      role="button"
      [attr.for]="idStr"
      [attr.aria-label]="ariaLabel"
      tabindex="0"
      [ngClass]="{
        'mat-raised-button': raised,
        'mat-button': !raised
      }"
    >
      <ng-content></ng-content>
    </label>

    <input
      #input
      type="file"
      [attr.id]="idStr"
      (change)="fileChangeEvent($event)"
    />
  `,
})
export class UploadButtonComponent implements OnInit {
  @Input()
  get idStr(): string {
    return this._id
  }
  set idStr(value: string) {
    this._id = value || this._uid
  }
  private _id: string
  private _uid = `image-upload-${nextUniqueId++}`

  @Boolish
  @Input()
  raised: boolean = false
  @Input() ariaLabel = 'Upload An Image'

  @Output() closed = new EventEmitter<void>()
  @Output() startCropImage = new EventEmitter<void>()
  @Output() imageCropped = new EventEmitter<ImageCroppedEvent>()
  @Output() imageCroppedBase64 = new EventEmitter<string>()
  @Output() imageCroppedFile = new EventEmitter<Blob>()
  @Output() imageLoaded = new EventEmitter<void>()
  @Output() cropperReady = new EventEmitter<void>()
  @Output() loadImageFailed = new EventEmitter<void>()

  croppedSrc: string

  cropperOverlayRef: OverlayRef

  cropperRef: ComponentRef<UploadDialogComponent>

  @ViewChild('input', { static: false }) input: ElementRef

  @HostListener('document:mousedown', ['$event'])
  onmousedown(event: MouseEvent): void {
    if (!this.cropperOverlayRef.hasAttached()) return
    if (
      !eventWithin(event, [
        this.el.nativeElement,
        this.cropperOverlayRef.hostElement,
      ])
    )
      this.closeCropper()
  }

  @HostListener('document:keydown.Escape')
  closeCropper(): void {
    this.cropperOverlayRef.detach()
    // must reset to allow change event to trigger for same file twice
    this.input.nativeElement.value = null
    this.closed.emit()
  }

  constructor(
    private el: ElementRef,
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef,
    private injector: Injector
  ) {
    this.idStr = this.idStr
  }

  ngOnInit() {
    /**
     * @reference [Overlay-Stackblitz] {@link https://stackblitz.com/edit/overlay-demo?file=app%2Fapp.module.ts}
     */
    this.cropperOverlayRef = this.overlay.create(
      new OverlayConfig({
        scrollStrategy: this.overlay.scrollStrategies.reposition(),
        positionStrategy: this.overlay
          .position()
          .global()
          .centerHorizontally()
          .centerVertically(),
        width: 'auto',
        height: 'auto',
        hasBackdrop: true,
      })
    )
  }

  openCropper(event: any): void {
    if (this.cropperOverlayRef.hasAttached()) return

    this.cropperRef = this.cropperOverlayRef.attach(
      new ComponentPortal(
        UploadDialogComponent,
        this.viewContainerRef,
        this.createInjector(<ImageCroperData>{
          event,
          closeDialog: () => this.closeCropper(),
          startCropImage: () => this.startCropImage.emit(),
          imageCropped: e => this.imageCropped.emit(e),
          imageCroppedBase64: e => {
            this.croppedSrc = e
            this.imageCroppedBase64.emit(e)
          },
          imageCroppedFile: e => this.imageCroppedFile.emit(e),
          imageLoaded: () => this.imageLoaded.emit(),
          cropperReady: () => this.cropperReady.emit(),
          loadImageFailed: () => this.startCropImage.emit(),
        })
      )
    )

    // this.cropperRef.instance.closeDialog.pipe(
    //   tap(() => this.closeCropper()),
    //   takeUntil(this.closed),
    // ).subscribe();

    // this.cropperRef.instance.startCropImage.pipe(
    //   tap(() => this.startCropImage.emit()),
    //   takeUntil(this.closed),
    // ).subscribe();

    // this.cropperRef.instance.imageCropped.pipe(
    //   tap(e => this.imageCropped.emit(e)),
    //   takeUntil(this.closed),
    // ).subscribe();

    // this.cropperRef.instance.imageCroppedBase64.pipe(
    //   tap(encodedSrc => this.croppedSrc = encodedSrc),
    //   tap(e => this.imageCroppedBase64.emit(e)),
    //   takeUntil(this.closed),
    // ).subscribe();

    // this.cropperRef.instance.imageCroppedFile.pipe(
    //   tap(e => this.imageCroppedFile.emit(e)),
    //   takeUntil(this.closed),
    // ).subscribe();

    // this.cropperRef.instance.imageLoaded.pipe(
    //   tap(() => this.imageLoaded.emit()),
    //   takeUntil(this.closed),
    // ).subscribe();

    // this.cropperRef.instance.cropperReady.pipe(
    //   tap(() => this.cropperReady.emit()),
    //   takeUntil(this.closed),
    // ).subscribe();

    // this.cropperRef.instance.loadImageFailed.pipe(
    //   tap(() => this.startCropImage.emit()),
    //   takeUntil(this.closed),
    // ).subscribe();
  }

  private createInjector(data): PortalInjector {
    return new PortalInjector(
      this.injector,
      new WeakMap<any, any>([[IMAGE_CROPPER_DATA, data]])
    )
  }

  fileChangeEvent(event: any): void {
    this.openCropper(event)
  }
}
