import { DebugElement } from '@angular/core'
import { By } from '@angular/platform-browser'

export function getDirectives<T>(debugElement: DebugElement, token: any): T[] {
  return debugElement
    .queryAll(By.directive(token))
    .map(de => de.injector.get(token))
}
