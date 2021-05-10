import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DsTimepickerMinutesFace } from './minutes-face';

describe('TimepickerMinutesFaceComponent', () => {
  let fixture: ComponentFixture<DsTimepickerMinutesFace>;
  let component: DsTimepickerMinutesFace;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [DsTimepickerMinutesFace],
      schemas: [NO_ERRORS_SCHEMA]
    }).createComponent(DsTimepickerMinutesFace);

    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
