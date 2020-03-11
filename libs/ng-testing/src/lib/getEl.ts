import { ComponentFixture } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { assertIsDefined } from '@cutcal/core'

export function getEl<T extends HTMLElement>(
  fixture: ComponentFixture<any>,
  css: string
): T {
  const el = fixture.debugElement.query(By.css(css))
  assertIsDefined(el.nativeElement)
  return el.nativeElement
}
