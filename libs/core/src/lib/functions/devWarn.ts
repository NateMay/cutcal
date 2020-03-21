import { isDevMode } from '@angular/core'
export const devWarn = (message: string) => {
  if (isDevMode()) console.warn(`[CutCal] ${message}`)
}
