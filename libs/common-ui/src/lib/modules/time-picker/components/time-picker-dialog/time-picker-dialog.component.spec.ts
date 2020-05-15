import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TimePeriod } from '../../models/time-period.enum';
import { TimeUnit } from '../../models/time-unit.enum';
import { TimepickerDialogComponent } from './time-picker-dialog.component';

describe('TimepickerComponent', () => {
  let fixture: ComponentFixture<TimepickerDialogComponent>;
  let component: TimepickerDialogComponent;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [TimepickerDialogComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).createComponent(TimepickerDialogComponent);

    component = fixture.componentInstance;
  });

  it('should change time unit from HOUR to MINUTE', () => {
    expect(component.activeTimeUnit).toBe(TimeUnit.HOUR);
    component.changeTimeUnit(TimeUnit.MINUTE);
    expect(component.activeTimeUnit).toBe(TimeUnit.MINUTE);
  });

  it('should update hour, minute and period on setDefaultTime', () => {
    const time = '11:12 am';
    component.setDefaultTime(time);
    expect(component.selectedHour.time).toBe(11);
    expect(component.selectedMinute.time).toBe(12);
    expect(component.selectedPeriod).toBe(TimePeriod.AM);
  });

  it('should set minutesGap to 5', () => {
    expect(component.minutesGap).toBeUndefined();
    component.minutesGap = 5;

    expect(component.minutesGap).toBe(5);
  });

  it('should set minutesGap to 1', () => {
    expect(component.minutesGap).toBeUndefined();
    component.minutesGap = 65;

    expect(component.minutesGap).toBe(1);
  });

  it('should convert minutesGap to int', () => {
    component.minutesGap = 6.5;

    expect(component.minutesGap).toBe(6);
  });

  it('should not set minutesGap if null', () => {
    component.minutesGap = null;
    expect(component.minutesGap).toBeUndefined();
  });

  describe('Timepicker subscriptions', () => {
    const hour = { time: 11, angle: 360 };
    const minute = { time: 44, angle: 36 };

    it('should change hour on onHourChange', () => {
      component.onHourChange(hour);
      expect(component.selectedHour).toEqual(hour);
    });

    it('should change minute on onMinuteChange', () => {
      component.onMinuteChange(minute);
      expect(component.selectedMinute).toEqual(minute);
    });

    it('should change minute on changePeriod', () => {
      component.changePeriod(TimePeriod.PM);
      expect(component.selectedPeriod).toBe(TimePeriod.PM);
    });
  });
});
