import { DebugElement } from '@angular/core'
import { ComponentFixture } from '@angular/core/testing'
import { By } from '@angular/platform-browser'

export function getByDir(
  fixture: ComponentFixture<any>,
  token: any
): DebugElement {
  return fixture.debugElement.query(By.directive(token))
}
