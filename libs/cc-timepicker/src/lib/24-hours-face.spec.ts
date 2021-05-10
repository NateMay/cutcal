import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DsTimepicker24HoursFaceComponent } from './24-hours-face';

describe('Timepicker24HoursFaceComponent', () => {
  let fixture: ComponentFixture<DsTimepicker24HoursFaceComponent>;
  let component: DsTimepicker24HoursFaceComponent;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [DsTimepicker24HoursFaceComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).createComponent(DsTimepicker24HoursFaceComponent);

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
