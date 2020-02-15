import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import {
  Carbohydrates,
  DailyValueSvc,
  getCarbohydrates,
  getSugars,
  NutrientMetaData,
  NUTRIENTS,
  Nutrition,
  NutritionRange,
  Sugars,
  ZERO_NUTRITION,
} from '@cutcal/nutrition'
import * as _ from 'lodash'

@Component({
  selector: 'table[cc-carbs],cc-carbs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'cc-carbs' },
  styleUrls: ['../nutrient-table.scss', './carbs-table.component.scss'],
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
      <tr>
        <td>Dietary Fiber</td>
        <td class="quant">{{ nutrition.dietary_fiber | number: numInfo }}</td>
        <td>
          <span class="unit"> ({{ carbs['dietary_fiber']?.unit }}) </span>
        </td>
        <td class="daily-value">
          {{
            nutrition.dietary_fiber || 0 / rda('dietary_fiber')
              | percent: precInfo
          }}
        </td>
      </tr>
      <tr>
        <td>Insoluble Fiber</td>
        <td class="quant">{{ nutrition.insoluble_fiber | number: numInfo }}</td>
        <td>
          <span class="unit"> ({{ carbs['soluble_fiber']?.unit }}) </span>
        </td>
        <td class="daily-value">
          {{
            nutrition.insoluble_fiber || 0 / rda('insoluble_fiber')
              | percent: precInfo
          }}
        </td>
      </tr>
      <tr>
        <td>Soluble Fiber</td>
        <td class="quant">{{ nutrition.soluble_fiber | number: numInfo }}</td>
        <td>
          <span class="unit"> ({{ carbs['insoluble_fiber']?.unit }}) </span>
        </td>
        <td class="daily-value">
          {{
            nutrition.soluble_fiber || 0 / rda('soluble_fiber')
              | percent: precInfo
          }}
        </td>
      </tr>
      <tr>
        <td>Starch</td>
        <td class="quant">{{ nutrition.starch | number: numInfo }}</td>
        <td>
          <span class="unit"> ({{ carbs['starch']?.unit }}) </span>
        </td>
        <td class="daily-value">
          {{ nutrition.starch || 0 / rda('starch') | percent: precInfo }}
        </td>
      </tr>
      <tr>
        <td>Carbs by Summation</td>
        <td class="quant">{{ nutrition.carb_sum | number: numInfo }}</td>
        <td>
          <span class="unit"> ({{ carbs['carb_sum']?.unit }}) </span>
        </td>
        <td class="daily-value">
          {{ nutrition.carb_sum || 0 / rda('carb_sum') | percent: precInfo }}
        </td>
      </tr>
      <tr>
        <td>Carbs Other</td>
        <td class="quant">{{ nutrition?.carb_other | number: numInfo }}</td>
        <td>
          <span class="unit"> ({{ carbs['carb_other']?.unit }}) </span>
        </td>
        <td class="daily-value">
          {{
            nutrition.carb_other || 0 / rda('carb_other') | percent: precInfo
          }}
        </td>
      </tr>
      <tr>
        <td>Inulin</td>
        <td class="quant">{{ nutrition.inulin | number: numInfo }}</td>
        <td>
          <span class="unit"> ({{ carbs['inulin']?.unit }}) </span>
        </td>
        <td class="daily-value">
          {{ nutrition.inulin || 0 / rda('inulin') | percent: precInfo }}
        </td>
      </tr>
      <tr>
        <td>Epigallocatechin</td>
        <td class="quant">
          {{ nutrition.epigallocatechin | number: numInfo }}
        </td>
        <td>
          <span class="unit"> ({{ carbs['epigallocatechin']?.unit }}) </span>
        </td>
        <td class="daily-value">
          {{
            nutrition.epigallocatechin || 0 / rda('epigallocatechin')
              | percent: precInfo
          }}
        </td>
      </tr>
      <tr>
        <td>
          <button class="clickable" (click)="sugars_open = !sugars_open">
            Sugars
          </button>
        </td>
        <td class="quant">{{ nutrition.sugar | number: numInfo }}</td>
        <td>
          <span class="unit"> ({{ carbs['sugar']?.unit }}) </span>
        </td>
        <td class="daily-value">~</td>
      </tr>

      <ng-container *ngIf="sugars_open">
        <tr class="child" *ngFor="let sugar of sugars | keyvalue">
          <td>{{ sugar?.shortName }}</td>
          <td class="quant">
            {{ nutrition[sugar.propName] | number: numInfo }}
          </td>
          <td>
            <span class="unit"> ({{ sugar?.unit }}) </span>
          </td>
          <td class="daily-value">~</td>
        </tr>
      </ng-container>
    </tbody>
  `,
})
export class CarbsTableComponent {
  readonly precInfo = '1.0-1'

  readonly numInfo = '1.1-1'

  sugars: Sugars<NutrientMetaData>

  carbs: Carbohydrates<NutrientMetaData>

  private _nutrition: Nutrition<number>
  @Input() set nutrition(nutrition: Nutrition<number>) {
    this._nutrition = Object.assign({}, ZERO_NUTRITION, nutrition)
    this.sugars = getSugars<NutrientMetaData>(NUTRIENTS.allDetails)
    this.carbs = getCarbohydrates<NutrientMetaData>(NUTRIENTS.allDetails)
  }
  get nutrition() {
    return this._nutrition
  }

  sugars_open: boolean = false

  // Recommended Daily Allowance
  rda(path: string): number {
    const range: NutritionRange = _.get(this.dv.snapshot.nutrition, path)
    return range && range.RDA ? range.RDA : 1
  }

  constructor(private dv: DailyValueSvc) {}
}
