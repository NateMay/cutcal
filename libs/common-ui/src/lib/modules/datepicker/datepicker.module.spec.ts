import { async, TestBed } from '@angular/core/testing';
import { CcDatepickerModule } from './datepicker.module';
/**
 * To run this test, remove this directory from "testPathIgnorePatterns"
 * in "libs/common/jest.config.js"
 */
describe('CcDatepickerModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CcDatepickerModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(CcDatepickerModule).toBeDefined();
  });
});
