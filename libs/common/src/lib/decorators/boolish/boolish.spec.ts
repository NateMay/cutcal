import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { getByDir } from '../../../../../ng-testing/src/lib/getByDir';
import { Boolish } from './boolish';

@Component({
  template: `
    <cc-a-test [aBoolean]="notABoolean"></cc-a-test>
  `,
})
class TestBoolishComponent {
  notABoolean = 'false';
}
@Component({
  selector: 'cc-a-test',
  template: ``,
})
class TestBoolishChildComponent {
  @Boolish
  @Input()
  aBoolean: boolean = true;
}

describe('Boolish Decorator', () => {
  let fixture: ComponentFixture<TestBoolishComponent>;
  let component: TestBoolishComponent;
  let child: TestBoolishChildComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestBoolishComponent, TestBoolishChildComponent],
    });
    fixture = TestBed.createComponent(TestBoolishComponent);
    component = fixture.componentInstance;
    child = getByDir(fixture, TestBoolishChildComponent).componentInstance;
  });

  it('should load instance', () => {
    expect(component).toBeTruthy();
  });

  it('should fix bad booleans', () => {
    fixture.detectChanges();
    expect(child.aBoolean).toBe(false);
  });

  it('should fix bad booleans', () => {
    component.notABoolean = 'true';
    child.aBoolean = false;
    fixture.detectChanges();
    expect(child.aBoolean).toBe(true);
  });

  it('should fix bad booleans', () => {
    component.notABoolean = undefined;
    child.aBoolean = true;
    fixture.detectChanges();
    expect(child.aBoolean).toBe(true);
  });

  it('should fix bad booleans', () => {
    component.notABoolean = undefined;
    child.aBoolean = false;
    fixture.detectChanges();
    expect(child.aBoolean).toBe(false);
  });
});
