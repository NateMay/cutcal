import { DebugElement } from '@angular/core'
import { ComponentFixture } from '@angular/core/testing'
import { By } from '@angular/platform-browser'

export function getAllDe(
  fixture: ComponentFixture<any>,
  css: string
): DebugElement[] {
  return fixture.debugElement.queryAll(By.css(css))
}
