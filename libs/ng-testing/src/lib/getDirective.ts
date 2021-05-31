import { DebugElement, Type } from '@angular/core';
import { By } from '@angular/platform-browser'

export const getDirective = <T>(debugElement: DebugElement, token: Type<T>): T =>
  debugElement.query(By.directive(token)).injector.get(token)
