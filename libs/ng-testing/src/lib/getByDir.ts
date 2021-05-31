import { DebugElement, Type } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing'
import { By } from '@angular/platform-browser'

export const getByDir = <T>(
  fixture: ComponentFixture<any>,
  token: Type<T>
): DebugElement => fixture.debugElement.query(By.directive(token))
