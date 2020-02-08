import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { getByDir } from '@cutcal/ng-testing';
import { Boolish } from './boolish';

@Component({
  template: `
    <cc-test [aBoolean]="notABoolean"></cc-test>
  `,
})
class TestBoolishComponent {
  notABoolean;
}
@Component({
  selector: 'cc-test',
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
    component.notABoolean = 'true';
    child.aBoolean = false;
    fixture.detectChanges();
    expect(child.aBoolean).toBe(true);
  });

  it('should fix bad booleans | "false"', () => {
    component.notABoolean = 'false';
    child.aBoolean = true;
    fixture.detectChanges();
    expect(child.aBoolean).toBe(false);
  });

  it('should not affect when undefined, starting with true', () => {
    child.aBoolean = true;
    fixture.detectChanges();
    expect(child.aBoolean).toBe(true);
  });

  it('should not affect when undefined, start false', () => {
    child.aBoolean = false;
    fixture.detectChanges();
    expect(child.aBoolean).toBe(false);
  });

  it('should fix bad booleans | null', () => {
    component.notABoolean = null;
    child.aBoolean = true;
    fixture.detectChanges();
    expect(child.aBoolean).toBe(false);
  });

  it('should fix bad booleans | 3', () => {
    component.notABoolean = 3;
    child.aBoolean = false;
    fixture.detectChanges();
    expect(child.aBoolean).toBe(true);
  });

  it('should fix bad booleans | 0', () => {
    component.notABoolean = 0;
    child.aBoolean = true;
    fixture.detectChanges();
    expect(child.aBoolean).toBe(false);
  });
  it('should fix bad booleans | 0', () => {
    component.notABoolean = 0;
    child.aBoolean = true;
    fixture.detectChanges();
    expect(child.aBoolean).toBe(false);
  });
});
