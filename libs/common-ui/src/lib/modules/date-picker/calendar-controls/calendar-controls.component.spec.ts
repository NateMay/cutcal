import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { getByDir, getDe, getEl } from '@cutcal/ng-testing';
import { RefocusService } from '../../../services/refocus/refocus.service';
import { CalendarControlsComponent } from './calendar-controls.component';

@Component({
  template: `
    <ds-calendar-controls
      [monthBtnDate]="monthBtnDate"
      [monthBtnDisabled]="monthBtnDisabled"
      [prevBtnLabel]="prevBtnLabel"
      [nextBtnLabel]="nextBtnLabel"
      [format]="format"
      (prevBtn)="prevBtn()"
      (nextBtn)="nextBtn()"
      (monthBtn)="monthBtn()"
    ></ds-calendar-controls>
  `
})
class TestCalControlsComponent {
  monthBtnDate = new Date(2019, 6, 7);

  monthBtnDisabled = false;

  prevBtnLabel = 'prev btn';
  nextBtnLabel = 'next btn';
  format = 'MMMM yyyy';

  prevBtn(): void {}
  nextBtn(): void {}
  monthBtn(): void {}
}

describe('Calendar Controls Component', () => {
  let fixture: ComponentFixture<TestCalControlsComponent>;
  let parent: TestCalControlsComponent;
  let component: CalendarControlsComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarControlsComponent, TestCalControlsComponent],
      imports: [MatIconModule],
      providers: [
        {
          provide: RefocusService,
          useValue: { reCastFocusId: (): void => {} }
        }
      ]
    });

    fixture = TestBed.createComponent(TestCalControlsComponent);
    parent = fixture.componentInstance;
    component = getByDir(fixture, CalendarControlsComponent).componentInstance as CalendarControlsComponent;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it('buttons emit', () => {
    const nextSpy = jest.spyOn(parent, 'nextBtn');
    const prevSpy = jest.spyOn(parent, 'prevBtn');
    const monthSpy = jest.spyOn(parent, 'monthBtn');
    const refocus = jest.spyOn(TestBed.inject(RefocusService), 'reCastFocusId');

    fixture.detectChanges();

    getEl(fixture, '[id^=next-month]').click();
    expect(nextSpy).toHaveBeenCalledTimes(1);
    expect(refocus).toHaveBeenCalledWith(component.nextBtnID);

    getEl(fixture, '[id^=prev-month]').click();
    expect(prevSpy).toHaveBeenCalledTimes(1);
    expect(refocus).toHaveBeenCalledWith(component.prevBtnID);

    getEl(fixture, '[id^=controls-month-btn]').click();
    expect(monthSpy).toHaveBeenCalledTimes(1);
    expect(refocus).toHaveBeenCalledWith(component.monthBtnID);
  });

  it('month button can be disabled', () => {
    parent.monthBtnDisabled = true;
    fixture.detectChanges();
    expect(getDe(fixture, '[id^=controls-month-btn]')).toBeFalsy();
  });

  it('applys the date format', () => {
    parent.format = 'MMM yy';
    parent.monthBtnDate = new Date(2019, 2, 17);
    parent.monthBtnDisabled = true;
    fixture.detectChanges();
    expect(getEl(fixture, '.non-btn-month-label').textContent).toContain(
      'Mar 19'
    );

    parent.format = 'MMM yyyy';
    parent.monthBtnDate = new Date(2018, 3, 17);
    parent.monthBtnDisabled = false;
    fixture.detectChanges();
    expect(getEl(fixture, '[id^=controls-month-btn]').textContent).toContain(
      'Apr 2018'
    );
  });

  it('apply labels', () => {
    parent.prevBtnLabel = 'my prev btn';
    parent.nextBtnLabel = 'my next btn';
    fixture.detectChanges();
    expect(getDe(fixture, '[id^=prev-month]').attributes['aria-label']).toBe(
      'my prev btn'
    );
    expect(getDe(fixture, '[id^=next-month]').attributes['aria-label']).toBe(
      'my next btn'
    );
  });
});
