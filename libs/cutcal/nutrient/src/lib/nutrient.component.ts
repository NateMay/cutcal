import { Component, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { NutrCheckable, Nutrition, nutrtionSelections } from '@cutcal/nutrition'

// FEATURE (nutrient-page) (content)
@Component({
  selector: 'cc-nutrient',
  host: { class: 'page-layout flush' },
  styleUrls: ['./nutrient.component.scss'],
  template: `
    <div fxLayout="row">
      <div class="nutrient-sidebar" fxFlex="300px">
        <h1>Nutrients</h1>
        <cc-checkable-nutrients
          [(nutrCheckables)]="nutrCheckables"
          (change)="checkableChange($event)"
        ></cc-checkable-nutrients>
      </div>

      <div fxFlex class="content">
        <h1 class="work-in-progress">THIS PAGE IS A WORK IN PROGRESS</h1>
        <section id="introduction">
          <h2>Calorie</h2>
          <p>The calorie is a unit of energy</p>
          <h3>Summary</h3>
          <p>
            There are actually two units with the name that have been widely
            used. The small calorie or gram calorie (usually denoted cal) is the
            amount of heat energy needed to raise the temperature of one gram of
            water by one degree Celsius (or one kelvin). The large calorie, food
            calorie, or kilocalorie (Cal or kcal) is the amount of heat needed
            to cause the same increase on one kilogram of water. Thus, 1 kcal =
            1000 cal.
          </p>
          <p>
            The large calorie is sometimes written Calorie (with a capital C) to
            distinguish from the other unit. However, this convention cannot be
            relied upon, since it is often ignored – especially in non-technical
            publications.
          </p>
          <p>
            Although both units are related to the metric system, they have been
            considered obsolete, or deprecated, in scientific usage, since the
            adoption of the SI system. The SI unit of energy is the joule, with
            symbol "J" (since 1889); one small calorie is now defined as exactly
            4.184 J, and one large calorie is 4184 J.
          </p>
          <p>
            However, the two units are still used occasionally in technical
            work, and the large calorie is still widely used in nutrition. In
            most countries, the labels of industrialized food products are
            required to indicate the nutritional energy value in (large)
            calories per serving or per weight.
          </p>
          <hr />
          <h3>Daily requirement</h3>
          <p>
            The United States government states that the average man needs 2,700
            kcal per day and the average woman needs 2,200 kcal per day.
          </p>
          <p>
            Not everybody needs the same number of calories each day. People
            have different metabolisms that burn energy at different rates, and
            some people have more active lifestyles than others.
          </p>
          <p>
            The recommended intake of calories per day depends on several
            factors, including:
          </p>
          <ul>
            <li>overall general health</li>
            <li>physical activity demands</li>
            <li>sex</li>
            <li>weight</li>
            <li>height</li>
            <li>body shape</li>
          </ul>
          <p>
            Here is a
            <a
              href="https://www.fns.usda.gov/cnpp/center-nutrition-policy-and-promotion"
              >more detailed breakdown</a
            >
            from the U.S. Department of Agriculture (USDA) on how many calories
            are needed for different body types.
          </p>
          <hr />
          <h3>Calories and macronutrients</h3>
          <p>
            Below are the calorific values of three main components of food:
          </p>
          <ul>
            <li>1 g of carbohydrates contains 4 kcal</li>
            <li>1 g of protein contains 4 kcal</li>
            <li>1 g of fat contains 9 kcal</li>
          </ul>
        </section>
      </div>
    </div>
  `,
})
export class NutrientComponent implements OnInit {
  selected: NutrCheckable

  nutrCheckables: Nutrition<NutrCheckable>

  constructor(private titleSvc: Title) {}

  ngOnInit() {
    this.nutrCheckables = nutrtionSelections(['calories'])
  }

  checkableChange(checkable: NutrCheckable) {
    this.titleSvc.setTitle(checkable.label)
  }
}
