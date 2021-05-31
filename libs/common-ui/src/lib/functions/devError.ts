import { isDevMode } from '@angular/core'
export const devError = (message: string): void => {
  if (isDevMode()) console.error(`[CutCal] ${message}`)
}
