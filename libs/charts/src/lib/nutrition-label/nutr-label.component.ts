import { Component, Input } from '@angular/core'
import { caloriesFrom } from '../../../functions/caloriesFrom/caloriesFrom'
import { Nutrition } from '../../../models/nutrition'
import { Portion } from '../../../models/portion'
import { ZERO_NUTRITION } from '../../../usda_nutrition/base-nutrition'
import { DailyValueSvc } from '../../../usda_nutrition/daily-value/daily-value.service'
import { NutritionLabel } from './nutr-label'

@Component({
  selector: 'cc-nutrition-label',
  styleUrls: ['./nutr-label.component.scss'],
  host: { class: 'cc-nutrition-label' },
  template: `
    <div class="header">
      <h2 class="title">Nutrition Facts</h2>
      <table class="servings">
        <tr>
          <td class="serving-size">
            Serving Size
            <span *ngIf="portion"
              >{{ portion.quantity }}
              {{ portion.unit | unit | plural: portion.quantity }}</span
            >
            <span *ngIf="!portion">1 <small>(aggregate)</small></span>
          </td>
        </tr>
      </table>
    </div>

    <table class="main_table">
      <thead>
        <tr>
          <th colspan="3" class="small-info">Amount Per Serving</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td colspan="2">
            <span class="label calories"
              ><b>Calories</b>
              {{ labelDetails?.total_calories | number: '1.0-0' }}</span
            >
          </td>
          <td colspan="1">
            <span class="label cal_from_fat"
              >From Fat {{ calFromFat | number: '1.0-0' }}</span
            >
          </td>
        </tr>
        <tr class="thick-row">
          <td colspan="3" class="small-info"><b> % Daily Value* </b></td>
        </tr>
        <tr>
          <td colspan="2">
            <span class="label total_fat">
              <b> Total Fat &nbsp; </b>
              {{ labelDetails?.total_fat | number: '1.0-0' }}g
            </span>
          </td>
          <td>
            <b>{{ labelDetails?.perc_fat | percent: '.0-0' }}</b>
          </td>
        </tr>
        <tr>
          <td class="blank-cell"></td>
          <td>
            <span class="label sat_fat">
              <b> Saturated Fat &nbsp; </b>
              {{ labelDetails?.total_sat_fat | number: '1.0-0' }}g
            </span>
          </td>
          <td>
            <b>{{ labelDetails?.perc_sat_fat | percent: '.0-0' }}</b>
          </td>
        </tr>
        <tr>
          <td class="blank-cell"></td>
          <td>
            <span class="label trans_fat">
              Trans Fat &nbsp;
              {{ labelDetails?.total_trans_fat | number: '1.0-0' }}g
            </span>
          </td>
          <td></td>
        </tr>
        <tr>
          <td colspan="2">
            <span class="label cholesterol">
              <b> Cholesterol &nbsp; </b>
              {{ labelDetails?.cholesterol | number: '1.0-0' }}mg
            </span>
          </td>
          <td>
            <b> {{ labelDetails?.perc_cholesterol | percent: '.0-0' }} </b>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <span class="label sodium">
              <b> Sodium &nbsp; </b
              >{{ labelDetails?.sodium | number: '1.0-0' }}mg
            </span>
          </td>
          <td>
            <b> {{ labelDetails?.perc_sodium | percent: '.0-0' }} </b>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <span class="label carbs">
              <b>Total Carbohydrates &nbsp; </b>
              {{ labelDetails?.total_carb | number: '1.0-0' }}g
            </span>
          </td>
          <td>
            <b> {{ labelDetails?.perc_carbs | percent: '.0-0' }} </b>
          </td>
        </tr>
        <tr>
          <td class="blank-cell"></td>
          <td>
            <span class="label fiber">
              Dietary Fiber &nbsp;
              {{ labelDetails?.dietary_fiber | number: '1.0-0' }}g
            </span>
          </td>
          <td>
            <b> {{ labelDetails?.perc_dietary_fiber | percent: '.0-0' }} </b>
          </td>
        </tr>
        <tr>
          <td class="blank-cell"></td>
          <td>
            <span class="label sugar">
              Sugars &nbsp; {{ labelDetails?.total_sugar | number: '1.0-0' }}g
            </span>
          </td>
          <td></td>
        </tr>
        <tr class="thick-end">
          <td colspan="2">
            <span class="label protein">
              <b> Protein &nbsp; </b>
              {{ labelDetails?.total_protein | number: '1.0-0' }}g
            </span>
          </td>
          <td></td>
        </tr>
      </tbody>
    </table>

    <table class="vitamins-table">
      <tbody>
        <tr>
          <td colspan="2" class="vit_a">
            <div class="label">Vitamin A &nbsp;</div>
            {{ labelDetails?.perc_vit_a | percent: '.0-0' }}
          </td>
          <td class="vit_c">
            Vitamin C &nbsp; {{ labelDetails?.perc_vit_c | percent: '.0-0' }}
          </td>
        </tr>
        <tr class="thin-end">
          <td colspan="2" class="calcium">
            <div class="label">Calcium &nbsp;</div>
            {{ labelDetails?.perc_calcium | percent: '.0-0' }}
          </td>
          <td class="iron">
            Iron &nbsp; {{ labelDetails?.perc_iron | percent: '.0-0' }}
          </td>
        </tr>
      </tbody>
    </table>

    <p class="small-info">
      * Percent Daily Values are based on a 2,000 calorie diet. Your daily
      values may be higher or lower depending on your calorie needs:
    </p>

    <br />

    <table class="mini-table small-info">
      <thead>
        <tr>
          <td colspan="2"></td>
          <th>Calories:</th>
          <th>2,000g</th>
          <th>2,500</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <th colspan="2">Total Fat</th>
          <td>Less than</td>
          <td>65g</td>
          <td>80g</td>
        </tr>
        <tr>
          <td class="blank-cell"></td>
          <th>Saturated Fat</th>
          <td>Less than</td>
          <td>20g</td>
          <td>25g</td>
        </tr>
        <tr>
          <th colspan="2">Cholesterol</th>
          <td>Less than</td>
          <td>300mg</td>
          <td>300mg</td>
        </tr>
        <tr>
          <th colspan="2">Sodium</th>
          <td>Less than</td>
          <td>2,400mg</td>
          <td>2,400mg</td>
        </tr>
        <tr>
          <th colspan="3">Total Carbohydrate</th>
          <td>300g</td>
          <td>375g</td>
        </tr>
        <tr>
          <td class="blank-cell"></td>
          <th colspan="2">Dietary Fiber</th>
          <td>25g</td>
          <td>30g</td>
        </tr>
      </tbody>
    </table>

    <p class="small-info">
      Calories per gram:
    </p>

    <p class="small-info text-center">
      Fat 9 &bull; Carbohydrate 4 &bull; Protein 4
    </p>
  `,
})
export class NutrLabelComponent {
  @Input() label: string

  @Input() portion: Portion

  calFromFat: number

  labelDetails: NutritionLabel

  @Input() set nutrition(nutrition: Nutrition<number>) {
    this.calFromFat = caloriesFrom('fat', nutrition || ZERO_NUTRITION)
    this.labelDetails = new NutritionLabel(
      nutrition || ZERO_NUTRITION,
      this.dvSvc.snapshot
    )
  }

  constructor(private dvSvc: DailyValueSvc) {}
}
