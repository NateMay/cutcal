import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { DailyValueSvc } from '@cutcal/common-ui'
import {
  getFolate,
  getVitaminA,
  getVitaminD,
  getVitaminE,
  NutrientMetaData,
  NUTRIENTS,
  NutritionRange,
  ZERO_NUTRITION
} from '@cutcal/nutrition'
import { VitaminA, VitaminD, VitaminE, Nutrition, Folate } from '@cutcal/core'
import { get } from 'lodash'
@Component({
  selector: 'table[ds-vitamin],ds-vitamin',
  host: { class: 'ds-vitamin' },
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
          <button class="clickable" (click)="vitAOpen = !vitAOpen">
            Vitamin A
          </button>
        </td>
        <td class="quant">{{ nutrition.vitA | number: numInfo }}</td>
        <td><span class="unit"> (IU) </span></td>
        <td class="daily-value">
          {{ nutrition.vitA || 0 / rda('vitA') | percent: precInfo }}
        </td>
      </tr>
      <ng-container *ngIf="vitAOpen">
        <tr class="child" *ngFor="let vitA of vitAs | keyvalue">
          <td>{{ vitA?.shortName }}</td>
          <td class="quant">
            {{ nutrition[vitA.propName] | number: numInfo }}
          </td>
          <td>
            <span class="unit"> ({{ vitA?.unit }}) </span>
          </td>
          <td class="daily-value">~</td>
        </tr>
      </ng-container>
      <tr>
        <td>Vitamin C</td>
        <td class="quant">{{ nutrition.vitC | number: numInfo }}</td>
        <td><span class="unit"> (mg) </span></td>
        <td class="daily-value">
          {{ nutrition.vitC || 0 / rda('vitC') | percent: precInfo }}
        </td>
      </tr>
      <tr>
        <!-- add breakdown vitD items {{vitamins}} -->
        <td>
          <button class="clickable" (click)="vitD_Open = !vitD_Open">
            Vitamin D
          </button>
        </td>
        <td class="quant">{{ nutrition.vitD | number: numInfo }}</td>
        <td><span class="unit"> (IU) </span></td>
        <td class="daily-value">
          {{ nutrition.vitD || 0 / rda('vitD') | percent: precInfo }}
        </td>
      </tr>
      <ng-container *ngIf="vitD_Open">
        <tr class="child" *ngFor="let vitD of vitDs | keyvalue">
          <td>{{ vitD?.shortName }}</td>
          <td class="quant">
            {{ nutrition[vitD.propName] | number: numInfo }}
          </td>
          <td>
            <span class="unit"> ({{ vitD?.unit }}) </span>
          </td>
          <td class="daily-value">~</td>
        </tr>
      </ng-container>
      <tr>
        <td>
          <button class="clickable" (click)="vitEOpen = !vitEOpen">
            Vitamin E
          </button>
        </td>
        <td class="quant">{{ nutrition.vitE | number: numInfo }}</td>
        <td><span class="unit"> (mg) </span></td>
        <td class="daily-value">
          {{ nutrition.vitE || 0 / rda('vitE') | percent: precInfo }}
        </td>
      </tr>
      <ng-container *ngIf="vitEOpen">
        <tr class="child" *ngFor="let vitE of vitEs | keyvalue">
          <td>{{ vitE?.shortName }}</td>
          <td class="quant">
            {{ nutrition[vitE.propName] | number: numInfo }}
          </td>
          <td>
            <span class="unit"> ({{ vitE?.unit }}) </span>
          </td>
          <td class="daily-value">~</td>
        </tr>
      </ng-container>
      <tr>
        <td>Vitamin K</td>
        <td class="quant">{{ nutrition.vitK | number: numInfo }}</td>
        <td><span class="unit"> (mcg) </span></td>
        <td class="daily-value">
          {{ nutrition.vitK || 0 / rda('vitK') | percent: precInfo }}
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
        <td class="quant">{{ nutrition.vitB6 | number: numInfo }}</td>
        <td><span class="unit"> (mg) </span></td>
        <td class="daily-value">
          {{ nutrition.vitB6 || 0 / rda('vitB6') | percent: precInfo }}
        </td>
      </tr>

      <tr>
        <td>
          <button class="clickable" (click)="folateOpen = !folateOpen">
            Folate
          </button>
        </td>
        <td class="quant">{{ nutrition.folate | number: numInfo }}</td>
        <td><span class="unit"> (mcg) </span></td>
        <td class="daily-value">
          {{ nutrition.folate || 0 / rda('folate') | percent: precInfo }}
        </td>
      </tr>
      <ng-container *ngIf="folateOpen">
        <tr class="child" *ngFor="let folate of folates | keyvalue">
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
        <td class="quant">{{ nutrition.vitB12 | number: numInfo }}</td>
        <td><span class="unit"> (mcg) </span></td>
        <td class="daily-value">
          {{ nutrition.vitB12 || 0 / rda('vitB12') | percent: precInfo }}
        </td>
      </tr>
      <tr>
        <td>Pantothenic Acid</td>
        <td class="quant">
          {{ nutrition.pantothenicAcid | number: numInfo }}
        </td>
        <td><span class="unit"> (mg) </span></td>
        <td class="daily-value">
          {{
            nutrition.pantothenicAcid || 0 / rda('pantothenic_acid')
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
  `
})
export class VitaminTableComponent {
  readonly precInfo = '1.0-1'

  readonly numInfo = '1.1-1'

  vitAOpen: boolean = false
  vitD_Open: boolean = false
  vitEOpen: boolean = false
  folateOpen: boolean = false

  toggleAllText: string = 'Expand'

  folates: Folate<NutrientMetaData>
  vitAs: VitaminA<NutrientMetaData>
  vitDs: VitaminD<NutrientMetaData>
  vitEs: VitaminE<NutrientMetaData>

  private _nutrition: Nutrition<number>
  @Input() set nutrition(nutrition: Nutrition<number>) {
    this._nutrition = Object.assign({}, ZERO_NUTRITION, nutrition)
    this.folates = getFolate<NutrientMetaData>(NUTRIENTS.allDetails)
    this.vitDs = getVitaminD<NutrientMetaData>(NUTRIENTS.allDetails)
    this.vitEs = getVitaminE<NutrientMetaData>(NUTRIENTS.allDetails)
    this.vitAs = getVitaminA<NutrientMetaData>(NUTRIENTS.allDetails)
  }
  get nutrition(): Nutrition<number> {
    return this._nutrition
  }

  constructor(private readonly dv: DailyValueSvc) {}

  toggleAll(): void {
    if (this.toggleAllText === 'Expand') {
      this.toggleAllText = 'Collapse'
      this.vitAOpen = this.vitEOpen = this.folateOpen = true
    } else {
      this.toggleAllText = 'Expand'
      this.vitAOpen = this.vitEOpen = this.folateOpen = false
    }
  }

  rda(propName: string): number {
    const range: NutritionRange = get(this.dv.snapshot.nutrition, propName)
    return range?.RDA ? range.RDA : 1
  }
}
