import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DsDatepickerToggle } from './datepicker-toggle';
/**
 * To run this test, remove this directory from "testPathIgnorePatterns"
 * in "libs/common/jest.config.js"
 */
describe('Datepicker Toggle Component', () => {
  let component: DsDatepickerToggle;
  let fixture: ComponentFixture<DsDatepickerToggle>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DsDatepickerToggle]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DsDatepickerToggle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
