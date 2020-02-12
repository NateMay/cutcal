import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import * as _ from 'lodash'
import { NUTRIENTS } from '../../../classes/nutrientMetadata/nutrientMetadata'
import { NutrientMetaData } from '../../../constants/nutrientDetails'
import { getSterols } from '../../../functions/getNutritionParts'
import { NutritionRange } from '../../../models/daily-value'
import { Nutrition, Sterols } from '../../../models/nutrition'
import { ZERO_NUTRITION } from '../../../usda_nutrition/base-nutrition'
import { DailyValueSvc } from '../../../usda_nutrition/daily-value/daily-value.service'

@Component({
  selector: 'table[cc-sterols],cc-sterols',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'cc-sterols' },
  styleUrls: ['../nutrient-table.scss', './sterols-table.component.scss'],
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
      <tr *ngFor="let sterol of sterols | keyvalue">
        <td>{{ sterol?.shortName }}</td>
        <td class="quant">{{ nutrition[sterol.propName] | number }}</td>
        <td>
          <span class="unit"> ({{ sterol?.unit }}) </span>
        </td>
        <td class="daily-value">
          {{
            nutrition[sterol.propName] / rda(sterol.propName)
              | percent: precInfo
          }}
        </td>
      </tr>
    </tbody>
  `,
})
export class SterolsTableComponent {
  readonly precInfo = '1.0-1'

  sterols: Sterols<NutrientMetaData>

  private _nutrition: Nutrition<number>
  @Input() set nutrition(nutrition: Nutrition<number>) {
    this._nutrition = Object.assign({}, ZERO_NUTRITION, nutrition)
    this.sterols = getSterols<NutrientMetaData>(NUTRIENTS.allDetails)
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
