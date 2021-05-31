import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { getByDir } from '@cutcal/ng-testing';
import { Boolish } from './boolish';

@Component({
  template: ` <ds-a-test [aBoolean]="notABoolean"></ds-a-test> `
})
class TestBoolishComponent {
  notABoolean: string = 'false';
}
@Component({
  selector: 'ds-a-test',
  template: ``
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
      declarations: [TestBoolishComponent, TestBoolishChildComponent]
    });
    fixture = TestBed.createComponent(TestBoolishComponent);
    component = fixture.componentInstance;
    child = getByDir(fixture, TestBoolishChildComponent).componentInstance as TestBoolishChildComponent;
  });

  it('should load instance', () => {
    expect(component).toBeTruthy();
  });

  it('should fix bad booleans - "false"', () => {
    fixture.detectChanges();
    expect(child.aBoolean).toBe(false);
  });

  it('should fix bad booleans - "true"', () => {
    component.notABoolean = 'true';
    child.aBoolean = false;
    fixture.detectChanges();
    expect(child.aBoolean).toBe(true);
  });

  it('should fix bad booleans - true', () => {
    component.notABoolean = undefined;
    child.aBoolean = true;
    fixture.detectChanges();
    expect(child.aBoolean).toBe(true);
  });

  it('should fix bad booleans - false', () => {
    component.notABoolean = undefined;
    child.aBoolean = false;
    fixture.detectChanges();
    expect(child.aBoolean).toBe(false);
  });
});
