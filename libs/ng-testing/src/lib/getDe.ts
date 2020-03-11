import { DebugElement } from '@angular/core'
import { ComponentFixture } from '@angular/core/testing'
import { By } from '@angular/platform-browser'

export const getDe = (
  fixture: ComponentFixture<any>,
  css: string
): DebugElement => fixture.debugElement.query(By.css(css))
