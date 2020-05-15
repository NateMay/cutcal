import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { DailyValueSvc } from '@cutcal/common-ui'
import {
  getMonoUnsaturated,
  getOmega3,
  getOmega6,
  getPolyUnsaturated,
  getSaturatedFat,
  getTransUnsaturated,
  MonoUnsaturated,
  NutrientMetaData,
  NUTRIENTS,
  Nutrition,
  NutritionRange,
  PolyUnsaturated,
  SaturatedFat,
  TransUnsaturated,
  ZERO_NUTRITION
} from '@cutcal/nutrition'
import { get, sum, values } from 'lodash'

@Component({
  selector: 'table[cc-fats],cc-fats',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'cc-fats' },
  styleUrls: ['../nutrient-table.scss', './fats-table.component.scss'],
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
          <button class="clickable" (click)="saturated_open = !saturated_open">
            Saturated
          </button>
        </td>
        <td class="quant">{{ nutrition.saturatedFat | number: numInfo }}</td>
        <td><span class="unit"> (g) </span></td>
        <td class="daily-value">
          {{
            nutrition.saturatedFat || 0 / rda('saturatedFat')
              | percent: digitsInfo2
          }}
        </td>
      </tr>

      <ng-container *ngIf="saturated_open">
        <tr class="child" *ngFor="let fat of satFats | keyvalue">
          <td>{{ fat.shortName }}</td>
          <td class="quant">{{ nutrition[fat.propName] | number: numInfo }}</td>
          <td>
            <span class="unit"> ({{ fat?.unit }}) </span>
          </td>
          <td class="daily-value">
            {{
              nutrition[fat.propName] / rda(fat.propName) | percent: digitsInfo2
            }}
          </td>
        </tr>
      </ng-container>

      <tr>
        <td>
          <button
            class="clickable"
            (click)="monoSaturated_open = !monoSaturated_open"
          >
            Monounsaturated
          </button>
        </td>
        <td class="quant">{{ nutrition.monoUnsaturated | number: numInfo }}</td>
        <td><span class="unit"> (g) </span></td>
        <td class="daily-value">
          {{
            nutrition.monoUnsaturated || 0 / rda('monoUnsaturated')
              | percent: digitsInfo2
          }}
        </td>
      </tr>

      <ng-container *ngIf="monoSaturated_open">
        <tr class="child" *ngFor="let fat of monos | keyvalue">
          <td>{{ fat.shortName }}</td>
          <td class="quant">{{ nutrition[fat.propName] | number: numInfo }}</td>
          <td>
            <span class="unit"> ({{ fat?.unit }}) </span>
          </td>
          <td class="daily-value">
            {{
              nutrition[fat.propName] / rda(fat.propName) | percent: digitsInfo2
            }}
          </td>
        </tr>
      </ng-container>

      <tr>
        <td>
          <button
            class="clickable"
            (click)="polySaturated_open = !polySaturated_open"
          >
            Polyunsaturated
          </button>
        </td>
        <td class="quant">{{ nutrition.polyUnsaturated | number: numInfo }}</td>
        <td><span class="unit"> (g) </span></td>
        <td class="daily-value">
          {{
            nutrition.polyUnsaturated || 0 / rda('polyUnsaturated')
              | percent: digitsInfo2
          }}
        </td>
      </tr>

      <ng-container *ngIf="polySaturated_open">
        <tr class="child" *ngFor="let fat of polys | keyvalue">
          <td>{{ fat.shortName }}</td>
          <td class="quant">{{ nutrition[fat.propName] | number: numInfo }}</td>
          <td>
            <span class="unit"> ({{ fat?.unit }}) </span>
          </td>
          <td class="daily-value">
            {{
              nutrition[fat.propName] / rda(fat.propName) | percent: digitsInfo2
            }}
          </td>
        </tr>
      </ng-container>

      <tr>
        <td>Omega 3</td>
        <td class="quant">{{ omega3 | number: numInfo }}</td>
        <td><span class="unit"> (g) </span></td>
        <td class="daily-value">{{ omega3 / 250 | percent: digitsInfo2 }}</td>
      </tr>

      <tr>
        <td>Omega 6</td>
        <td class="quant">{{ omega6 | number: numInfo }}</td>
        <td><span class="unit"> (g) </span></td>
        <td class="daily-value">{{ omega6 / 250 | percent: digitsInfo2 }}</td>
      </tr>

      <tr>
        <td>
          <button
            class="clickable"
            (click)="transSaturated_open = !transSaturated_open"
          >
            Trans-Saturated
          </button>
        </td>
        <td class="quant">
          {{ nutrition.transUnsaturated | number: numInfo }}
        </td>
        <td><span class="unit"> (g) </span></td>
        <td class="daily-value">
          {{
            nutrition.transUnsaturated || 0 / rda('transUnsaturated')
              | percent: digitsInfo2
          }}
        </td>
      </tr>

      <ng-container *ngIf="transSaturated_open">
        <tr class="child" *ngFor="let fat of transFats | keyvalue">
          <td>{{ fat.shortName }}</td>
          <td class="quant">{{ nutrition[fat.propName] | number: numInfo }}</td>
          <td>
            <span class="unit"> ({{ fat?.unit }}) </span>
          </td>
          <td class="daily-value">
            {{
              nutrition[fat.propName] / rda(fat.propName) | percent: digitsInfo2
            }}
          </td>
        </tr>
      </ng-container>
    </tbody>
  `
})
export class FatsTableComponent {
  readonly numInfo = '1.1-1' // quantity
  readonly digitsInfo2 = '1.0-1' // percent

  polys: PolyUnsaturated<NutrientMetaData>
  monos: MonoUnsaturated<NutrientMetaData>
  transFats: TransUnsaturated<NutrientMetaData>
  satFats: SaturatedFat<NutrientMetaData>

  omega3: number
  omega6: number

  private _nutrition: Nutrition<number>
  @Input() set nutrition(nutrition: Nutrition<number>) {
    this._nutrition = Object.assign({}, ZERO_NUTRITION, nutrition)

    const deatils = NUTRIENTS.allDetails

    this.polys = getPolyUnsaturated(deatils)
    this.monos = getMonoUnsaturated(deatils)
    this.transFats = getTransUnsaturated(deatils)
    this.satFats = getSaturatedFat(deatils)

    this.omega3 = sum(values(getOmega3(this._nutrition)))
    this.omega6 = sum(values(getOmega6(this._nutrition)))
  }
  get nutrition(): Nutrition<number> {
    return this._nutrition
  }

  saturated_open: boolean = false
  monoSaturated_open: boolean = false
  polySaturated_open: boolean = false
  transSaturated_open: boolean = false

  constructor(private readonly dv: DailyValueSvc) {}

  // Recommended Daily Allowance
  rda(path: string): number {
    const range: NutritionRange = get(this.dv.snapshot.nutrition, path)
    return range?.RDA ? range.RDA : 1
  }
}
