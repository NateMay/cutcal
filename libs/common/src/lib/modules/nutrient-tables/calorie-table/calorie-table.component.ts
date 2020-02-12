import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import * as _ from 'lodash'
import {
  CaloriesFrom,
  caloriesFromAll,
} from '../../../functions/caloriesFrom/caloriesFrom'
import { NutritionRange } from '../../../models/daily-value'
import { Nutrition } from '../../../models/nutrition'
import { ZERO_NUTRITION } from '../../../usda_nutrition/base-nutrition'
import { DailyValueSvc } from '../../../usda_nutrition/daily-value/daily-value.service'

@Component({
  selector: 'table[cc-calories]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['../nutrient-table.scss', './calorie-table.component.scss'],
  host: { class: 'cc-calorie' },
  template: `
    <thead>
      <tr>
        <th style="text-align: left;">Calories from</th>
        <th class="quant">Quantity</th>
        <th></th>
        <th class="daily-value">%</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Carbohydrate</td>
        <td class="quant">{{ caloresFrom.carbohydrates | number: numInfo }}</td>
        <td><span class="unit"> (cal) </span></td>
        <td class="daily-value">
          {{ getPerent('carbohydrates') | percent: percentInfo }}
        </td>
      </tr>
      <tr>
        <td>Fat</td>
        <td class="quant">{{ caloresFrom.fat | number: numInfo }}</td>
        <td><span class="unit"> (cal) </span></td>
        <td class="daily-value">
          {{ getPerent('fat') | percent: percentInfo }}
        </td>
      </tr>
      <tr>
        <td>Protein</td>
        <td class="quant">{{ caloresFrom.protein | number: numInfo }}</td>
        <td><span class="unit"> (cal) </span></td>
        <td class="daily-value">
          {{ getPerent('protein') | percent: percentInfo }}
        </td>
      </tr>
      <tr>
        <td>Alcohol</td>
        <td class="quant">{{ caloresFrom.alcohol | number: numInfo }}</td>
        <td><span class="unit"> (cal) </span></td>
        <td class="daily-value">
          {{ getPerent('alcohol') | percent: percentInfo }}
        </td>
      </tr>
    </tbody>
  `,
})
export class CalorieTableComponent {
  readonly percentInfo = '1.0-1'

  readonly numInfo = '1.0-0'

  caloresFrom: CaloriesFrom = {
    carbohydrates: 0,
    protein: 0,
    fat: 0,
    alcohol: 0,
  }

  private _nutrition: Nutrition<number>
  @Input() set nutrition(nutrition: Nutrition<number>) {
    this._nutrition = Object.assign({}, ZERO_NUTRITION, nutrition)
    this.caloresFrom = caloriesFromAll(nutrition)
  }
  get nutrition(): Nutrition<number> {
    return this._nutrition
  }

  getPerent(macro: keyof CaloriesFrom): number {
    return this.nutrition && this.nutrition.calories
      ? this.caloresFrom[macro] / this.nutrition.calories
      : 0
  }

  constructor(private dv: DailyValueSvc) {}

  // Recommended Daily Allowance
  rda(propName: string): number {
    const range: NutritionRange = _.get(this.dv.snapshot.nutrition, propName)
    return range && range.RDA ? range.RDA : 1
  }
}
