import {
  animate,
  AnimationEvent,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations'
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  NgZone,
  OnInit,
  Output,
} from '@angular/core'
import { Weekday, WEEKDAYS } from '@cutcal/core'
import * as _ from 'lodash'
import { executeOnStable } from '../../../functions/executeOnStable/executeOnStable'
import { getFullCalendar } from '../../../functions/getFullCalendar/getFullCalendar'

// TODO (date-picker) implement with KeyValueDiffers https://netbasal.com/getting-to-know-angular-differs-60cd68f4bd8f

let nextUniqueId: number = 0
export interface CalFaceDay {
  date: Date
  currMonth: boolean
  isToday: boolean
  isSelected: boolean
  tabindex: number
  startDate?: boolean
  endDate?: boolean
  isBetween: boolean
}

const ANIMATION_SPEED = 50

@Component({
  selector: 'cc-calendar-face',
  styleUrls: ['./calendar-face.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'cc-calendar-face',
    role: 'grid',
    'aria-readonly': 'true',
  },
  animations: [
    trigger('slide', [
      state('left', style({ transform: 'translateX(-10%)', opacity: 0 })),
      state('right', style({ transform: 'translateX(10%)', opacity: 0 })),
      state('center', style({ transform: 'translateX(0)', opacity: 1 })),
      transition('left <=> right', animate(0)),
      transition('center <=> left', animate(`${ANIMATION_SPEED}ms ease-out`)),
      transition('center <=> right', animate(`${ANIMATION_SPEED}ms ease-out`)),
    ]),
  ],
  template: `
    <!-- Weekdays -->
    <div role="row" fxLayout="row">
      <span
        *ngFor="let weekday of weekdays"
        role="columnheader"
        aria-readonly="true"
        [attr.aria-label]="weekday.long"
      >
        {{ weekday.short }}
      </span>
    </div>

    <!-- Dates -->
    <div
      role="rowgroup"
      fxLayout="column"
      [@slide]="slideState"
      (@slide.done)="onAnimationEvent($event)"
    >
      <div role="row" *ngFor="let week of calendar" fxLayout="row" #tabArea>
        <span
          *ngFor="let day of week"
          role="gridcell"
          [ngClass]="{
            'startDate-back': range && day.startDate,
            'endDate-back': range && !!day.endDate,
            'betweenDate-back': range && day.isBetween
          }"
        >
          <button
            class="cal-face-day"
            aria-selected="false"
            [attr.id]="day.tabindex === 0 ? focusId : null"
            [attr.aria-label]="day.date | date: 'longDate'"
            [attr.tabindex]="day.tabindex"
            (click)="dayClicked(day.date)"
            (keydown.ArrowRight)="changeFocus($event, 1)"
            (keydown.ArrowLeft)="changeFocus($event, -1)"
            (keydown.ArrowDown)="changeFocus($event, 7)"
            (keydown.ArrowUp)="changeFocus($event, -7)"
            [ngClass]="{
              currMonth: day.currMonth,
              today: !range && day.isToday,
              selected: !range && day.isSelected,
              startDate: range && day.startDate,
              endDate: range && !!day.endDate
            }"
          >
            {{ day.date | date: 'd' }}
          </button>
        </span>
      </div>
    </div>
  `,
})
export class CalendarFaceComponent implements OnInit {
  readonly weekdays: Weekday[] = WEEKDAYS

  // if the calendar should manage focus
  private managingFocus: boolean = false

  private selectingStart: boolean = true

  // view model
  calendar!: CalFaceDay[][]

  // animation state
  slideState: 'center' | 'left' | 'right' = 'center'

  /**
   * @description enables date range selections
   */
  @Input() range: boolean = false

  /**
   * @description id of the active day
   */
  @Input()
  get focusId(): string {
    return this._focusId
  }
  set focusId(value: string) {
    this._focusId = value || this._uid
  }
  private _focusId!: string
  private _uid = `cc-calendar-selected-day-${nextUniqueId++}`

  /**
   * @description when selecting dates ranges, this is the beginning date of the range
   */
  private _startDate: Date = new Date()
  @Input() set startDate(date: Date) {
    if (this.startDate?.isSameDay(date)) return
    this._startDate = date
    this.createCalendar()
  }
  get startDate() {
    return this._startDate
  }
  @Output() startDateChange = new EventEmitter<Date>()

  /**
   * @description when selecting dates ranges, this is the ending date of the range
   */
  private _endDate: Date = new Date()
  @Input() set endDate(date: Date) {
    if (this.endDate?.isSameDay(date)) return
    this._endDate = date
    this.createCalendar()
  }
  get endDate() {
    return this._endDate
  }
  @Output() endDateChange = new EventEmitter<Date>()

