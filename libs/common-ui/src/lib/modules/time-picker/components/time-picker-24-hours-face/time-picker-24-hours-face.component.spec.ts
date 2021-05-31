import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Timepicker24HoursFaceComponent } from './time-picker-24-hours-face.component';

describe('Timepicker24HoursFaceComponent', () => {
  let fixture: ComponentFixture<Timepicker24HoursFaceComponent>;
  let component: Timepicker24HoursFaceComponent;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [Timepicker24HoursFaceComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).createComponent(Timepicker24HoursFaceComponent);

    component = fixture.componentInstance;
  });

  it('should generate array with 24 items', () => {
    expect(component.hoursList).toHaveLength(24);
  });

  it('should emit selected hour (24hr format)', async(() => {
    const time = 15;

    component.hourSelected.subscribe((hour: number) => expect(hour).toBe(time));
    component.onTimeSelected(time);
  }));
});
