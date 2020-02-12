import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { getDe } from '../../../../../ng-testing/src/lib/getDe';
import { StyleSanitizerPipe } from './style-sanitizer.pipe';

@Component({
  template: `
    <img [style.background-image]="'url(' + photo + ')' | sanitize" />
  `,
})
class TestSanitizePipeComp {
  photo = '../../../assets/images/april.jpg';
}

describe('Sanitize Pipe', () => {
  let component: TestSanitizePipeComp;
  let fixture: ComponentFixture<TestSanitizePipeComp>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StyleSanitizerPipe, TestSanitizePipeComp],
    });
    fixture = TestBed.createComponent(TestSanitizePipeComp);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it('should only call the handler if a new object is received', () => {
    fixture.detectChanges();
    expect(getDe(fixture, 'img').styles['background-image']).toBe(
      'url("../../../assets/images/april.jpg")'
    );
  });
});
