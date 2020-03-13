import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ClockFaceTime } from '../../models/clock-face-time.interface';
import { TimePeriod } from '../../models/time-period.enum';
import { TimeUnit } from '../../models/time-unit.enum';
import { TimepickerDialComponent } from './time-picker-dial.component';

describe('TimepickerDialComponent', () => {
  let fixture: ComponentFixture<TimepickerDialComponent>;
  let component: TimepickerDialComponent;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [TimepickerDialComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).createComponent(TimepickerDialComponent);

    component = fixture.componentInstance;
  });

  it('should emit changed time unit', fakeAsync(() => {
    let timeUnit: TimeUnit | null = null;

    component.timeUnitChanged.subscribe((unit: TimeUnit) => (timeUnit = unit));
    component.changeTimeUnit(TimeUnit.MINUTE);

    expect(timeUnit).toBe(TimeUnit.MINUTE);
  }));

  it('should emit changed period', fakeAsync(() => {
    let period = TimePeriod.AM;

    component.periodChanged.subscribe((p: TimePeriod) => (period = p));
    component.changePeriod(TimePeriod.PM);

    tick();
    expect(period).toBe(TimePeriod.PM);
  }));

  it('should emit changed hour', fakeAsync(() => {
    let hour = { time: 1, angle: 30 };

    component.hourChanged.subscribe((h: ClockFaceTime) => (hour = h));
    component.changeHour({ time: 2, angle: 60 });

    tick();
    expect(hour).toEqual({ time: 2, angle: 60 });
  }));

  it('should emit changed minute', fakeAsync(() => {
    let minute = { time: 10, angle: 30 };

    component.minuteChanged.subscribe((m: ClockFaceTime) => (minute = m));
    component.changeMinute({ time: 20, angle: 60 });

    tick();
    expect(minute).toEqual({ time: 20, angle: 60 });
  }));

  it('should set isHintVisible true', () => {
    expect(component.isHintVisible).toBeFalsy();

    component.showHint();

    expect(component.isHintVisible).toBeTruthy();
  });

  it('should set isHintVisible false', () => {
    component.isHintVisible = true;

    component.hideHint();

    expect(component.isHintVisible).toBeFalsy();
  });
});
