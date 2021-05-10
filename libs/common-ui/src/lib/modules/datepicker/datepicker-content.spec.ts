import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DsDatepickerContent } from './datepicker-content';
/**
 * To run this test, remove this directory from "testPathIgnorePatterns"
 * in "libs/common/jest.config.js"
 */

describe('Datepicker Content Component', () => {
  let component: DsDatepickerContent;
  let fixture: ComponentFixture<DsDatepickerContent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DsDatepickerContent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DsDatepickerContent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
