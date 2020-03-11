import { NO_ERRORS_SCHEMA, SimpleChanges } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TimePeriod } from '../../models/time-period.enum';
import * as TimepickerTime from '../../utils/timepicker-time.utils';
import { Timepicker12HoursFaceComponent } from './time-picker-12-hours-face.component';

describe('Timepicker12HoursFaceComponent', () => {
  let fixture: ComponentFixture<Timepicker12HoursFaceComponent>;
  let component: Timepicker12HoursFaceComponent;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [Timepicker12HoursFaceComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).createComponent(Timepicker12HoursFaceComponent);

    component = fixture.componentInstance;
  });

  it('should call disabledHours once period changed', () => {
    const spy = jest.spyOn(TimepickerTime, 'disableHours');
    const changes: SimpleChanges = {
      period: {
        currentValue: TimePeriod.PM,
        previousValue: undefined,
        firstChange: true,
        isFirstChange: (): boolean => true,
      },
    };
    const time = new Date();
    const format = 12;
    const period = TimePeriod.PM;
    const hours = TimepickerTime.getHours(format);
    component.minTime = time;
    component.maxTime = time;
    component.format = format;
    component.period = period;
    component.hoursList = hours;

    component.ngOnChanges(changes);
    expect(spy).toHaveBeenCalledWith(hours, {
      min: time,
      max: time,
      format,
      period,
    });
  });

  it('should not call disabledHours', () => {
    const spy = jest.spyOn(TimepickerTime, 'disableHours');
    const changes: SimpleChanges = {
      minTime: {
        currentValue: null,
        previousValue: undefined,
        firstChange: true,
        isFirstChange: (): boolean => true,
      },
    };

    component.ngOnChanges(changes);
    expect(spy).toHaveBeenCalledTimes(0);
  });

  it('should generate array with 12 items', () => {
    expect(component.hoursList).toHaveLength(12);
  });

  it('should emit selected hour (12hr format)', async(() => {
    const time = 10;

    component.hourSelected.subscribe(hour => expect(hour).toBe(time));
    component.onTimeSelected(time);
  }));
});
