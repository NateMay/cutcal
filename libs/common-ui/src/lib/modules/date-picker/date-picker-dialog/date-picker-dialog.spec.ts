import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DATE_PICKER_DATA } from '../date-picker-data';
import { DatePickerDialogComponent } from './date-picker-dialog.component';

describe('Date Picker Dialog', () => {
  let fixture: ComponentFixture<DatePickerDialogComponent>;
  let component: DatePickerDialogComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatePickerDialogComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {
          provide: DATE_PICKER_DATA,
          useValue: { selectedDate: new Date(2019, 3, 13) }
        }
      ]
    });
    fixture = TestBed.createComponent(DatePickerDialogComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(parent).toBeTruthy();
  });

  it('sets a default id', () => {
    expect(component.focusId).toContain('date-picker-');
  });

  it('set the focusDate from the data injected', () => {
    expect(component.focusDate).toEqual(new Date(2019, 3, 13));
  });
});
