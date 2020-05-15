import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { StripHtmlPipe } from './strip-html.pipe';

@Component({
  template: `
    <div>{{ variable | stripHtml }}</div>
  `
})
class TestStripHtml {
  variable = 'No <b>bold</b> tag.';
}

describe('StripHtmlPipe', () => {
  let component: TestStripHtml;
  let fixture: ComponentFixture<TestStripHtml>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestStripHtml, StripHtmlPipe]
    });
    fixture = TestBed.createComponent(TestStripHtml);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it('create an instance', () => {
    fixture.detectChanges();
    expect(
      fixture.debugElement.query(By.css('div')).nativeElement.textContent
    ).toContain('No bold tag.');
  });
});
