import { Component } from '@angular/core';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { getEl, MockRouterSvc } from '@cutcal/ng-testing';
import { RefocusService } from './refocus.service';

@Component({
  template: `
    <button id="first">1</button>
    <button id="second">2</button>
  `
})
class TestRefocusComponent {
  constructor(private focuser: RefocusService) {}

  focusOn2(): void {
    this.focuser.reCastFocusId('second');
  }
}

describe('refocus service', () => {
  let fixture: ComponentFixture<TestRefocusComponent>;
  let component: TestRefocusComponent;
  let router: MockRouterSvc;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestRefocusComponent],
      providers: [RefocusService, { provide: Router, useClass: MockRouterSvc }]
    });

    fixture = TestBed.createComponent(TestRefocusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(inject([Router], (testRouter: MockRouterSvc) => {
    router = testRouter;
  }));

  it('should recast focus after a router event to the element corresponding to the id passed in', () => {
    getEl(fixture, '#first').dispatchEvent(new FocusEvent('focus'));
    component.focusOn2();
    router.triggerNavEvents('anything');
    fixture.detectChanges();

    expect(getEl(fixture, '#second')).toBe(<HTMLElement>document.activeElement);
  });
});
