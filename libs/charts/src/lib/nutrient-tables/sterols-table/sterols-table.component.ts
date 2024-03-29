import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { DailyValueSvc } from '@cutcal/common-ui'
import {
  getSterols,
  NutrientMetaData,
  NUTRIENTS,
  NutritionRange,
  ZERO_NUTRITION
} from '@cutcal/nutrition'
import { Nutrition, Sterols } from '@cutcal/core'
import { get } from 'lodash'

@Component({
  selector: 'table[ds-sterols],ds-sterols',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'ds-sterols' },
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
  `
})
export class SterolsTableComponent {
  readonly precInfo = '1.0-1'

  sterols: Sterols<NutrientMetaData>

  private _nutrition: Nutrition<number>
  @Input() set nutrition(nutrition: Nutrition<number>) {
    this._nutrition = Object.assign({}, ZERO_NUTRITION, nutrition)
    this.sterols = getSterols<NutrientMetaData>(NUTRIENTS.allDetails)
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
