import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CcTimepickerContent } from './timepicker-content';


describe('TimepickerContentComponent', () => {
  let component: CcTimepickerContent;
  let fixture: ComponentFixture<CcTimepickerContent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CcTimepickerContent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CcTimepickerContent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
