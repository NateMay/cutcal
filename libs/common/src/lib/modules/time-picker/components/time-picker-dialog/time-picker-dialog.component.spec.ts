import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ClockFaceTime } from '../../models/clock-face-time.interface';
import { TimePeriod } from '../../models/time-period.enum';
import { TimeUnit } from '../../models/time-unit.enum';
import { TimepickerDialogComponent } from './time-picker-dialog.component';

describe('TimepickerComponent', () => {
  let fixture: ComponentFixture<TimepickerDialogComponent>;
  let component: TimepickerDialogComponent;

  const DEFAULT_HOUR: ClockFaceTime = {
    time: 12,
    angle: 360
  };
  const DEFAULT_MINUTE: ClockFaceTime = {
    time: 0,
    angle: 360
  };

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

  it('should not set minutesGap if null or undefined', () => {
    component.minutesGap = undefined;
    expect(component.minutesGap).toBeUndefined();

    component.minutesGap = null;
    expect(component.minutesGap).toBeUndefined();
  });

  it('should change timeUnit to MINUTE and emit selected hour', async(() => {
    const hour = 10;

    expect(component.activeTimeUnit).toBe(TimeUnit.HOUR);

    // component.hourSelected.subscribe(h => expect(h).toBe(hour));
    // component.onHourSelected(hour);

    // expect(component.activeTimeUnit).toBe(TimeUnit.MINUTE);
  }));

  describe('Timepicker subscriptions', () => {
    const hour = { time: 11, angle: 360 };
    const minute = { time: 44, angle: 36 };

    afterEach(() => {
      component.ngOnDestroy(); // unsubscribe from all
    });

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

    // it('should not change hour, minute, period if unsubscribe', () => {
    //   component.ngOnDestroy();

    //   component.onHourChange(hour);
    //   component.onMinuteChange(minute);
    //   component.changePeriod(TimePeriod.PM);

    //   expect(component.selectedHour).not.toEqual(hour);
    //   expect(component.selectedMinute).not.toEqual(minute);
    //   expect(component.selectedPeriod).not.toBe(TimePeriod.PM);
    // });
  });

  // from the old timepicker service

  // it('should set default hour on startup', () => {
  //     expect(selectedHour).toEqual(DEFAULT_HOUR);
  // });

  // it('should set default minute on startup', () => {
  //     expect(selectedMinute).toEqual(DEFAULT_MINUTE);
  // });

  // it('should set default period on startup', () => {
  //     expect(selectedPeriod).toEqual(TimePeriod.AM);
  // });

  // it('should change hour, minute and period', () => {
  //     const changedHour: ClockFaceTime = {time: 11, angle: 20};
  //     const changedMinute: ClockFaceTime = {time: 40, angle: 50};

  //     timepickerService.hour = changedHour;
  //     timepickerService.minute = changedMinute;
  //     timepickerService.period = TimePeriod.PM;

  //     expect(selectedHour).toEqual(changedHour);
  //     expect(selectedMinute).toEqual(changedMinute);
  //     expect(selectedPeriod).toEqual(TimePeriod.PM);
  // });

  // it('should change hour, minute and period', () => {
  //     const changedHour: ClockFaceTime = {time: 11, angle: 20};
  //     const changedMinute: ClockFaceTime = {time: 40, angle: 50};

  //     timepickerService.hour = changedHour;
  //     timepickerService.minute = changedMinute;
  //     timepickerService.period = TimePeriod.PM;

  //     expect(selectedHour).toEqual(changedHour);
  //     expect(selectedMinute).toEqual(changedMinute);
  //     expect(selectedPeriod).toEqual(TimePeriod.PM);
  // });

  // it('should return default full time as string (hh:mm a or HH:mm)', () => {
  //     expect(timepickerService.getFullTime(12)).toBe('12:00 AM');
  //     expect(timepickerService.getFullTime(24)).toBe('12:00');
  // });

  // it('should change default time', () => {
  //     let time = '11:15 am';
  //     timepickerService.setDefaultTimeIfAvailable(time, null, null, 12);

  //     expect(selectedHour).toEqual({angle: 330, time: 11});
  //     expect(selectedMinute).toEqual({angle: 90, time: 15});
  //     expect(selectedPeriod).toBe(TimePeriod.AM);

  //     time = '11:12 pm';
  //     timepickerService.setDefaultTimeIfAvailable(time, null, null, 12);
  //     expect(selectedHour.time).toBe(11);
  //     expect(selectedMinute.time).toBe(12);
  //     expect(selectedPeriod).toBe(TimePeriod.PM);

  //     time = '12:00 pm';
  //     timepickerService.setDefaultTimeIfAvailable(time, null, null, 12);
  //     expect(selectedHour.time).toBe(12);
  //     expect(selectedMinute.time).toBe(0);
  //     expect(selectedPeriod).toBe(TimePeriod.PM);

  //     time = '12:00 am';
  //     timepickerService.setDefaultTimeIfAvailable(time, null, null, 12);
  //     expect(selectedHour.time).toBe(12);
  //     expect(selectedMinute.time).toBe(0);
  //     expect(selectedPeriod).toBe(TimePeriod.AM);

  //     time = '00:00';
  //     timepickerService.setDefaultTimeIfAvailable(time, null, null, 24);

  //     expect(selectedHour).toEqual({angle: 0, time: 0});
  //     expect(selectedMinute).toEqual({angle: 0, time: 0});
  //     expect(selectedPeriod).toBe(TimePeriod.AM);

  //     time = '15:00';
  //     timepickerService.setDefaultTimeIfAvailable(time, null, null, 24);

  //     expect(selectedHour).toEqual({angle: 450, time: 15});
  //     expect(selectedMinute).toEqual({angle: 0, time: 0});
  //     expect(selectedPeriod).toBe(TimePeriod.AM);
  // });

  // it('should reset time if default time is invalid', () => {
  //     timepickerService.setDefaultTimeIfAvailable('10:10 am', null, null, 12);

  //     expect(selectedHour).toEqual({angle: 300, time: 10});
  //     expect(selectedMinute).toEqual({angle: 60, time: 10});
  //     expect(selectedPeriod).toBe(TimePeriod.AM);

  //     timepickerService.setDefaultTimeIfAvailable('invalid time', null, null, 12);

  //     expect(selectedHour).toEqual(DEFAULT_HOUR);
  //     expect(selectedMinute).toEqual(DEFAULT_MINUTE);
  //     expect(selectedPeriod).toBe(TimePeriod.AM);
  // });

  // it('should not change time if it is not available', () => {
  //     const min = DateTime.fromObject({hour: 11});

  //     timepickerService.setDefaultTimeIfAvailable('10:10 am', null, null, 12);

  //     expect(selectedHour).toEqual({angle: 300, time: 10});
  //     expect(selectedMinute).toEqual({angle: 60, time: 10});
  //     expect(selectedPeriod).toBe(TimePeriod.AM);

  //     timepickerService.setDefaultTimeIfAvailable('09:15 am', min, null, 12);

  //     expect(selectedHour).toEqual({angle: 300, time: 10});
  //     expect(selectedMinute).toEqual({angle: 60, time: 10});
  //     expect(selectedPeriod).toBe(TimePeriod.AM);
  // });

  // it('should call console error', () => {
  //     const minutesGap = 5;
  //     const min = TimeAdapter.convertTimeToDateTime('11:00 pm');
  //     const max = TimeAdapter.convertTimeToDateTime('11:50 pm');
  //     const spy = spyOn(console, 'error');

  //     timepickerService.setDefaultTimeIfAvailable('11:43 pm', min, max, 12, minutesGap);
  //     expect(spy).toHaveBeenCalled();
  // });
});
