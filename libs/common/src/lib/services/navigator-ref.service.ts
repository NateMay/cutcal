import { isPlatformBrowser } from '@angular/common'
import { FactoryProvider, InjectionToken, PLATFORM_ID } from '@angular/core'

export const NAVIGATOR = new InjectionToken('NavigatorToken')

export const navigatorFactory = (platformId: {}): Navigator | null =>
  isPlatformBrowser(platformId) ? navigator : null

export const NAVIGATOR_PROVIDER: FactoryProvider = {
  provide: NAVIGATOR,
  useFactory: navigatorFactory,
  deps: [PLATFORM_ID],
}
