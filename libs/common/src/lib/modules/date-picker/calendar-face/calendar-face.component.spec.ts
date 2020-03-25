import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { getEl, mockAnimationEvent } from '@cutcal/ng-testing';
import { first } from 'rxjs/operators';
import { CalendarFaceComponent } from './calendar-face.component';

describe('CalendarFaceComponent', () => {
  let component: CalendarFaceComponent;
  let fixture: ComponentFixture<CalendarFaceComponent>;
  let dayButton: HTMLButtonElement;

  const dispatchKeyEvent = (el: any, key: string): void => {
    el.dispatchEvent(new KeyboardEvent('keydown', { key }));
  };

  const focusIn = (): void => {
    fixture.debugElement.nativeElement.dispatchEvent(new FocusEvent('focusin'));
  };
  // const focusOut = (): void => {
  //   fixture.debugElement.nativeElement.dispatchEvent(
  //     new FocusEvent('focusout')
  //   );
  // };

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [NoopAnimationsModule],
      declarations: [CalendarFaceComponent],
      providers: [],
    });

    fixture = TestBed.createComponent(CalendarFaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dayButton = getEl(fixture, '.cal-face-day');
  });

  describe('initialization', () => {
    it('should set the managingFocus to false be default', () => {
      expect(component['managingFocus']).toBe(false);
    });

    it('should set the "_selectedDate" to today be default', () => {
      // if this changes, then other tests may have to initialize selected date to be correct
      expect(component?.selectedDate?.isSameDay(new Date())).toBe(true);
    });
  });

  describe('selectedDate management', () => {
    it('should set the _selectedDate when a new date is passed to it', () => {
      component.selectedDate = new Date(1901, 0, 1);
      expect(component?.selectedDate?.isSameDay(new Date(1901, 0, 1))).toBe(
        true
      );
    });

    it('should emit set the "selectedDateChange" when a new date is passed to it', () => {
      component.selectedDateChange
        .pipe(first())
        .subscribe(date => expect(date).toEqual(new Date(1901, 0, 1)));

      component.selectedDate = new Date(1901, 0, 1);
    });

    it('should call createCalendar() when a new date is passed to it', () => {
      jest.spyOn(component, 'createCalendar');
      component.selectedDate = new Date(1901, 0, 1);
      expect(component.createCalendar).toHaveBeenCalled();
    });

    it('should not set the selectedDate if its already that day', () => {
      component.selectedDate = new Date();
      fixture.detectChanges();

      jest.spyOn(component, 'createCalendar');
      component.selectedDateChange
        .pipe(first())
        .subscribe(() => expect(true).toBe(false)); // should never execute

      component.selectedDate = new Date();
      expect(component.createCalendar).not.toHaveBeenCalled();
    });

    it('should set selectedDate to the argument date when dayClicked(Date) is called', () => {
      component.dayClicked(new Date(2001, 2, 2));
      expect(component.selectedDate).toEqual(new Date(2001, 2, 2));
    });
  });

  describe('slideState', () => {
    it('should set the slideState when a the "foucsDate" is set to a new month', () => {
      component.focusDate = new Date(2018, 0, 1);

      component.focusDate = new Date(2018, 1, 1);
      fixture.detectChanges();
      expect(component.slideState).toBe('left');

      component.focusDate = new Date(2018, 0, 1);
      fixture.detectChanges();
      expect(component.slideState).toBe('right');
    });

    it('should set "slideSate" to "center" onAnimationEvent() is called with "left" or "right" as the "fromState"', () => {
      component.onAnimationEvent(mockAnimationEvent('left', 'whatever'));
      expect(component.slideState).toBe('center');

      component.slideState = 'left';

      component.onAnimationEvent(mockAnimationEvent('right', 'whatever'));
      expect(component.slideState).toBe('center');
    });

    it('should set "slideSate" to the opposite (left or right) whenonAnimationEvent() is called with "left" or "center"', () => {
      component.onAnimationEvent(mockAnimationEvent('center', 'left'));
      expect(component.slideState).toBe('right');

      component.onAnimationEvent(mockAnimationEvent('center', 'right'));
      expect(component.slideState).toBe('left');
    });
  });

  describe('focusDate management', () => {
    it('should set the _focusDate when a new date is passed to it', () => {
      component.focusDate = new Date(1901, 0, 1);
      expect(component['_focusDate']).toEqual(new Date(1901, 0, 1));
    });

    it('should emit set the "focusDateChange" when a new date is passed to it', () => {
      component.focusDateChange
        .pipe(first())
        .subscribe(date => expect(date).toEqual(new Date(1901, 0, 1)));

      component.focusDate = new Date(1901, 0, 1);
    });

    it('should call createCalendar() when a new date is passed to it', () => {
      jest.spyOn(component, 'createCalendar');
      component.focusDate = new Date(1901, 0, 1);
      expect(component.createCalendar).toHaveBeenCalled();
    });

    it('should not set the focusDate if its already that day', () => {
      component.focusDate = new Date();
      fixture.detectChanges();

      jest.spyOn(component, 'createCalendar');
      component.focusDateChange
        .pipe(first())
        .subscribe(() => expect(true).toBe(false)); // should never execute

      component.focusDate = new Date();
      expect(component.createCalendar).not.toHaveBeenCalled();
    });

    // FIXME
    it('should return a day button when dayToFocus is accessed', () => {
      expect(component.elementFocus).toBeTruthy();
    });

    it('should return true from "shouldCreate()" only when required dates are present', () => {
      component['_startDate'] = null;
      component['_focusDate'] = null;
      component['_selectedDate'] = new Date();
      expect(component.shouldCreate).toBe(false);

      component['_startDate'] = new Date();
      component['_focusDate'] = null;
      component['_selectedDate'] = null;
      expect(component.shouldCreate).toBe(false);

      component['_startDate'] = null;
      component['_focusDate'] = new Date();
      component['_selectedDate'] = null;
      expect(component.shouldCreate).toBe(false);

      component['_startDate'] = new Date();
      component['_focusDate'] = new Date();
      component['_selectedDate'] = null;
      expect(component.shouldCreate).toBe(false);

      component['_startDate'] = new Date();
      component['_focusDate'] = null;
      component['_selectedDate'] = new Date();
      expect(component.shouldCreate).toBe(true);

      component['_startDate'] = null;
      component['_focusDate'] = new Date();
      component['_selectedDate'] = new Date();
      expect(component.shouldCreate).toBe(true);
    });

    it('should call castFocus() in all cases when createCalendar() is called ', () => {
      jest.spyOn(component, 'castFocus');
      component['_selectedDate'] = null;
      component.createCalendar();
      expect(component.castFocus).toHaveBeenCalled();
    });

    it('should subtract a day from "focusDate" when left is typed', () => {
      const startFocus = (component.focusDate = new Date());

      dispatchKeyEvent(dayButton, 'ArrowLeft');
      expect(component.focusDate).toEqual(startFocus.addDays(-1));
    });

    it('should add a day from "focusDate" when right is typed', () => {
      const startFocus = (component.focusDate = new Date());
      dispatchKeyEvent(dayButton, 'ArrowRight');
      expect(component.focusDate).toEqual(startFocus.addDays(1));
    });

    it('should subtract a day from "focusDate" when up is typed', () => {
      const startFocus = (component.focusDate = new Date());
      dispatchKeyEvent(dayButton, 'ArrowUp');
      expect(component.focusDate).toEqual(startFocus.addDays(-7));
    });

    it('should subtract a day from "focusDate" when down is typed', () => {
      const startFocus = (component.focusDate = new Date());
      dispatchKeyEvent(dayButton, 'ArrowDown');
      expect(component.focusDate).toEqual(startFocus.addDays(7));
    });

    it('should not change "focusDate" when other keys are typed', () => {
      const startFocus = (component.focusDate = new Date());
      dispatchKeyEvent(dayButton, 'Shift');
      expect(component.focusDate).toEqual(startFocus);

      dispatchKeyEvent(dayButton, '/');
      expect(component.focusDate).toEqual(startFocus);

      dispatchKeyEvent(dayButton, '1');
      expect(component.focusDate).toEqual(startFocus);

      dispatchKeyEvent(dayButton, 'a');
      expect(component.focusDate).toEqual(startFocus);
    });

    it('should increment the focusDate by 1 month when changeMonth() is passed the argument 1', () => {
      component['_focusDate'] = new Date(2001, 2, 15);
      component.changeMonth(1);
      expect(component.focusDate).toEqual(new Date(2001, 3, 15));
    });

    it('should deccrement the focusDate by 1 month when changeMonth() is passed the argument -1', () => {
      component['_focusDate'] = new Date(2001, 2, 15);
      component.changeMonth(-1);
      expect(component.focusDate).toEqual(new Date(2001, 1, 15));
    });
  });

  describe('createCalendar()', () => {
    it('should have createCalendar() calculate a new "this.calendar" when shouldCreate returns false', () => {
      const startCal = component.calendar;
      component['_selectedDate'] = null;
      component.createCalendar();
      expect(component.calendar).toEqual(startCal);
    });

    it('should have createCalendar() calculate a new "this.calendar" when shouldCreate returns true', () => {
      const startCal = component.calendar;
      component['_focusDate'] = new Date(2018, 1, 1);
      component['_selectedDate'] = new Date(2018, 1, 1);
      component.createCalendar();
      expect(component.calendar).not.toEqual(startCal);
    });
  });

  it('should the dayClick emitter with the argument date when dayClicked(Date) is called', () => {
    component.dayClicked(new Date(2001, 2, 2));
    component.dayClick
      .pipe(first())
      .subscribe(date => expect(date).toEqual(new Date(2001, 2, 1)));
  });

  it('startManaging() sets value on focusin event', () => {
    component['managingFocus'] = false;
    fixture.detectChanges();
    focusIn();
    expect(component['managingFocus']).toBe(true);
  });

  it('stopManaging() sets value on focus out event', () => {
    component['managingFocus'] = true;
    fixture.detectChanges();
    fixture.debugElement.nativeElement.dispatchEvent(
      new FocusEvent('focusout')
    );
    expect(component['managingFocus']).toBe(false);
  });

  // FIXME
  // _fit('castFocus() focuses the element of the focusDate', () => {
  //   fixture.detectChanges();
  //   focusIn();
  //   component.castFocus();
  //   fixture.detectChanges();
  //   console.log(fixture.debugElement.nativeElement.innerHTML)
  //   expect(getEl(fixture, '.cal-face-day[tabindex="0"]')).toBe(
  //     <HTMLElement>document.activeElement
  //   );

  //   focusOut();
  //   component.castFocus();
  //   fixture.detectChanges();
  //   expect(getEl(fixture, '.cal-face-day[tabindex="0"]')).not.toBe(
  //     <HTMLElement>document.activeElement
  //   );
  // });
});
