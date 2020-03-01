import {
  AfterViewInit,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnDestroy,
  Output,
} from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'
import { Boolish } from '@cutcal/core'
import { Subject } from 'rxjs'
import { delay, map, takeUntil, tap } from 'rxjs/operators'
import { dateFromTime } from '../../functions/dateFromTime/dateFromTime'
import { DatePickerInputComponent } from '../date-picker/date-picker-input/date-picker-input.component'
import { TimePickerInputComponent } from '../time-picker/components/time-picker-input/time-picker-input.component'

// TEST (binder)

// TODO (binder) change the API
/**
 *  <cc-datetime-binder
 *    (datetime)="outgoingDatetime($event)"
 *    [date]="incomingDate"
 *    [time]="incomingDate"
 *  ></cc-datetime-binder>
 */

export const DATETIME_BINDER_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  multi: true,
  useExisting: forwardRef(() => DatetimeBinderComponent),
}
@Component({
  selector: 'cc-datetime-binder',
  host: { class: 'cc-datetime-binder' },
  styleUrls: ['./datetime-binder.component.scss'],
  providers: [DATETIME_BINDER_CONTROL_VALUE_ACCESSOR],
  template: ``,
})
export class DatetimeBinderComponent
  implements AfterViewInit, OnDestroy, ControlValueAccessor {
  private unsub$: Subject<void> = new Subject()

  _disabled: boolean = false

  @Boolish
  @Input()
  set disabled(disabled: boolean) {
    this._disabled = disabled
    if (this._datePicker) {
      this._datePicker.disabled = disabled
      this._datePicker.markForCheck()
    }
    if (this._timePicker) {
      this._timePicker.disabled = disabled
      this._timePicker.markForCheck()
    }
  }
  get disabled() {
    return this._disabled
  }

  /**
   *   ↓  Date Picker  ↓
   */

  _datetime: Date = new Date()

  @Input()
  get datetime() {
    return this._datetime
  }
  set datetime(datetime: Date) {
    this._datetime = datetime
  }
  @Output() datetimeChange = new EventEmitter<Date>()

  _datePicker!: DatePickerInputComponent
  @Input()
  get datePicker() {
    return this._datePicker
  }
  set datePicker(datePicker: DatePickerInputComponent) {
    this._datePicker = datePicker

    this._datePicker.dateChange
      .pipe(
        delay(0),
        tap(date => this.updateDate(date)),
        takeUntil(this.unsub$)
      )
      .subscribe()
  }

  /**
   *   ↑  Date Picker  ↑
   *
   *
   *
   *
   *   ↓  Time Picker  ↓
   */

  _timePicker!: TimePickerInputComponent
  @Input()
  get timePicker() {
    return this._timePicker
  }
  set timePicker(timePicker: TimePickerInputComponent) {
    this._timePicker = timePicker

    this._timePicker.timeChange
      .pipe(
        map(dateFromTime),
        delay(0),
        tap(date => this.updateTime(date)),
        takeUntil(this.unsub$)
      )
      .subscribe()
  }

  /**
   *   ↑  Time Picker  ↑
   */

  updateDate(date: Date | null) {
    if (!date) return
    this.datetime = date.assignTime(this.datetime)
    this.datetimeChange.emit(this.datetime)
    this.writeValue(this.datetime)
  }

  updateTime(time: Date | null) {
    if (!time) return
    this.datetime = this.datetime.assignTime(time)
    this.datetimeChange.emit(this.datetime)
    this.writeValue(this.datetime)
  }

  constructor() {}

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.datePicker.date)
        this.datetime = this.datePicker.date.assignTime(this.datetime)

      if (this.timePicker.time)
        this.datetime = this.datetime.assignTime(
          dateFromTime(this.timePicker.time)
        )

      this.datetimeChange.emit(this.datetime)
      this.writeValue(this.datetime)
    })
  }

  ngOnDestroy(): void {
    this.unsub$.next()
    this.unsub$.complete()
  }

  writeValue(date: Date): void {
    this.onChange(date)
  }

  registerOnChange(fn: (date: Date) => void): void {
    this.onChange = fn
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled
  }

  onChange = (date: Date) => {}
  onTouched = () => {}
}
