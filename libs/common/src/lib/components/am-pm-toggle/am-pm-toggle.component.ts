import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import { Boolish } from '../../decorators/boolish/boolish'

let nextUniqueId = 0

@Component({
  selector: 'cc-am-pm-toggle',
  host: { class: 'cc-am-pm-toggle' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./am-pm-toggle.component.scss'],
  template: `
    <input
      type="checkbox"
      [attr.checked]="isPM"
      (change)="update()"
      [attr.id]="idStr"
      [attr.disabled]="disabled ? true : null"
    />

    <label [attr.for]="idStr">
      <span class="handle">
        <span class="crater crater-1"></span>
        <span class="crater crater-2"></span>
        <span class="crater crater-3"></span>
      </span>
      <span class="star star-1"></span>
      <span class="star star-2"></span>
      <span class="star star-3"></span>
      <span class="star star-4"></span>
      <span class="star star-5"></span>
      <span class="star star-6"></span>
    </label>
  `,
})
export class AmPmToggleComponent {
  @Input()
  get idStr(): string {
    return this._id
  }
  set idStr(value: string) {
    this._id = value || this._uid
  }
  private _id: string
  private _uid = `am-pm-toggle-${nextUniqueId++}`

  @Input() isPM: boolean
  @Output() isPMChange = new EventEmitter<boolean>()

  @Boolish
  @Input()
  disabled: boolean

  constructor() {
    this.idStr = this.idStr
  }

  update() {
    this.isPM = !this.isPM
    this.isPMChange.emit(this.isPM)
  }
}
