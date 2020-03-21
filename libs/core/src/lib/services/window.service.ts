import { isPlatformBrowser } from '@angular/common'
import {
  ClassProvider,
  FactoryProvider,
  Inject,
  Injectable,
  InjectionToken,
  PLATFORM_ID,
} from '@angular/core'

export const WINDOW = new InjectionToken('WindowToken')

export abstract class WindowRef {
  get nativeWindow(): Window | object {
    throw Error(
      '[CutCal] WindowRef is an abstract class but is being references'
    )
  }
}

@Injectable({ providedIn: 'root' })
export class BrowserWindowRef extends WindowRef {
  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    super()
  }
  get nativeWindow(): Window | object {
    if (isPlatformBrowser(this.platformId)) {
      return window
    } else
      throw Error(
        '[CutCal] window is not implemented on this platform, but is being referenced'
      )
  }
}

export const windowFactory = (
  browserWindowRef: BrowserWindowRef,
  platformId: object
): Window | object =>
  isPlatformBrowser(platformId) ? browserWindowRef.nativeWindow : new Object()

const browserWindowProvider: ClassProvider = {
  provide: WindowRef,
  useClass: BrowserWindowRef,
}

const windowProvider: FactoryProvider = {
  provide: WINDOW,
  useFactory: windowFactory,
  deps: [WindowRef, PLATFORM_ID],
}

export const WINDOW_PROVIDER = [browserWindowProvider, windowProvider]
