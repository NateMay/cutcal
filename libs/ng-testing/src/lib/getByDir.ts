import { DebugElement } from '@angular/core'
import { ComponentFixture } from '@angular/core/testing'
import { By } from '@angular/platform-browser'

export const getByDir = (
  fixture: ComponentFixture<any>,
  token: any
): DebugElement => fixture.debugElement.query(By.directive(token))
