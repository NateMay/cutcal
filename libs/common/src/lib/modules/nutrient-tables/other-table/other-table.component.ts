import { Component, Input } from '@angular/core'
import * as _ from 'lodash'
import { NUTRIENTS } from '../../../classes/nutrientMetadata/nutrientMetadata'
import { NutrientMetaData } from '../../../constants/nutrientDetails'
import { getOthers } from '../../../functions/getNutritionParts'
import { NutritionRange } from '../../../models/daily-value'
import { Nutrition, Others } from '../../../models/nutrition'
import { ZERO_NUTRITION } from '../../../usda_nutrition/base-nutrition'
import { DailyValueSvc } from '../../../usda_nutrition/daily-value/daily-value.service'

@Component({
  selector: 'table[cc-other],cc-other',
  template: `
    <thead>
      <tr>
        <th style="text-align: left;">Nutrient</th>
        <th class="quant">Quantity</th>
        <th></th>
        <th class="daily-value">DV%</th>
      </tr>
    </thead>

    <tbody>
      <tr *ngFor="let other of others | keyvalue">
        <td>{{ other?.shortName }}</td>
        <td class="quant">{{ nutrition[other.propName] | number: numInfo }}</td>
        <td>
          <span class="unit"> ({{ other?.unit }}) </span>
        </td>
        <td class="daily-value">
          {{ nutrition[other.propName] / rda(other.prop) | percent: precInfo }}
        </td>
      </tr>
    </tbody>
  `,
  styleUrls: ['../nutrient-table.scss', './other-table.component.scss'],
  host: { class: 'cc-other' },
})
export class OtherTableComponent {
  readonly precInfo = '1.0-1'

  readonly numInfo = '1.1-1'

  others: Others<NutrientMetaData>

  private _nutrition: Nutrition<number>
  @Input() set nutrition(nutrition: Nutrition<number>) {
    this._nutrition = Object.assign({}, ZERO_NUTRITION, nutrition)
    this.others = getOthers<NutrientMetaData>(NUTRIENTS.allDetails)
  }
  get nutrition() {
    return this._nutrition
  }

  constructor(private dv: DailyValueSvc) {}

  // Recommended Daily Allowance
  rda(path: string): number {
    const range: NutritionRange = _.get(this.dv.snapshot.nutrition, path)
    return range && range.RDA ? range.RDA : 1
  }
}
