import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { DailyValueSvc } from '@cutcal/common-ui'
import {
  getMinerals,
  NutrientMetaData,
  NUTRIENTS,
  NutritionRange,
  ZERO_NUTRITION
} from '@cutcal/nutrition'
import { Minerals, Nutrition } from '@cutcal/core'
import { get } from 'lodash'

@Component({
  selector: 'table[ds-mineral],ds-mineral',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'ds-mineral' },
  styleUrls: ['../nutrient-table.scss', './mineral-table.component.scss'],
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
      <tr *ngFor="let mineral of minerals | keyvalue">
        <td>{{ mineral?.shortName }}</td>
        <td class="quant">
          {{ nutrition[mineral.propName] | number: numInfo }}
        </td>
        <td>
          <span class="unit"> ({{ mineral?.unit }}) </span>
        </td>
        <td class="daily-value">
          {{
            nutrition[mineral.propName] / rda(mineral.propName)
              | percent: precInfo
          }}
        </td>
      </tr>
    </tbody>
  `
})
export class MineralTableComponent {
  readonly precInfo = '1.1-1'

  readonly numInfo = '1.1-1'

  minerals: Minerals<NutrientMetaData>

  private _nutrition: Nutrition<number>
  @Input() set nutrition(nutrition: Nutrition<number>) {
    this._nutrition = Object.assign({}, ZERO_NUTRITION, nutrition)
    this.minerals = getMinerals<NutrientMetaData>(NUTRIENTS.allDetails)
  }
  get nutrition(): Nutrition<number> {
    return this._nutrition
  }

  constructor(private readonly dv: DailyValueSvc) {}

  // Recommended Daily Allowance
  rda(path: string): number {
    const range: NutritionRange = get(
      this.dv.snapshot.nutrition,
      path
    ) as NutritionRange
    return range?.RDA ? range.RDA : 1
  }
}
