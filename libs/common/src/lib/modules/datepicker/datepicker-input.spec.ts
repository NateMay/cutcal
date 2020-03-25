import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CcDatepickerInput } from './datepicker-input';
/**
 * To run this test, remove this directory from "testPathIgnorePatterns"
 * in "libs/common/jest.config.js"
 */
describe('Datepicker Input Component', () => {
  let component: CcDatepickerInput;
  let fixture: ComponentFixture<CcDatepickerInput>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CcDatepickerInput],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CcDatepickerInput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
