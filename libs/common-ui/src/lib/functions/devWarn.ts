import { isDevMode } from '@angular/core'
export const devWarn = (message: string): void => {
  if (isDevMode()) console.warn(`[CutCal] ${message}`)
}
