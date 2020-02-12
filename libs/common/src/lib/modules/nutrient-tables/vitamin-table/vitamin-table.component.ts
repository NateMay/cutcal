import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import * as _ from 'lodash'
import { NUTRIENTS } from '../../../classes/nutrientMetadata/nutrientMetadata'
import { NutrientMetaData } from '../../../constants/nutrientDetails'
import { getFolate, getVitaminA, getVitaminD, getVitaminE } from '../../../functions/getNutritionParts'
import { NutritionRange } from '../../../models/daily-value'
import { Folate, Nutrition, VitaminA, VitaminD, VitaminE } from '../../../models/nutrition'
import { ZERO_NUTRITION } from '../../../usda_nutrition/base-nutrition'
import { DailyValueSvc } from '../../../usda_nutrition/daily-value/daily-value.service'

@Component({
  selector: 'table[cc-vitamin],cc-vitamin',
  host: { class: 'cc-vitamin' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['../nutrient-table.scss', './vitamin-table.component.scss'],
  // <button (click)="toggleAll()" class="toggle-all">{{ toggleAllText }} All</button>
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
        <td>
          <button class="clickable" (click)="vitA_Open = !vitA_Open">
            Vitamin A
          </button>
        </td>
        <td class="quant">{{ nutrition.vit_A | number: numInfo }}</td>
        <td><span class="unit"> (IU) </span></td>
        <td class="daily-value">
          {{ nutrition.vit_A || 0 / rda('vit_A') | percent: precInfo }}
        </td>
      </tr>
      <ng-container *ngIf="vitA_Open">
        <tr class="child" *ngFor="let vit_A of vit_As | coll">
          <td>{{ vit_A?.shortName }}</td>
          <td class="quant">
            {{ nutrition[vit_A.propName] | number: numInfo }}
          </td>
          <td>
            <span class="unit"> ({{ vit_A?.unit }}) </span>
          </td>
          <td class="daily-value">~</td>
        </tr>
      </ng-container>
      <tr>
        <td>Vitamin C</td>
        <td class="quant">{{ nutrition.vit_C | number: numInfo }}</td>
        <td><span class="unit"> (mg) </span></td>
        <td class="daily-value">
          {{ nutrition.vit_C || 0 / rda('vit_C') | percent: precInfo }}
        </td>
      </tr>
      <tr>
        <!-- add breakdown vit_D items {{vitamins}} -->
        <td>
          <button class="clickable" (click)="vitD_Open = !vitD_Open">
            Vitamin D
          </button>
        </td>
        <td class="quant">{{ nutrition.vit_D | number: numInfo }}</td>
        <td><span class="unit"> (IU) </span></td>
        <td class="daily-value">
          {{ nutrition.vit_D || 0 / rda('vit_D') | percent: precInfo }}
        </td>
      </tr>
      <ng-container *ngIf="vitD_Open">
        <tr class="child" *ngFor="let vit_D of vit_Ds | coll">
          <td>{{ vit_D?.shortName }}</td>
          <td class="quant">
            {{ nutrition[vit_D.propName] | number: numInfo }}
          </td>
          <td>
            <span class="unit"> ({{ vit_D?.unit }}) </span>
          </td>
          <td class="daily-value">~</td>
        </tr>
      </ng-container>
      <tr>
        <td>
          <button class="clickable" (click)="vitE_Open = !vitE_Open">
            Vitamin E
          </button>
        </td>
        <td class="quant">{{ nutrition.vit_E | number: numInfo }}</td>
        <td><span class="unit"> (mg) </span></td>
        <td class="daily-value">
          {{ nutrition.vit_E || 0 / rda('vit_E') | percent: precInfo }}
        </td>
      </tr>
      <ng-container *ngIf="vitE_Open">
        <tr class="child" *ngFor="let vit_E of vit_Es | coll">
          <td>{{ vit_E?.shortName }}</td>
          <td class="quant">
            {{ nutrition[vit_E.propName] | number: numInfo }}
          </td>
          <td>
            <span class="unit"> ({{ vit_E?.unit }}) </span>
          </td>
          <td class="daily-value">~</td>
        </tr>
      </ng-container>
      <tr>
        <td>Vitamin K</td>
        <td class="quant">{{ nutrition.vit_K | number: numInfo }}</td>
        <td><span class="unit"> (mcg) </span></td>
        <td class="daily-value">
          {{ nutrition.vit_K || 0 / rda('vit_K') | percent: precInfo }}
        </td>
      </tr>
      <tr>
        <td>Thiamin</td>
        <td class="quant">{{ nutrition.thiamin | number: numInfo }}</td>
        <td><span class="unit"> (mg) </span></td>
        <td class="daily-value">
          {{ nutrition.thiamin || 0 / rda('thiamin') | percent: precInfo }}
        </td>
      </tr>
      <tr>
        <td>Riboflavin</td>
        <td class="quant">{{ nutrition.riboflavin | number: numInfo }}</td>
        <td><span class="unit"> (mg) </span></td>
        <td class="daily-value">
          {{
            nutrition.riboflavin || 0 / rda('riboflavin') | percent: precInfo
          }}
        </td>
      </tr>
      <tr>
        <td>Niacin</td>
        <td class="quant">{{ nutrition.niacin | number: numInfo }}</td>
        <td><span class="unit"> (mg) </span></td>
        <td class="daily-value">
          {{ nutrition.niacin || 0 / rda('niacin') | percent: precInfo }}
        </td>
      </tr>
      <tr>
        <td>Vitamin B6</td>
        <td class="quant">{{ nutrition.vit_B6 | number: numInfo }}</td>
        <td><span class="unit"> (mg) </span></td>
        <td class="daily-value">
          {{ nutrition.vit_B6 || 0 / rda('vit_B6') | percent: precInfo }}
        </td>
      </tr>

      <tr>
        <td>
          <button class="clickable" (click)="folate_Open = !folate_Open">
            Folate
          </button>
        </td>
        <td class="quant">{{ nutrition.folate | number: numInfo }}</td>
        <td><span class="unit"> (mcg) </span></td>
        <td class="daily-value">
          {{ nutrition.folate || 0 / rda('folate') | percent: precInfo }}
        </td>
      </tr>
      <ng-container *ngIf="folate_Open">
        <tr class="child" *ngFor="let folate of folates | coll">
          <td>{{ folate?.shortName }}</td>
          <td class="quant">
            {{ nutrition[folate.propName] | number: numInfo }}
          </td>
          <td>
            <span class="unit"> ({{ folate?.unit }}) </span>
          </td>
          <td class="daily-value">~</td>
        </tr>
      </ng-container>
      <tr>
        <td>Vitamin B12</td>
        <td class="quant">{{ nutrition.vit_B12 | number: numInfo }}</td>
        <td><span class="unit"> (mcg) </span></td>
        <td class="daily-value">
          {{ nutrition.vit_B12 || 0 / rda('vit_B12') | percent: precInfo }}
        </td>
      </tr>
      <tr>
        <td>Pantothenic Acid</td>
        <td class="quant">
          {{ nutrition.pantothenic_acid | number: numInfo }}
        </td>
        <td><span class="unit"> (mg) </span></td>
        <td class="daily-value">
          {{
            nutrition.pantothenic_acid || 0 / rda('pantothenic_acid')
              | percent: precInfo
          }}
        </td>
      </tr>
      <tr>
        <td>Choline</td>
        <td class="quant">{{ nutrition.choline | number: numInfo }}</td>
        <td><span class="unit"> (mg) </span></td>
        <td class="daily-value">
          {{ nutrition.choline || 0 / rda('choline') | percent: precInfo }}
        </td>
      </tr>
    </tbody>
  `,
})
export class VitaminTableComponent {
  readonly precInfo = '1.0-1'

  readonly numInfo = '1.1-1'

  vitA_Open: boolean = false
  vitD_Open: boolean = false
  vitE_Open: boolean = false
  folate_Open: boolean = false

  toggleAllText: string = 'Expand'

  folates: Folate<NutrientMetaData>
  vit_As: VitaminA<NutrientMetaData>
  vit_Ds: VitaminD<NutrientMetaData>
  vit_Es: VitaminE<NutrientMetaData>

  private _nutrition: Nutrition<number>
  @Input() set nutrition(nutrition: Nutrition<number>) {
    this._nutrition = Object.assign({}, ZERO_NUTRITION, nutrition)
    this.folates = getFolate<NutrientMetaData>(NUTRIENTS.allDetails)
    this.vit_Ds = getVitaminD<NutrientMetaData>(NUTRIENTS.allDetails)
    this.vit_Es = getVitaminE<NutrientMetaData>(NUTRIENTS.allDetails)
    this.vit_As = getVitaminA<NutrientMetaData>(NUTRIENTS.allDetails)
  }
  get nutrition() {
    return this._nutrition
  }

  constructor(private dv: DailyValueSvc) {}

  toggleAll(): void {
    if (this.toggleAllText === 'Expand') {
      this.toggleAllText = 'Collapse'
      this.vitA_Open = this.vitE_Open = this.folate_Open = true
    } else {
      this.toggleAllText = 'Expand'
      this.vitA_Open = this.vitE_Open = this.folate_Open = false
    }
  }

  rda(propName: string): number {
    const range: NutritionRange = _.get(this.dv.snapshot.nutrition, propName)
    return range && range.RDA ? range.RDA : 1
  }
}
