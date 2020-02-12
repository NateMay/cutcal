import { Component, DebugElement } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { getDe } from '@cutcal/ng-testing';
import { HoldableDirective } from './holdable.dir';

@Component({
  template: `
    <button holdable (holdTime)="holdTime($event)" [interval]="interval">
      A Button: {{ currTime }}
    </button>
  `,
})
class TestHoldableDirectiveComponent {
  interval: number = 100;

  currTime: number;

  holdTime(holdTime: number) {
    this.currTime = holdTime;
  }
}

describe('HoldableDirective', () => {
  let component: TestHoldableDirectiveComponent;
  let fixture: ComponentFixture<TestHoldableDirectiveComponent>;
  let button: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestHoldableDirectiveComponent, HoldableDirective],
    });

    fixture = TestBed.createComponent(TestHoldableDirectiveComponent);
    component = fixture.componentInstance;
    button = getDe(fixture, 'button');
  });

  it('emits holdtime to the host properly, clearing after mouseup', fakeAsync(() => {
    component.interval = 200;
    fixture.detectChanges();
    const holdTimeSpy = spyOn(component, 'holdTime');

    button.triggerEventHandler('mousedown', null);
    tick(1000);
    fixture.detectChanges();

    [0, 200, 400, 600, 800].forEach(num =>
      expect(holdTimeSpy).toHaveBeenCalledWith(num)
    );

    expect(holdTimeSpy).not.toHaveBeenCalledWith(100);

    holdTimeSpy.calls.reset();
    button.triggerEventHandler('mouseup', null);
    fixture.detectChanges();
    expect(holdTimeSpy).toHaveBeenCalledWith(0);
  }));
});
