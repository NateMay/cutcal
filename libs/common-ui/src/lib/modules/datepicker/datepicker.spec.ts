import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CcDatepicker } from './datepicker';
/**
 * To run this test, remove this directory from "testPathIgnorePatterns"
 * in "libs/common/jest.config.js"
 */
describe('Datepicker Component', () => {
  let component: CcDatepicker;
  let fixture: ComponentFixture<CcDatepicker>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CcDatepicker]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CcDatepicker);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
