import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion'
import {
  Attribute,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Directive,
  Input,
  OnDestroy,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core'
import { MatButton } from '@angular/material/button'
import { Subscription } from 'rxjs'
import { CcTimepicker } from './timepicker'

/** Can be used to override the icon of a `ccTimepickerToggle`. */
@Directive({
  selector: '[ccTimepickerToggleIcon]',
})
export class CcTimepickerToggleIcon {}

@Component({
  selector: 'cc-timepicker-toggle',
  template: `
    <button
      #button
      mat-icon-button
      type="button"
      [attr.aria-haspopup]="timepicker ? 'dialog' : null"
      aria-label="open time picker"
      [attr.tabindex]="disabled ? -1 : tabIndex"
      [disabled]="disabled"
      [disableRipple]="disableRipple"
      (click)="_open($event)"
    >
      <svg
        *ngIf="!_customIcon"
        class="cc-timepicker-toggle-default-icon"
        viewBox="0 0 24 24"
        width="24px"
        height="24px"
        fill="currentColor"
        focusable="false"
      >
        <path
          d="M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003 6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.430123 16.430123 20 12 20 C 7.5698774 20 4 16.430123 4 12 C 4 7.5698774 7.5698774 4 12 4 z M 11 6 L 11 12.414062 L 15.292969 16.707031 L 16.707031 15.292969 L 13 11.585938 L 13 6 L 11 6 z"
        />
      </svg>

      <ng-content select="[ccTimepickerToggleIcon]"></ng-content>
    </button>
  `,
  styleUrls: ['./timepicker-toggle.scss'],
  host: {
    class: 'cc-timepicker-toggle',
    // Always set the tabindex to -1 so that it doesn't overlap with any custom tabindex the
    // consumer may have provided, while still being able to receive focus.
    '[attr.tabindex]': 'disabled ? null : -1',
    '(focus)': '_button.focus()',
  },
  exportAs: 'ccTimepickerToggle',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CcTimepickerToggle implements OnDestroy {
  static ngAcceptInputType_disabled: BooleanInput

  private _stateChanges = Subscription.EMPTY

  /** Timepicker instance that the button will toggle. */
  @Input('for') timepicker: CcTimepicker

  /** Tabindex for the toggle. */
  @Input() tabIndex: number | null

  /** Whether the toggle button is disabled. */
  @Input()
  get disabled(): boolean {
    if (this._disabled === undefined && this.timepicker) {
      return this.timepicker.disabled
    }

    return !!this._disabled
  }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value)
  }
  private _disabled: boolean

  /** Whether ripples on the toggle should be disabled. */
  @Input() disableRipple: boolean

  /** Custom icon set by the consumer. */
  @ContentChild(CcTimepickerToggleIcon) _customIcon: CcTimepickerToggleIcon

  /** Underlying button element. */
  @ViewChild('button') _button: MatButton

  constructor(
    // private _changeDetectorRef: ChangeDetectorRef,
    @Attribute('tabindex') defaultTabIndex: string
  ) {
    const parsedTabIndex = Number(defaultTabIndex)
    this.tabIndex =
      parsedTabIndex || parsedTabIndex === 0 ? parsedTabIndex : null
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   if (changes['timepicker']) {
  //     this._watchStateChanges();
  //   }
  // }

  ngOnDestroy() {
    this._stateChanges.unsubscribe()
  }

  // ngAfterContentInit() {
  //   this._watchStateChanges();
  // }

  _open(event: Event): void {
    if (this.timepicker && !this.disabled) {
      this.timepicker.open()
      event.stopPropagation()
    }
  }
}
