import { DebugElement } from '@angular/core'
import { By } from '@angular/platform-browser'

export function getDirective<T>(debugElement: DebugElement, token: any): T {
  return debugElement.query(By.directive(token)).injector.get(token)
}
