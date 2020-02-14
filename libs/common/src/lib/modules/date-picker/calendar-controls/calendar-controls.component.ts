import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core'
import { RefocusService } from '../../../services/refocus/refocus.service'

let nextUniqueId: number = 0

@Component({
  selector: 'cc-calendar-controls',
  styleUrls: ['./calendar-controls.component.scss'],
  host: { class: 'cc-calendar-controls' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      mat-button
      [attr.id]="monthBtnID"
      *ngIf="!monthBtnDisabled"
      (click)="monthClick()"
    >
      {{ monthBtnDate | date: format }}
    </button>

    <div class="non-btn-month-label" *ngIf="monthBtnDisabled">
      {{ monthBtnDate | date: format }}
    </div>

    <span class="spacer"></span>

    <button
      class="chevron"
      [attr.aria-label]="prevBtnLabel"
      [attr.id]="prevBtnID"
      (click)="prevClick()"
    >
      <mat-icon>chevron_left</mat-icon>
    </button>

    <button
      class="chevron"
      [attr.aria-label]="nextBtnLabel"
      [attr.id]="nextBtnID"
      (click)="nextClick()"
    >
      <mat-icon>chevron_right</mat-icon>
    </button>
  `,
})
export class CalendarControlsComponent {
  @Input() monthBtnID: string | null
  @Input() prevBtnID: string | null
  @Input() nextBtnID: string | null

  @Input() monthBtnDisabled: boolean = false

  @Input() monthBtnDate: Date = new Date()
  @Input() format: string = 'MMMM yyyy'

  set view(view: 'days' | 'months' | 'years') {
    switch (view) {
      case 'days':
        this.format = 'MMMM yyyy'
        break
      case 'months':
        this.format = 'MMMM'
        break
      case 'years':
        this.format = 'yyyy'
        break
    }
  }

  @Input() prevBtnLabel: string = 'Previous Month'
  @Input() nextBtnLabel: string = 'Next Month'

  @Output() prevBtn = new EventEmitter<void>()
  @Output() nextBtn = new EventEmitter<void>()
  @Output() monthBtn = new EventEmitter<void>()

  constructor(private focuser: RefocusService) {
    const _uuid = nextUniqueId++
    this.prevBtnID = `prev-month-${_uuid}`
    this.nextBtnID = `next-month-${_uuid}`
    this.monthBtnID = `controls-month-btn-${_uuid}`
  }

  prevClick(): void {
    this.prevBtn.emit()
    this.focuser.reCastFocusId(this.prevBtnID)
  }

  nextClick(): void {
    this.nextBtn.emit()
    this.focuser.reCastFocusId(this.nextBtnID)
  }

  monthClick(): void {
    this.monthBtn.emit()
    this.focuser.reCastFocusId(this.monthBtnID)
  }
}
