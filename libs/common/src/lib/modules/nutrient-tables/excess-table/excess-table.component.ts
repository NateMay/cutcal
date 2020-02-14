import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core'
import { Nutrition, ZERO_NUTRITION } from '@cutcal/nutrition'

@Component({
  selector: 'table[cc-excess], cc-excess',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'cc-excess' },
  styleUrls: ['../nutrient-table.scss', './excess-table.component.scss'],
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
  `,
})
export class ExcessTableComponent implements OnInit {
  private _nutrition: Nutrition<number>
  @Input() set nutrition(nutrition: Nutrition<number>) {
    this._nutrition = Object.assign({}, ZERO_NUTRITION, nutrition)
  }
  get nutrition() {
    return this._nutrition
  }

  constructor() {}

  ngOnInit() {}
}
