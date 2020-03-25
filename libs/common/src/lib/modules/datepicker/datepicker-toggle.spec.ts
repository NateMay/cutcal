import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CcDatepickerToggle } from './datepicker-toggle';
/**
 * To run this test, remove this directory from "testPathIgnorePatterns"
 * in "libs/common/jest.config.js"
 */
describe('Datepicker Toggle Component', () => {
  let component: CcDatepickerToggle;
  let fixture: ComponentFixture<CcDatepickerToggle>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CcDatepickerToggle],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CcDatepickerToggle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
