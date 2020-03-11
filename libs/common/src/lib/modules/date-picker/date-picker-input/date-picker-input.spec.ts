/* eslint-disable jest/expect-expect */
import { OverlayModule } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { getByDir, getDe, getEl } from '@cutcal/ng-testing';
import { RefocusService } from '../../../services/refocus/refocus.service';
import { DatePickerDialogComponent } from '../date-picker-dialog/date-picker-dialog.component';
import { DatePickerModule } from '../date-picker.module';
import { DatePickerInputComponent } from './date-picker-input.component';

@Component({
  template: `
    <cc-date-picker
      [label]="label"
      [(date)]="date"
      [dateFormat]="dateFormat"
      [placeholder]="placeholder"
    ></cc-date-picker>
  `,
})
class TestDatePickerComponent {
  date: Date | null = new Date(2019, 3, 20);
  label: string = 'My Label';
  dateFormat: string = 'longDate';
  placeholder: string = 'Date';
}

/**
 * Note: because of the NoopAnimationsModule, the days are shifted off the calendar face in karma
 */

describe('Date Picker & Dialog', () => {
  let fixture: ComponentFixture<TestDatePickerComponent>;
  let parent: TestDatePickerComponent;
  let component: DatePickerInputComponent;
  let input: HTMLInputElement;

  // FIXME (datepicker) cannot currectly access the overlay
  const assertOpen = (): void => {
    expect(component.pickerOverlayRef.hasAttached()).toBeTruthy();
  };

  const assertClosed = (): void => {
    fixture.detectChanges();
    const dialog = getByDir(fixture, DatePickerDialogComponent);
    expect(!!dialog && component.pickerOverlayRef.hasAttached()).toBe(false);
  };

  const focusInput = (): void => {
    fixture.detectChanges();
    input.dispatchEvent(new FocusEvent('focus'));
  };

  const tabOut = (): boolean =>
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }));

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestDatePickerComponent],
      imports: [DatePickerModule, NoopAnimationsModule, OverlayModule],
      providers: [
        {
          provide: RefocusService,
          useValue: { reCastFocusId: (): void => {} },
        },
      ],
    });
    fixture = TestBed.createComponent(TestDatePickerComponent);
    parent = fixture.componentInstance;
    component = getByDir(fixture, DatePickerInputComponent).componentInstance;
    input = getEl<HTMLInputElement>(fixture, 'input');
  });

  it('can load instance', () => {
    expect(parent).toBeTruthy();
  });

  it('binds to the label', () => {
    parent.label = 'Another Label';
    fixture.detectChanges();
    expect(getEl<HTMLElement>(fixture, 'mat-label').textContent).toBe(
      'Another Label'
    );
  });

  it('should leverage the angular date pipe', () => {
    parent.date = new Date(2017, 3, 19);
    parent.dateFormat = 'MMMM d, y';
    fixture.detectChanges();
    expect(input.value).toBe('April 19, 2017');
  });

  it('should bind to the placeholder', () => {
    parent.placeholder = 'XX placeholder XX';
    parent.date = null;
    fixture.detectChanges();
    expect(getDe(fixture, 'input').attributes['placeholder']).toBe(
      'XX placeholder XX'
    );
  });

  it('binds to text input changes to the date', () => {
    parent.date = new Date(2017, 3, 19);
    fixture.detectChanges();

    input.value = 'May 31, 2012';
    tabOut();
    fixture.detectChanges();

    expect(parent.date).toEqual(new Date(2012, 4, 31));
  });

  it('picker opens on focus and closes on tabOut', () => {
    fixture.detectChanges();

    assertClosed();

    input.dispatchEvent(new FocusEvent('focus'));
    assertOpen();

    tabOut();
    assertClosed();
  });

  it('picker closes on click away', () => {
    focusInput();
    assertOpen();

    document.dispatchEvent(new MouseEvent('mousedown'));
    assertClosed();
  });

  it('picker closes on escape', () => {
    focusInput();

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    assertClosed();
  });

  // FIXME (datepicker) cannot currectly access the overlay
  it('bind by selecting a day from the date picker dialog & closes the picker', () => {
    // arrange
    parent.dateFormat = 'longDate';
    focusInput();
    assertOpen();
    fixture.detectChanges();
    // act
    getEl(fixture, '[aria-label="April 17, 2019"]').click();
    fixture.detectChanges();
    // assert
    assertClosed();
    expect(parent.date).toEqual(new Date(2019, 3, 17));
    expect(input.value).toBe('April 17, 2019');
  });

  it('updates from the parent properly', () => {
    parent.date = new Date(2017, 3, 19);
    fixture.detectChanges();
    expect(input.value).toBe('April 19, 2017');

    parent.date = new Date(2018, 7, 3);
    fixture.detectChanges();
    expect(input.value).toBe('August 3, 2018');
  });

  it('When the input is clear, the value is set to null', () => {
    parent.date = new Date(2017, 3, 19);
    fixture.detectChanges();
    focusInput();
    input.value = '';
    tabOut();
    expect(parent.date).toBe(null);
    fixture.detectChanges();
  });
});
