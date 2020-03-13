import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TimepickerMinutesFaceComponent } from './time-picker-minutes-face.component';

describe('TimepickerMinutesFaceComponent', () => {
  let fixture: ComponentFixture<TimepickerMinutesFaceComponent>;
  let component: TimepickerMinutesFaceComponent;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [TimepickerMinutesFaceComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).createComponent(TimepickerMinutesFaceComponent);

    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy()
  })


});
