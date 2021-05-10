import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DsDatepickerInput } from './datepicker-input';
/**
 * To run this test, remove this directory from "testPathIgnorePatterns"
 * in "libs/common/jest.config.js"
 */
describe('Datepicker Input Component', () => {
  let component: DsDatepickerInput;
  let fixture: ComponentFixture<DsDatepickerInput>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DsDatepickerInput]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DsDatepickerInput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
