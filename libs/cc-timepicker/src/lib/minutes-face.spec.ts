import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CcTimepickerMinutesFace } from './minutes-face';

describe('TimepickerMinutesFaceComponent', () => {
  let fixture: ComponentFixture<CcTimepickerMinutesFace>;
  let component: CcTimepickerMinutesFace;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [CcTimepickerMinutesFace],
      schemas: [NO_ERRORS_SCHEMA],
    }).createComponent(CcTimepickerMinutesFace);

    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
