import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { DailyValueSvc } from '@cutcal/common-ui'
import {
  getAminoAcids,
  NutrientMetaData,
  NUTRIENTS,
  NutritionRange,
  ZERO_NUTRITION
} from '@cutcal/nutrition'
import { AminoAcids, Nutrition } from '@cutcal/core'
import { get } from 'lodash'

@Component({
  selector: 'table[ds-protein],ds-protein',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'ds-protein' },
  styleUrls: ['../nutrient-table.scss', './protein-table.component.scss'],
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
      <tr *ngFor="let amino of aminos | keyvalue">
        <td>{{ amino.shortName }}</td>
        <td class="quant">
          {{ nutrition[amino.propName] | number: digitsInfo }}
        </td>
        <td>
          <span class="unit"> ({{ amino?.unit }}) </span>
        </td>
        <td class="daily-value">-</td>
      </tr>
    </tbody>
  `
})
export class ProteinTableComponent {
  readonly digitsInfo = '1.2-2'

  aminos: AminoAcids<NutrientMetaData>

  private _nutrition: Nutrition<number>
  @Input() set nutrition(nutrition: Nutrition<number>) {
    this._nutrition = Object.assign({}, ZERO_NUTRITION, nutrition)

    this.aminos = getAminoAcids<NutrientMetaData>(NUTRIENTS.allDetails)
  }
  get nutrition(): Nutrition<number> {
    return this._nutrition
  }

  constructor(private readonly dv: DailyValueSvc) {}

  rda(path: string): number {
    const range: NutritionRange = get(
      this.dv.snapshot.nutrition,
      path
    ) as NutritionRange
    return range?.RDA ? range.RDA : 1
  }
}
