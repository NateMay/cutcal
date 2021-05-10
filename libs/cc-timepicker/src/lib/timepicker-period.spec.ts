import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DsTimepickerPeriodComponent } from './timepicker-period';
import { getHours, getMinutes, TimePeriod, TimeUnit } from './timepicker-utils';

describe('TimepickerPeriodComponent', () => {
  let fixture: ComponentFixture<DsTimepickerPeriodComponent>;
  let component: DsTimepickerPeriodComponent;
  const minutes = getMinutes();

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [DsTimepickerPeriodComponent],
      imports: [NoopAnimationsModule],
      schemas: [NO_ERRORS_SCHEMA]
    }).createComponent(DsTimepickerPeriodComponent);

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
    component.periodChanged.subscribe(
      (p: TimePeriod) => (component.selectedPeriod = p)
    );
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
    component.periodChanged.subscribe(
      (p: TimePeriod) => (component.selectedPeriod = p)
    );
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
