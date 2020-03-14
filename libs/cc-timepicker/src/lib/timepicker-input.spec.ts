import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CcTimepickerInput } from './timepicker-input';

describe('TimepickerInputComponent', () => {
  let component: CcTimepickerInput;
  let fixture: ComponentFixture<CcTimepickerInput>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CcTimepickerInput],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CcTimepickerInput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
