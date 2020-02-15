import { Overlay } from '@angular/cdk/overlay'
import { Component, OnInit, ViewContainerRef } from '@angular/core'

@Component({
  selector: 'cc-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  // @ViewChild(CdkOverlayOrigin) _overlayOrigin!: CdkOverlayOrigin

  constructor(
    public overlay: Overlay,
    public viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit() {}

  // openSpaghettiPanel() {
  //   const position1: ConnectedPosition = {
  //     originX: 'start',
  //     originY: 'bottom',
  //     overlayX: 'start',
  //     overlayY: 'top',
  //     // weight?: number,
  //     // offsetX?: number,
  //     // offsetY?: number,
  //     panelClass: 'cc-header-search-panel',
  //   }
  //   const strategy = this.overlay
  //     .position()
  //     .flexibleConnectedTo(this._overlayOrigin.elementRef)
  //     .withViewportMargin(20)
  //     .withPositions([position1])

  //   const config = new OverlayConfig({ positionStrategy: strategy })
  //   const overlayRef = this.overlay.create(config)

  //   // TODO: use for the menu
  //   // overlayRef.attach(new ComponentPortal(HeaderSearchComponent, this.viewContainerRef));
  // }
}
