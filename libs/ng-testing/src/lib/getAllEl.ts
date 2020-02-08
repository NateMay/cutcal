import { ComponentFixture } from '@angular/core/testing'
import { By } from '@angular/platform-browser'

export function getAllEl<T>(fixture: ComponentFixture<any>, css: string): T[] {
  return fixture.debugElement
    .queryAll(By.css(css))
    .map(de => <T>de.nativeElement)
}
