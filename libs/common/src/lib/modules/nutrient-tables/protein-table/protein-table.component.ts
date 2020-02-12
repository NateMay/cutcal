import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import * as _ from 'lodash'
import { NUTRIENTS } from '../../../classes/nutrientMetadata/nutrientMetadata'
import { NutrientMetaData } from '../../../constants/nutrientDetails'
import { getAminoAcids } from '../../../functions/getNutritionParts'
import { NutritionRange } from '../../../models/daily-value'
import { AminoAcids, Nutrition } from '../../../models/nutrition'
import { ZERO_NUTRITION } from '../../../usda_nutrition/base-nutrition'
import { DailyValueSvc } from '../../../usda_nutrition/daily-value/daily-value.service'

@Component({
  selector: 'table[cc-protein],cc-protein',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'cc-protein' },
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
      <tr *ngFor="let amino of aminos | coll">
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
  `,
})
export class ProteinTableComponent {
  readonly digitsInfo = '1.2-2'

  aminos: AminoAcids<NutrientMetaData>

  private _nutrition: Nutrition<number>
  @Input() set nutrition(nutrition: Nutrition<number>) {
    this._nutrition = Object.assign({}, ZERO_NUTRITION, nutrition)

    this.aminos = getAminoAcids<NutrientMetaData>(NUTRIENTS.allDetails)
  }
  get nutrition() {
    return this._nutrition
  }

  rda(path: string): number {
    const range: NutritionRange = _.get(this.dv.snapshot.nutrition, path)
    return range && range.RDA ? range.RDA : 1
  }

  constructor(private dv: DailyValueSvc) {}
}
