import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CcDatepickerContent } from './datepicker-content';
/**
 * To run this test, remove this directory from "testPathIgnorePatterns"
 * in "libs/common/jest.config.js"
 */

describe('Datepicker Content Component', () => {
  let component: CcDatepickerContent;
  let fixture: ComponentFixture<CcDatepickerContent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CcDatepickerContent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CcDatepickerContent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
