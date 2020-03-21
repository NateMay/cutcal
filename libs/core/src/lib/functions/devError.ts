import { isDevMode } from '@angular/core'
export const devError = (message: string) => {
  if (isDevMode()) console.error(`[CutCal] ${message}`)
}
