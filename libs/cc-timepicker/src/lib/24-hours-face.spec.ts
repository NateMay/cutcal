import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { tap } from 'rxjs/operators';
import { CcTimepicker24HoursFaceComponent } from './24-hours-face';

describe('Timepicker24HoursFaceComponent', () => {
  let fixture: ComponentFixture<CcTimepicker24HoursFaceComponent>;
  let component: CcTimepicker24HoursFaceComponent;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [CcTimepicker24HoursFaceComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).createComponent(CcTimepicker24HoursFaceComponent);

    component = fixture.componentInstance;
  });

  it('should generate array with 24 items', () => {
    expect(component.hoursList).toHaveLength(24);
  });

  it('should emit selected hour (24hr format)', async(() => {
    const time = 15;

    component.hourSelected
      .pipe(tap((hour: number) => expect(hour).toBe(time)))
      .subscribe();
    component.onTimeSelected(time);
  }));
});
