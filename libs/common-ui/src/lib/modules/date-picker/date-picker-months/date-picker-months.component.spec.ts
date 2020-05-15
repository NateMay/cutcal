import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { By } from '@angular/platform-browser';
import { getAllDe } from '../../../../../../ng-testing/src/lib/getAllDe';
import { DatePickerMonthsComponent } from './date-picker-months.component';

@Component({
  template: `
    <cc-date-picker-months
      [selectedDate]="selectedDate"
      [focusDate]="focusDate"
      (monthSelect)="monthSelect($event)"
    ></cc-date-picker-months>
  `
})
class TestDatePickerMonthsComponent {
  selectedDate: Date = new Date(2019, 3, 5);
  focusDate: Date = new Date(2019, 3, 6);

  monthSelect(index: number): void {}
}

describe('DatePickerMonthsComponent', () => {
  let fixture: ComponentFixture<TestDatePickerMonthsComponent>;
  let parent: TestDatePickerMonthsComponent;
  let component: DatePickerMonthsComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatButtonModule],
      declarations: [DatePickerMonthsComponent, TestDatePickerMonthsComponent]
    });

    fixture = TestBed.createComponent(TestDatePickerMonthsComponent);
    parent = fixture.componentInstance;
    component = fixture.debugElement.query(
      By.directive(DatePickerMonthsComponent)
    ).componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 12 months', () => {
    const buttons = getAllDe(fixture, 'button');
    expect(buttons).toHaveLength(12);
  });

  // FIXME
  it('should emit the index of the month clicked', () => {
    const spy = jest.spyOn(component.monthSelect, 'emit');
    const buttons = getAllDe(fixture, 'button');
    fixture.detectChanges();
    buttons[4].nativeElement.click();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith(4);
  });

  it('color() should return primary only if the month is "selected"', () => {
    parent.selectedDate = new Date(2019, 3, 5);
    parent.focusDate = new Date(2019, 3, 6);
    fixture.detectChanges();
    expect(component.color(3)).toBe('primary');
    expect(component.color(4)).toBe('');

    parent.selectedDate = new Date(2018, 3, 5);
    parent.focusDate = new Date(2019, 3, 6);
    fixture.detectChanges();
    expect(component.color(3)).toBe('');
    expect(component.color(4)).toBe('');
  });
});
