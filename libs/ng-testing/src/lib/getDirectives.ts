import { DebugElement, Type } from '@angular/core'
import { By } from '@angular/platform-browser'

export const getDirectives = <T>(debugElement: DebugElement, token: Type<T>): T[] =>
  debugElement.queryAll(By.directive(token)).map((de) => de.injector.get(token))
