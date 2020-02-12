import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { DatePickerYearsComponent } from './date-picker-years.component';

// TEST (date-picker)

describe('DatePickerYearsComponent', () => {
  let component: DatePickerYearsComponent;
  let fixture: ComponentFixture<DatePickerYearsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatButtonModule],
      declarations: [DatePickerYearsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatePickerYearsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
