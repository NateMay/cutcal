import { ElementRef, NO_ERRORS_SCHEMA, SimpleChanges } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick
} from '@angular/core/testing';
import { StyleSanitizerPipe } from '@cutcal/common-ui';
import { DsMinutesFormatterPipe } from './minutes-formatter';
import { DsTimepickerFace } from './timepicker-face';
import { ClockFaceTime, TimeUnit } from './timepicker-utils';

describe('TimepickerFaceComponent', () => {
  let fixture: ComponentFixture<DsTimepickerFace>;
  let component: DsTimepickerFace;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [
        DsTimepickerFace,
        StyleSanitizerPipe,
        DsMinutesFormatterPipe
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).createComponent(DsTimepickerFace);

    component = fixture.componentInstance;
  });

  it('trackByTime should return time', () => {
    const time: ClockFaceTime = { time: 10, angle: 360 };
    expect(component.trackByTime(1, time)).toBe(10);
  });

  it('should set clock hand position to 30deg', () => {
    component.selectedTime = { time: 1, angle: 30 };
    component.format = 12;

    component.ngAfterViewInit();
    expect(getStyle(component.clockHand)('transform')).toBe('rotate(30deg)');
  });

  // FIXME (time-picker) broken test
  // _it('should decrease clock hand with format 24 and time more than 12', () => {
  //   component.selectedTime = { time: 13, angle: 30 };
  //   component.format = 24;
  //   component.ngAfterViewInit();

  //   expect(getStyle(component.clockHand)('height')).toBe('75px');
  //   expect(getStyle(component.clockHand)('top')).toBe('calc(50% - 75px)');
  // });

  // // FIXME (time-picker) broken test
  // _it('should decrease clock hand with format 24 and time is "00" ', () => {
  //   component.selectedTime = { time: 0, angle: 30 };
  //   component.format = 24;
  //   component.ngAfterViewInit();

  //   expect(getStyle(component.clockHand)('height')).toBe('75px');
  //   expect(getStyle(component.clockHand)('top')).toBe('calc(50% - 75px)');
  // });

  // FIXME (time-picker) broken test
  // _it('should increase clock hand with format 24 and time less or equal 12', () => {
  //   component.selectedTime = { time: 12, angle: 30 };
  //   component.format = 24;
  //   component.ngAfterViewInit();

  //   expect(getStyle(component.clockHand)('height')).toBe('103px');
  //   expect(getStyle(component.clockHand)('top')).toBe('calc(50% - 103px)');
  // });

  it('should change selectedTime on faceTime and selectedTime changes', () => {
    component.selectedTime = { time: 12, angle: 30 };
    component.faceTime = [
      { time: 11, angle: 30, disabled: false },
      { time: 12, angle: 30, disabled: true }
    ];
    const changes: SimpleChanges = {
      faceTime: {
        currentValue: [{ time: 11, angle: 20 }],
        previousValue: undefined,
        isFirstChange: (): boolean => true,
        firstChange: true
      },
      selectedTime: {
        currentValue: { time: 11, angle: 30 },
        previousValue: undefined,
        isFirstChange: (): boolean => true,
        firstChange: true
      }
    };
    component.ngOnChanges(changes);

    expect(component.selectedTime).toEqual({
      time: 12,
      angle: 30,
      disabled: true
    });
  });

  it('should set clock hand position on selectedTime changes', () => {
    component.selectedTime = { time: 11, angle: 30 };
    const changes: SimpleChanges = {
      selectedTime: {
        currentValue: { time: 11, angle: 30 },
        previousValue: undefined,
        isFirstChange: (): boolean => true,
        firstChange: true
      }
    };
    component.ngOnChanges(changes);

    expect(getStyle(component.clockHand)('transform')).toBe('rotate(30deg)');
  });

  it('should select available time', fakeAsync(() => {
    component.selectedTime = { time: 11, angle: 30 };
    component.faceTime = [
      { time: 11, angle: 30, disabled: true },
      { time: 12, angle: 30, disabled: false }
    ];
    const changes: SimpleChanges = {
      faceTime: {
        currentValue: [],
        previousValue: undefined,
        isFirstChange: (): boolean => true,
        firstChange: true
      }
    };
    let updatedTime: ClockFaceTime = { time: 1, angle: 20 };
    component.timeChange.subscribe(
      (time: ClockFaceTime) => (updatedTime = time)
    );
    component.ngOnChanges(changes);
    tick();
    expect(updatedTime).toEqual({ time: 12, angle: 30, disabled: false });
  }));

  it('should not emit time if no one is available', fakeAsync(() => {
    component.selectedTime = { time: 11, angle: 30 };
    component.faceTime = [
      { time: 11, angle: 30, disabled: true },
      { time: 12, angle: 30, disabled: true }
    ];
    const changes: SimpleChanges = {
      faceTime: {
        currentValue: [],
        previousValue: undefined,
        isFirstChange: (): boolean => true,
        firstChange: true
      }
    };
    let updatedTime: ClockFaceTime = { time: 1, angle: 20 };
    component.timeChange.subscribe(
      (time: ClockFaceTime) => (updatedTime = time)
    );
    component.ngOnChanges(changes);
    tick();
    expect(updatedTime).toEqual({ time: 1, angle: 20 });
  }));

  describe('Select time', () => {
    const mouseClickEvent = new MouseEvent('click');
    const mouseMoveEvent = new MouseEvent('mousemove');
    const hourFaceTime = [
      { time: 1, angle: 30, disabled: false },
      { time: 2, angle: 60, disabled: false },
      { time: 3, angle: 90, disabled: false },
      { time: 4, angle: 120, disabled: false },
      { time: 5, angle: 150, disabled: false },
      { time: 6, angle: 180, disabled: false },
      { time: 7, angle: 210, disabled: false },
      { time: 8, angle: 240, disabled: false },
      { time: 9, angle: 270, disabled: false },
      { time: 10, angle: 300, disabled: false },
      { time: 11, angle: 330, disabled: false },
      { time: 12, angle: 360, disabled: false },
      { time: 13, angle: 390, disabled: false },
      { time: 14, angle: 420, disabled: false },
      { time: 15, angle: 450, disabled: false },
      { time: 16, angle: 480, disabled: false },
      { time: 17, angle: 510, disabled: false },
      { time: 18, angle: 540, disabled: false },
      { time: 19, angle: 570, disabled: false },
      { time: 20, angle: 600, disabled: false },
      { time: 21, angle: 630, disabled: false },
      { time: 22, angle: 660, disabled: false },
      { time: 23, angle: 690, disabled: false },
      { time: 24, angle: 720, disabled: false }
    ];

    const minutesFaceTime = Array(60)
      .fill(0)
      .map((v: number, i: number) => {
        const index = v + i;
        const angle = (360 / 60) * index;
        return {
          time: index === 0 ? '00' : index,
          angle: angle !== 0 ? angle : 360
        };
      });

    beforeEach(() => {
      component.onMousedown(mouseClickEvent);
    });

    afterEach(() => {
      component.onMouseup(mouseClickEvent);
    });

    it('should do nothing onMouseUp', fakeAsync(() => {
      let counter = 0;

      component.timeChange.subscribe(() => counter++);
      component.onMouseup(mouseClickEvent);
      component.selectTime(mouseMoveEvent);
      tick();
      expect(counter).toBe(0);
    }));

    it('should return angle from I quarter', fakeAsync(() => {
      let selectedTime: ClockFaceTime = { time: 1, angle: 5 };
      const mouseCords: MouseEventInit = { clientX: 706, clientY: 20 };

      component.faceTime = hourFaceTime;
      component.timeChange.subscribe(
        (time: ClockFaceTime) => (selectedTime = time)
      );
      component.selectTime(new MouseEvent('mousemove', mouseCords));
      tick();
      expect(selectedTime.angle > 0 && selectedTime.angle <= 90).toBeTruthy();
    }));

    it('should return angle from II quarter', fakeAsync(() => {
      let selectedTime: ClockFaceTime = { time: 1, angle: 5 };
      const mouseCords: MouseEventInit = { clientX: 703, clientY: 581 };

      component.faceTime = hourFaceTime;
      component.timeChange.subscribe(
        (time: ClockFaceTime) => (selectedTime = time)
      );
      component.selectTime(new MouseEvent('mousemove', mouseCords));
      tick();
      expect(selectedTime.angle > 90 && selectedTime.angle <= 180).toBeTruthy();
    }));

    // FIXME (time-picker) broken test
    // _it('should return angle from III quarter', fakeAsync(() => {
    //   let selectedTime: ClockFaceTime = { time: 1, angle: 5 };
    //   const mouseCords: MouseEventInit = { clientX: 2, clientY: 500 };

    //   component.faceTime = hourFaceTime;
    //   component.timeChange.subscribe(
    //     (time: ClockFaceTime) => (selectedTime = time)
    //   );
    //   component.selectTime(new MouseEvent('mousemove', mouseCords));
    //   tick();
    //   expect(
    //     selectedTime.angle > 180 && selectedTime.angle <= 270
    //   ).toBeTruthy();
    // }));

    // FIXME (time-picker) broken test
    // _it('should return angle from IV quarter', fakeAsync(() => {
    //   let selectedTime: ClockFaceTime = { time: 1, angle: 5 };
    //   const mouseCords: MouseEventInit = { clientX: 20, clientY: 20 };

    //   component.faceTime = hourFaceTime;
    //   component.timeChange.subscribe(
    //     (time: ClockFaceTime) => (selectedTime = time)
    //   );
    //   component.selectTime(new MouseEvent('mousemove', mouseCords));
    //   tick();
    //   expect(
    //     selectedTime.angle > 270 && selectedTime.angle <= 360
    //   ).toBeTruthy();
    // }));

    it('should select hour from inner clock face', fakeAsync(() => {
      let selectedTime: ClockFaceTime = { time: 1, angle: 5 };
      const mouseCords: MouseEventInit = { clientX: 150, clientY: 200 };

      component.faceTime = hourFaceTime;
      component.format = 24;
      component.timeChange.subscribe(
        (time: ClockFaceTime) => (selectedTime = time)
      );

      component.selectTime(new MouseEvent('mousemove', mouseCords));
      tick(1);
      expect(selectedTime.angle > 360).toBeFalsy();
    }));

    it('should select minute from list', fakeAsync(() => {
      let selectedTime: ClockFaceTime = { time: 1, angle: 5 };
      const mouseCords: MouseEventInit = { clientX: 20, clientY: 20 };

      component.faceTime = minutesFaceTime as ClockFaceTime[];
      component.unit = TimeUnit.MINUTE;
      component.timeChange.subscribe(
        (time: ClockFaceTime) => (selectedTime = time)
      );

      component.selectTime(new MouseEvent('mousemove', mouseCords));
      tick();
      expect(selectedTime.angle).toBeDefined();
    }));

    it('should not emit timeChanged', fakeAsync(() => {
      let selectedTime: ClockFaceTime = { time: 1, angle: 5 };
      const mouseCords: MouseEventInit = { clientX: 150, clientY: 200 };

      hourFaceTime.forEach((h) => (h.disabled = true));
      component.faceTime = hourFaceTime;
      component.timeChange.subscribe(
        (time: ClockFaceTime) => (selectedTime = time)
      );

      component.selectTime(new MouseEvent('mousemove', mouseCords));
      tick();
      expect(selectedTime).toEqual({ time: 1, angle: 5 });
    }));

    // _it('should emit selected time once user stop interaction with clock face', () => {
    //   const mouseCords: MouseEventInit = { clientX: 20, clientY: 20 };

    //   component.faceTime = minutesFaceTime;
    //   component.unit = TimeUnit.MINUTE;

    //   component.timeSelected.subscribe((time: ClockFaceTime) => {
    //     // depends on the screen resolution
    //     expect(time).toBeGreaterThanOrEqual(56);
    //     expect(time).toBeLessThanOrEqual(57);
    //   });
    //   component.onMouseup(mouseClickEvent);
    //   component.selectTime(new MouseEvent('click', mouseCords));
    // });

    it(`should return 'true' or 'false' whether hour is selected or not`, () => {
      component.selectedTime = { time: 1, angle: 30 };
      component.isClockFaceDisabled = false;

      expect(component.isHourSelected(1)).toBeTruthy();
      expect(component.isHourSelected(2)).toBeFalsy();

      component.isClockFaceDisabled = true;
      expect(component.isHourSelected(1)).toBeFalsy();
    });

    it(`should return 'true' or 'false' whether minute is selected or not`, () => {
      const minute = 10;
      component.selectedTime = { time: minute, angle: 30 };
      component.isClockFaceDisabled = false;
      component.minutesGap = 10;

      expect(component.isMinuteSelected(minute)).toBeTruthy();
      expect(component.isMinuteSelected(5)).toBeFalsy();

      component.isClockFaceDisabled = true;
      expect(component.isMinuteSelected(minute)).toBeFalsy();

      component.isClockFaceDisabled = false;
      component.minutesGap = null;
      component.selectedTime.time = 5;
      expect(component.isMinuteSelected(5)).toBeTruthy();
    });
  });
});

const getStyle = (element: ElementRef): ((prop: string) => string) => (
  prop: string
): string => (element.nativeElement as HTMLElement).style[prop] as string;
