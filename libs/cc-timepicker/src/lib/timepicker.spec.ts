import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CcTimepicker } from './timepicker';

describe('TimepickerComponent', () => {
  let component: CcTimepicker;
  let fixture: ComponentFixture<CcTimepicker>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CcTimepicker],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CcTimepicker);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
