import { ComponentFixture } from '@angular/core/testing'
import { By } from '@angular/platform-browser'

export const getAllEl = <T>(fixture: ComponentFixture<any>, css: string): T[] =>
  fixture.debugElement.queryAll(By.css(css)).map(de => <T>de.nativeElement)
