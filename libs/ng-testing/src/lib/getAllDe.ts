import { DebugElement } from '@angular/core'
import { ComponentFixture } from '@angular/core/testing'
import { By } from '@angular/platform-browser'

export const getAllDe = (
  fixture: ComponentFixture<any>,
  css: string
): DebugElement[] => fixture.debugElement.queryAll(By.css(css))
