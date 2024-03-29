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
  ViewEncapsulation
} from '@angular/core'
import { MatButton } from '@angular/material/button'
import { Subscription } from 'rxjs'
import { DsDatepicker } from './datepicker'

/** Can be used to override the icon of a `ccDatepickerToggle`. */
@Directive({
  selector: '[dsDatepickerToggleIcon]'
})
export class DsDatepickerToggleIcon {}

@Component({
  selector: 'ds-datepicker-toggle',
  template: `
    <button
      #button
      mat-icon-button
      type="button"
      [attr.aria-haspopup]="forDatepicker ? 'dialog' : null"
      aria-label="open date picker"
      [attr.tabindex]="disabled ? -1 : tabIndex"
      [disabled]="disabled"
      [disableRipple]="disableRipple"
      (click)="_open($event)"
    >
      <svg
        *ngIf="!_customIcon"
        class="cc-datepicker-toggle-default-icon"
        viewBox="0 0 24 24"
        width="24px"
        height="24px"
        fill="currentColor"
        focusable="false"
      >
        <path
          d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"
        />
      </svg>

      <ng-content select="[ccDatepickerToggleIcon]"></ng-content>
    </button>
  `,
  host: {
    class: 'cc-datepicker-toggle',
    // Always set the tabindex to -1 so that it doesn't overlap with any custom tabindex the
    // consumer may have provided, while still being able to receive focus.
    '[attr.tabindex]': 'disabled ? null : -1',
    '(focus)': '_button.focus()'
  },
  exportAs: 'ccDatepickerToggle',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DsDatepickerToggle implements OnDestroy {
  static ngAcceptInputType_disabled: BooleanInput

  private _stateChanges = Subscription.EMPTY

  /** Datepicker instance that the button will toggle. */
  @Input() forDatepicker: DsDatepicker

  /** Tabindex for the toggle. */
  @Input() tabIndex: number | null

  /** Whether the toggle button is disabled. */
  @Input()
  get disabled(): boolean {
    if (this._disabled === undefined && this.forDatepicker) {
      return this.forDatepicker.disabled
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
  @ContentChild(DsDatepickerToggleIcon) _customIcon: DsDatepickerToggleIcon

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
  //   if (changes['datepicker']) {
  //     this._watchStateChanges();
  //   }
  // }

  ngOnDestroy(): void {
    this._stateChanges.unsubscribe()
  }

  // ngAfterContentInit() {
  //   this._watchStateChanges();
  // }

  _open(event: Event): void {
    if (this.forDatepicker && !this.disabled) {
      this.forDatepicker.open()
      event.stopPropagation()
    }
  }
}
