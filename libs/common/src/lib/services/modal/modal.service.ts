import { OverlayRef } from '@angular/cdk/overlay'
import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'

/**
 * Service for managing modals
 */

@Injectable({
  providedIn: 'root',
})
export class ModalSvc {
  _currentOverlayRef: OverlayRef

  // emits a Component to the app component to launch
  _modal: Subject<any> = new Subject()
  get modal() {
    return this._modal.asObservable()
  }

  /**
   * Stores the OverlayRef for dispose()ing later
   * @returns {void}
   * @example this.modalSvc.overlayRef = this.overlay.create(this.modalConfig);
   */
  set overlayRef(overlayRef: OverlayRef) {
    this._currentOverlayRef = overlayRef
  }

  /**
   * Retrieves the stored OverlayRef for dispose()ing
   * @returns {OverlayRef} reference to the overlay
   */
  get overlayRef() {
    return this._currentOverlayRef
  }

  /**
   * Opens a component within the body of the modal
   * @returns {void}
   * @example this.modalSvc.open(SignInComponent)
   */
  open(component: any): void {
    this._modal.next(component)
  }

  /**
   * Opens a component within the body of the modal
   * @returns {void}
   * @example this.modalSvc.open(SignInComponent)
   */
  dispose(): void {
    this._currentOverlayRef.dispose()
  }
}
