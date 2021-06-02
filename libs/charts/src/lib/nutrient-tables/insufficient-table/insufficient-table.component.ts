import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { ZERO_NUTRITION } from '@cutcal/nutrition'
import { Nutrition } from '@cutcal/core'

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'table[ds-insufficient], ds-insufficient',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'ds-insufficient' },
  styleUrls: ['../nutrient-table.scss', './insufficient-table.component.scss'],
  template: `
    <thead>
      <tr>
        <th style="text-align: left;">Nutrient</th>
        <th class="quant">Quantity</th>
        <th class="daily-value">DV%</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Incomplete</td>
        <td class="quant">X</td>
        <td class="daily-value">X%</td>
      </tr>
    </tbody>
  `
})
export class InsufficientTableComponent {
  private _nutrition: Nutrition<number>
  @Input() set nutrition(nutrition: Nutrition<number>) {
    this._nutrition = Object.assign({}, ZERO_NUTRITION, nutrition)
  }
  get nutrition(): Nutrition<number> {
    return this._nutrition
  }
}
