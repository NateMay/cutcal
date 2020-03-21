import { isPlatformBrowser } from '@angular/common'
import {
  ClassProvider,
  FactoryProvider,
  Inject,
  Injectable,
  InjectionToken,
  PLATFORM_ID,
} from '@angular/core'

export const NAVIGATOR = new InjectionToken('NavigatorToken')

/* Define abstract class for obtaining reference to the global Navigator object. */
export abstract class NavigatorRef {
  get nativeNavigator(): Navigator | object {
    throw new Error(
      '[CutCal] NavigatorRef is an abstract class but is being references'
    )
  }
}

/* Define class that implements the abstract class and returns the native Navigator object. */
@Injectable({ providedIn: 'root' })
export class BrowserNavigatorRef extends NavigatorRef {
  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    super()
  }

  get nativeNavigator(): Navigator | object {
    if (isPlatformBrowser(this.platformId)) {
      return navigator
    } else
      throw Error(
        '[CutCal] navigator is not implemented on this platform, but is being referenced'
      )
  }
}
/* Create an factory function that returns the native Navigator object. */
export const navigatorFactory = (
  browserNavigatorRef: BrowserNavigatorRef,
  platformId: object
): Navigator | object =>
  isPlatformBrowser(platformId)
    ? browserNavigatorRef.nativeNavigator
    : new Object()

const browserNavigatorProvider: ClassProvider = {
  provide: NavigatorRef,
  useClass: BrowserNavigatorRef,
}

/* Create an injectable provider that uses the NavigatorFactory function for returning the native Navigator object. */
const NavigatorProvider: FactoryProvider = {
  provide: NAVIGATOR,
  useFactory: navigatorFactory,
  deps: [NavigatorRef, PLATFORM_ID],
}

/* Create an array of providers. */
export const NAVIGATOR_PROVIDER = [browserNavigatorProvider, NavigatorProvider]
