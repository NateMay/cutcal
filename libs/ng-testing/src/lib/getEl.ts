import { ComponentFixture } from '@angular/core/testing'
import { By } from '@angular/platform-browser'

export function getEl<T extends HTMLElement>(
  fixture: ComponentFixture<any>,
  css: string
): T {
  const el = fixture.debugElement.query(By.css(css))
  return Boolean(el) ? el.nativeElement : undefined
}
