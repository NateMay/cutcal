import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core'
import { Nutrition, ZERO_NUTRITION } from '@cutcal/nutrition'

@Component({
  selector: 'table[cc-insufficient, cc-insufficient',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'cc-insufficient' },
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
  `,
})
export class InsufficientTableComponent implements OnInit {
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
