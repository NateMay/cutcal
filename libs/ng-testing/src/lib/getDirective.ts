import { DebugElement } from '@angular/core'
import { By } from '@angular/platform-browser'

export const getDirective = <T>(debugElement: DebugElement, token: any): T =>
  debugElement.query(By.directive(token)).injector.get(token)
