import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
// DEPRECATE:

export interface ProgressBarColors {
  background: string
  color: string
}
@Component({
  selector: 'ds-progress-bar',
  styleUrls: ['./progress-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="progress-outer">
      <div
        class="progress-inner"
        [ngStyle]="{
          width: progress + '%',
          backgroundColor: background,
          color: color
        }"
      >
        {{ progress || '0' }}%
      </div>
    </div>
  `
})
export class ProgressBarComponent {
  @Input() progress!: string

  @Input() colors: ProgressBarColors = {
    background: '#488aff',
    color: '#eee'
  }
  @Input() staleColors: ProgressBarColors = {
    background: '#eee',
    color: '#333'
  }

  get background(): string {
    return this.progress ? this.colors.background : this.staleColors.background
  }

  get color(): string {
    return this.progress ? this.colors.color : this.staleColors.color
  }
}
