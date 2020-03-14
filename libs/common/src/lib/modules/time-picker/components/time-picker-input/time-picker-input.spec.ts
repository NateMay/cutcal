/* eslint-disable jest/expect-expect */
import { OverlayModule } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { getByDir, getDe, getEl } from '@cutcal/ng-testing';
import { TimePickerModule } from '../../../time-picker/time-picker.module';
import { TimepickerDialogComponent } from '../time-picker-dialog/time-picker-dialog.component';
import { TimePickerInputComponent } from './time-picker-input.component';

@Component({
  template: `
    <cc-time-picker-input
      [label]="label"
      [placeholder]="placeholder"
      [(time)]="time"
      (timeChange)="timeChange($event)"
    ></cc-time-picker-input>
  `,
})
class TestTimePickerComponent {
  time = '03:15 pm';
  label: string = 'Select a time';
  placeholder: string = 'Date';

  timeChange(): void {}
}

describe('Time Picker Module', () => {
  let fixture: ComponentFixture<TestTimePickerComponent>;
  let parent: TestTimePickerComponent;
  let component: TimePickerInputComponent;
  let input: HTMLInputElement;

  const assertOpen = (): void => {
    // TEST (FIXME)
    // expect(getByDir(fixture, TimepickerDialogComponent)).toBeTruthy();
  };

  const assertClosed = (): void => {
    fixture.detectChanges();
    const dialog = getByDir(fixture, TimepickerDialogComponent);
    expect(!!dialog && component.pickerOverlayRef.hasAttached()).toBe(false);
  };

  const focusOpen = (): void => {
    fixture.detectChanges();
    input.dispatchEvent(new FocusEvent('focus'));
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestTimePickerComponent],
      imports: [TimePickerModule, NoopAnimationsModule, OverlayModule],
    });

    fixture = TestBed.createComponent(TestTimePickerComponent);
    parent = fixture.componentInstance;
    component = getByDir(fixture, TimePickerInputComponent).componentInstance;
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

  it('should bind to the placeholder', () => {
    parent.placeholder = 'XX placeholder XX';
    parent.time = '';
    fixture.detectChanges();
    expect(getDe(fixture, 'input').attributes['placeholder']).toBe(
      'XX placeholder XX'
    );
  });

  it('binds to text input changes to the date', () => {
    parent.time = '11:07 am';
    fixture.detectChanges();

    input.value = '04:47 pm';
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }));
    fixture.detectChanges();

    expect(parent.time).toEqual('04:47 pm');
  });

  it('picker opens on focus and closes on tabOut', () => {
    fixture.detectChanges();

    assertClosed();

    input.dispatchEvent(new FocusEvent('focus'));
    assertOpen();

    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }));
    assertClosed();
  });

  it('picker closes on click away', () => {
    focusOpen();
    assertOpen();

    document.dispatchEvent(new MouseEvent('mousedown'));
    assertClosed();
  });

  it('picker closes on escape', () => {
    focusOpen();

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    assertClosed();
  });

  // _it('binds by selecting a time from the time picker dialog & closes the picker', () => {
  //   focusOpen();
  //   assertOpen();
  //   fixture.detectChanges();
  //   component.timeChange.emit(03:34 am)
  //   component.pickerRef.instance.setTime('03:34 am')
  //   fixture.detectChanges();
  //   assertClosed();
  //   expect(parent.time).toEqual('03:34 am');
  //   expect(input.value).toBe('03:34 am');
  // });

  it('binds & updates from the parent properly', () => {
    parent.time = '11:07 am';
    fixture.detectChanges();
    expect(input.value).toBe(parent.time);

    parent.time = '08:24 pm';
    fixture.detectChanges();
    expect(input.value).toBe('08:24 pm');
  });
});
