import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DsTimepicker12HoursFaceComponent } from './12-hours-face';

describe('Timepicker12HoursFaceComponent', () => {
  let fixture: ComponentFixture<DsTimepicker12HoursFaceComponent>;
  let component: DsTimepicker12HoursFaceComponent;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [DsTimepicker12HoursFaceComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).createComponent(DsTimepicker12HoursFaceComponent);

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
