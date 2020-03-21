import { LiveAnnouncer } from '@angular/cdk/a11y'
import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

@Component({
  selector: 'cc-radial-progress',
  // #region ========== template ========== //
  template: `
    <svg
      [attr.viewBox]="'0 0 ' + diameter + ' ' + diameter"
      [style.width.px]="diameter"
      [style.height.px]="diameter"
    >
      <circle
        cx="50%"
        cy="50%"
        class="rpb-back"
        [class.rpb-back-done]="percent === 100"
        [attr.r]="radius"
        [style.stroke-width.px]="baseStrokeWidth"
      />
      <circle
        *ngIf="percent !== 0"
        cx="50%"
        cy="50%"
        class="rpb-arc"
        [class.rpb-arc-done]="percent === 100"
        [attr.r]="radius"
        [style.stroke-width.px]="progressStrokeWidth"
        [style.stroke-dasharray]="arcLength + ' ' + circumference"
        [style.stroke-dashoffset]="arcLength"
      />
      <text
        *ngIf="percent !== 100"
        class="rpb-text"
        x="50%"
        y="50%"
        dominant-baseline="middle"
        text-anchor="middle"
      >
        {{ stepText }}
      </text>
      <path
        *ngIf="percent === 100"
        class="rpb-done-check"
        [attr.d]="checkPath"
        [style.stroke-width.px]="checkWidth"
      />
    </svg>
    <div class="rpb-content">
      <ng-content></ng-content>
    </div>
  `,
  // #endregion
  styleUrls: ['./radial-progress.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'cc-radial-progress',
  },
})
export class RadialProgressComponent {
  // #region ========== Properties ========== //

  private get _largestStrokeWidth() {
    return this.progressStrokeWidth > this.baseStrokeWidth
      ? this.progressStrokeWidth
      : this.baseStrokeWidth
  }

  get radius() {
    const _radius = (this.diameter - this._largestStrokeWidth) / 2
    return _radius
  }

  get circumference() {
    const _circumference = 2 * Math.PI * this.radius
    return _circumference
  }

  get arcLength() {
    const _arcLength = this.circumference * this.percent * 0.01
    return _arcLength
  }

  get checkPath() {
    const d = this.diameter
    const x1 = d * 0.27777
    const y1 = d * 0.54795
    const x2 = d * 0.40277
    const y2 = d * 0.65753
    const x3 = d * 0.75
    const y3 = d * 0.34247
    return `M${x1} ${y1} L${x2} ${y2} L${x3} ${y3}`
  }

  get checkWidth() {
    return this.diameter * 0.1
  }

  // #endregion

  // #region ========== @Inputs ========== //

  private _percent: number = 50
  @Input()
  set percent(pcnt: number) {
    // Limit the percent between 0 and 100
    if (pcnt > 100) {
      console.warn('percent should not be above 100... setting to 100')
      this._percent = 100
    } else if (pcnt < 0) {
      console.warn('percent should not be less than 0... setting to 0')
      this._percent = 0
    } else {
      this._percent = pcnt
    }
  }
  get percent() {
    return this._percent
  }

  @Input() diameter: number = 100

  @Input() progressStrokeWidth: number = 8

  @Input() baseStrokeWidth: number = 1

  @Input() stepText: string = '-'

  private _announceText: string
  @Input()
  set announceText(announceTxt: string) {
    this._announceText = announceTxt
    this.announce(announceTxt)
  }
  get announceText() {
    return this._announceText
  }

  // #endregion

  // #region ========== Constructor / Lifecycle Hooks ========== //

  constructor(private announcer: LiveAnnouncer) {}

  // #endregion

  // #region ========== Methods ========== //

  announce(txt: string) {
    this.announcer.announce(txt)
  }

  // #endregion
}
