import { NgModule } from '@angular/core';
import { SwPush, SwUpdate } from '@angular/service-worker';
import { Observable, Subject } from 'rxjs';


/**
 * This is a mock service worker module so that we can continue to develop in dev mode
 * using 'ng serve'. Otherwise, SwPush and SwUpdate cannot be injected into any components
 */
export class SwPushServerMock {
  public isEnabled = true;
  public messages: Observable<object>;
  public subscription: Observable<PushSubscription | null>;
  public requestSubscription(options: { serverPublicKey: string; }): Promise<PushSubscription> {
    return new Promise((resolve) => resolve());
  }
  public unsubscribe(): Promise<void> {
    return new Promise((resolve) => resolve());
  }
}

export class SwUpdateServerMock {
  public available = new Subject();
  public activated = new Subject();
  public isEnabled: boolean = false;

  public checkForUpdate(): Promise<void> {
    return new Promise((resolve) => resolve());
  }
  public activateUpdate(): Promise<void> {
    return new Promise((resolve) => resolve());
  }
}

@NgModule({
  providers: [
    { provide: SwUpdate, useClass: SwUpdateServerMock },
    { provide: SwPush, useClass: SwPushServerMock }
  ]
})
export class ServiceWorkerModuleMock { }
