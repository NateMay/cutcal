import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DsDatepicker } from './datepicker';
/**
 * To run this test, remove this directory from "testPathIgnorePatterns"
 * in "libs/common/jest.config.js"
 */
describe('Datepicker Component', () => {
  let component: DsDatepicker;
  let fixture: ComponentFixture<DsDatepicker>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DsDatepicker]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DsDatepicker);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