  /**
   * @description selected date when not selecting a range
   */
  private _selectedDate: Date = new Date()
  @Input() set selectedDate(date: Date) {
    if (this.selectedDate.isSameDay(date)) return
    this._selectedDate = date
    this.createCalendar()
  }
  get selectedDate() {
    return this._selectedDate
  }
  @Output() selectedDateChange = new EventEmitter<Date>()

  /**
   * @description date to which the calendar should open
   */
  private _focusDate: Date = new Date()
  @Input() set focusDate(date: Date) {
    if (this.focusDate.isSameDay(date)) return
    if (!this.focusDate.isSameMonth(date))
      this.slideState = this.focusDate.isBefore(date) ? 'left' : 'right'
    this._focusDate = date
    this.calLabel = date.toLocaleDateString()
    this.createCalendar()
  }
  get focusDate() {
    return this._focusDate
  }
  @Output() focusDateChange = new EventEmitter<Date>()

  get elementFocus(): HTMLElement | null {
    return document.querySelector<HTMLElement>(`#${this.focusId}[tabindex="0"]`)
  }

  get shouldCreate() {
    return !!this.selectedDate && (!!this.focusDate || !!this.startDate)
  }

  @Output() monthClick = new EventEmitter<Date>()
  @Output() dayClick = new EventEmitter<Date>()

  @HostBinding('attr.aria-label') calLabel = 'caledar'

  @HostListener('focusin') startManaging() {
    this.managingFocus = true
  }
  @HostListener('focusout') stopManaging() {
    this.managingFocus = false
  }

  constructor(private ngZone: NgZone) {
    this.focusId = this.focusId
  }

  ngOnInit() {
    if (!this.calendar) this.createCalendar()
  }

  // gets the calndar array, maps the days to the vire model, and chucks it by 7-day weeks
  createCalendar(): void {
    if (this.shouldCreate)
      this.calendar = _.chunk(
        getFullCalendar(this.focusDate).map(date => ({
          date,
          startDate: date.isSameDay(this.startDate),
          endDate: date.isSameDay(this.endDate),
          isBetween: this.isBetween(date),
          currMonth: date.isSameMonth(this.focusDate),
          isToday: date.isToday(),
          isSelected: date.isSameDay(this.selectedDate),
          tabindex: date.isSameDay(this.focusDate) ? 0 : -1,
        })),
        7
      )
    this.castFocus()
  }

  isBetween(date: Date): boolean {
    return this.startDate && this.endDate
      ? date.isBetween(this.startDate.addDay(), this.endDate.addDays(-1))
      : false
  }

  castFocus(): void {
    if (this.managingFocus)
      executeOnStable(this.ngZone, () => {
        if (this.elementFocus) this.elementFocus.focus()
      })
  }

  changeFocus(event: KeyboardEvent, days: number) {
    event.preventDefault()
    this.setAndEmit('focus', this.focusDate.addDays(days))
  }

  public dayClicked(date: Date) {
    if (this.range) this.rangeClick(date)
    else {
      this.setAndEmit('focus', date)
      this.setAndEmit('selected', date)
    }
    this.dayClick.emit(date)
  }

  // TEST (date-picker)
  rangeClick(date: Date) {
    if (this.startAndEndEqual) this.adjustUnknown(date)
    else if (this.invalidRange(date)) this.setRangeEqual(date)
    else if (this.selectingStart) this.setAndEmit('start', date)
    else this.setAndEmit('end', date)
    this.setAndEmit('focus', date)
    this.selectingStart = !this.selectingStart
  }

  get startAndEndEqual(): boolean {
    return this.startDate?.isSameDay(this.endDate)
  }

  adjustUnknown(date: Date) {
    if (date > this.startDate) {
      this.setAndEmit('end', date)
      this.selectingStart = false
    } else {
      this.setAndEmit('start', date)
      this.selectingStart = true
    }
  }

  invalidRange(date: Date): boolean {
    return this.selectingStart ? date > this.endDate : date < this.startDate
  }

  setAndEmit(
    property: 'start' | 'end' | 'focus' | 'selected',
    date: Date
  ): void {
    if (property === 'start') {
      this.startDate = date
      this.startDateChange.emit(date)
    } else if (property === 'end') {
      this.endDate = date
      this.endDateChange.emit(date)
    } else if (property === 'focus') {
      this.focusDate = date
      this.focusDateChange.emit(date)
    } else if (property === 'selected') {
      this.selectedDate = date
      this.selectedDateChange.emit(date)
    } else
      throw new Error(
        `[CutCal] Calendar Face setAndEmit() called with invalid param`
      )
  }

  setRangeEqual(date: Date): void {
    this.setAndEmit('start', date)
    this.setAndEmit('end', date)
  }

  public changeMonth(dir: number) {
    this.setAndEmit('focus', this.focusDate.addMonths(dir))
  }

  onAnimationEvent(event: AnimationEvent) {
    this.slideState =
      event.fromState == 'center'
        ? event.toState == 'right'
          ? 'left'
          : 'right'
        : 'center'
  }
}
