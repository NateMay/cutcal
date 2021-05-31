import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { DailyValueSvc } from '@cutcal/common-ui'
import { Sugars, Nutrition, Carbohydrates } from '@cutcal/core'
import {
  getCarbohydrates,
  getSugars,
  NutrientMetaData,
  NUTRIENTS,
  NutritionRange,
  ZERO_NUTRITION
} from '@cutcal/nutrition'
import { get } from 'lodash';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
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
        <td class="quant">{{ nutrition.dietaryFiber | number: numInfo }}</td>
        <td>
          <span class="unit"> ({{ carbs['dietaryFiber']?.unit }}) </span>
        </td>
        <td class="daily-value">
          {{
            nutrition.dietaryFiber || 0 / rda('dietaryFiber')
              | percent: precInfo
          }}
        </td>
      </tr>
      <tr>
        <td>Insoluble Fiber</td>
        <td class="quant">{{ nutrition.insolubleFiber | number: numInfo }}</td>
        <td>
          <span class="unit"> ({{ carbs['solubleFiber']?.unit }}) </span>
        </td>
        <td class="daily-value">
          {{
            nutrition.insolubleFiber || 0 / rda('insolubleFiber')
              | percent: precInfo
          }}
        </td>
      </tr>
      <tr>
        <td>Soluble Fiber</td>
        <td class="quant">{{ nutrition.solubleFiber | number: numInfo }}</td>
        <td>
          <span class="unit"> ({{ carbs['insolubleFiber']?.unit }}) </span>
        </td>
        <td class="daily-value">
          {{
            nutrition.solubleFiber || 0 / rda('solubleFiber')
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
        <td class="quant">{{ nutrition.carbSum | number: numInfo }}</td>
        <td>
          <span class="unit"> ({{ carbs['carbSum']?.unit }}) </span>
        </td>
        <td class="daily-value">
          {{ nutrition.carbSum || 0 / rda('carbSum') | percent: precInfo }}
        </td>
      </tr>
      <tr>
        <td>Carbs Other</td>
        <td class="quant">{{ nutrition?.carbOther | number: numInfo }}</td>
        <td>
          <span class="unit"> ({{ carbs['carbOther']?.unit }}) </span>
        </td>
        <td class="daily-value">
          {{ nutrition.carbOther || 0 / rda('carbOther') | percent: precInfo }}
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
        <tr class="child" *ngFor="let sugar of sugarList">
          <td>{{ sugar?.shortName }}</td>
          <td class="quant">
            <!-- {{ nutrition[sugar.propName] | number: numInfo }} -->
          </td>
          <td>
            <span class="unit"> ({{ sugar?.unit }}) </span>
          </td>
          <td class="daily-value">~</td>
        </tr>
      </ng-container>
    </tbody>
  `
})
export class CarbsTableComponent {
  readonly precInfo = '1.0-1'

  readonly numInfo = '1.1-1'

  sugars: Sugars<NutrientMetaData>

  carbs: Carbohydrates<NutrientMetaData>

  get sugarList(): NutrientMetaData[] {
    return Object.values(this.sugars) as NutrientMetaData[]
  }

  private _nutrition: Nutrition<number>
  @Input() set nutrition(nutrition: Nutrition<number>) {
    this._nutrition = Object.assign({}, ZERO_NUTRITION, nutrition)
    this.sugars = getSugars<NutrientMetaData>(NUTRIENTS.allDetails) as Sugars<NutrientMetaData>
    this.carbs = getCarbohydrates<NutrientMetaData>(NUTRIENTS.allDetails) as Carbohydrates<NutrientMetaData>
  }
  get nutrition(): Nutrition<number> {
    return this._nutrition
  }

  sugars_open: boolean = false

  constructor(private readonly dv: DailyValueSvc) {}

  // Recommended Daily Allowance
  rda(path: string): number {
    const range: NutritionRange = get(this.dv.snapshot.nutrition, path) as NutritionRange
    return range?.RDA ? range.RDA : 1
  }
}
