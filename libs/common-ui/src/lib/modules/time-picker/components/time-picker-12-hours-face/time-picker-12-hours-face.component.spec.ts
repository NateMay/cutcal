import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Timepicker12HoursFaceComponent } from './time-picker-12-hours-face.component';

describe('Timepicker12HoursFaceComponent', () => {
  let fixture: ComponentFixture<Timepicker12HoursFaceComponent>;
  let component: Timepicker12HoursFaceComponent;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [Timepicker12HoursFaceComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).createComponent(Timepicker12HoursFaceComponent);

    component = fixture.componentInstance;
  });

  it('should generate array with 12 items', () => {
    expect(component.hoursList).toHaveLength(12);
  });

  it('should emit selected hour (12hr format)', async(() => {
    const time = 10;

    component.hourSelected.subscribe((hour: number) => expect(hour).toBe(time));
    component.onTimeSelected(time);
  }));
});
