import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TimePeriod } from '../../models/time-period.enum';
import { TimeUnit } from '../../models/time-unit.enum';
import { getHours, getMinutes } from '../../utils/timepicker-time.utils';
import { TimepickerPeriodComponent } from './time-picker-period.component';

describe('TimepickerPeriodComponent', () => {
  let fixture: ComponentFixture<TimepickerPeriodComponent>;
  let component: TimepickerPeriodComponent;
  const minutes = getMinutes();

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [TimepickerPeriodComponent],
      imports: [NoopAnimationsModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).createComponent(TimepickerPeriodComponent);

    component = fixture.componentInstance;
  });

  it('should change period for hour unit', () => {
    component.activeTimeUnit = TimeUnit.HOUR;
    component.format = 12;
    component.minTime = new Date();
    component.minTime.setHours(1);
    component.maxTime = new Date();
    component.maxTime.setHours(15);
    component.hours = getHours(12);
    component.isPeriodAvailable = false;
    component.periodChanged.subscribe(p => (component.selectedPeriod = p));
    component.changePeriod();

    expect(component.isPeriodAvailable).toBeTruthy();
    expect(component.selectedPeriod).toBe(TimePeriod.PM);
  });

  it('should change period for minute unit', () => {
    component.activeTimeUnit = TimeUnit.MINUTE;
    component.format = 12;
    component.minTime = new Date();
    component.minTime.setHours(1);
    component.maxTime = new Date();
    component.maxTime.setHours(15);
    component.minutes = minutes;
    component.selectedHour = 4;
    component.periodChanged.subscribe(p => (component.selectedPeriod = p));
    component.changePeriod();

    expect(component.selectedPeriod).toBe(TimePeriod.PM);
  });

  it('should set isPeriodAvailable to true', () => {
    component.isPeriodAvailable = false;
    expect(component.isPeriodAvailable).toBeFalsy();

    component.animationDone();
    expect(component.isPeriodAvailable).toBeTruthy();
  });
});
