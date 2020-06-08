import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { tap } from 'rxjs/operators';
import { CcTimepicker12HoursFaceComponent } from './12-hours-face';

describe('Timepicker12HoursFaceComponent', () => {
  let fixture: ComponentFixture<CcTimepicker12HoursFaceComponent>;
  let component: CcTimepicker12HoursFaceComponent;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [CcTimepicker12HoursFaceComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).createComponent(CcTimepicker12HoursFaceComponent);

    component = fixture.componentInstance;
  });

  it('should generate array with 12 items', () => {
    expect(component.hoursList).toHaveLength(12);
  });

  it('should emit selected hour (12hr format)', async(() => {
    const time = 10;

    component.hourSelected
      .pipe(tap((hour: number) => expect(hour).toBe(time)))
      .subscribe();

    component.onTimeSelected(time);
  }));
});
