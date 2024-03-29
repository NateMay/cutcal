import { isPlatformBrowser } from '@angular/common'
import {
  ClassProvider,
  FactoryProvider,
  Inject,
  Injectable,
  InjectionToken,
  PLATFORM_ID
} from '@angular/core'

// TODO: alternative - https://medium.com/angular-in-depth/make-the-most-of-angular-di-private-providers-concept-93fcb8ec4ab3

export const WINDOW = new InjectionToken('WindowToken')

export abstract class WindowRef {
  get nativeWindow(): Window {
    throw Error(
      '[CutCal] WindowRef is an abstract class but is being references'
    )
  }
}

@Injectable({ providedIn: 'root' })
export class BrowserWindowRef extends WindowRef {
  constructor(@Inject(PLATFORM_ID) private readonly platformId: InjectionToken<unknown>) {
    super()
  }
  get nativeWindow(): Window {
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
  platformId: InjectionToken<unknown>
): Window =>
  isPlatformBrowser(platformId) ? browserWindowRef.nativeWindow : new Object() as Window

const browserWindowProvider: ClassProvider = {
  provide: WindowRef,
  useClass: BrowserWindowRef
}

const windowProvider: FactoryProvider = {
  provide: WINDOW,
  useFactory: windowFactory,
  deps: [WindowRef, PLATFORM_ID]
}

export const WINDOW_PROVIDER = [browserWindowProvider, windowProvider]
