import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CcTimepickerToggle } from './timepicker-toggle';

describe('CcTimepickerToggleComponent', () => {
  let component: CcTimepickerToggle;
  let fixture: ComponentFixture<CcTimepickerToggle>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CcTimepickerToggle],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CcTimepickerToggle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
