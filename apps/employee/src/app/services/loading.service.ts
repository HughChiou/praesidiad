import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { LoadingComponent } from '../components/loading/loading.component';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  overlayRef?: OverlayRef;

  constructor(private overlay: Overlay) {}

  show() {
    this.overlayRef = this.overlay.create({
      positionStrategy: this.overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically(),
      hasBackdrop: true,
    });

    this.overlayRef.attach(new ComponentPortal(LoadingComponent));
  }

  hide() {
    this.overlayRef?.detach();
  }
}
