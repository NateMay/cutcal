import { TestBed } from '@angular/core/testing';
import { DsDatepickerModule } from './datepicker.module';
/**
 * To run this test, remove this directory from "testPathIgnorePatterns"
 * in "libs/common/jest.config.js"
 */
describe('DsDatepickerModule', () => {
  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [DsDatepickerModule]
    }).compileComponents();
  });

  it('should create', () => {
    expect(DsDatepickerModule).toBeDefined();
  });
});
