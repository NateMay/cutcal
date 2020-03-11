import { Component, Input, OnInit } from '@angular/core'
import { createPortion, Portion } from '@cutcal/diet'
import { NUTRIENTS, Nutrition, ZERO_NUTRITION } from '@cutcal/nutrition'

export interface Primaries<T> {
  calories?: T
  fat?: T
  carbohydrates?: T
  protein?: T
}

// DISTANT (analytics) https://nutritiondata.self.com/help/analysis-help
@Component({
  selector: 'cc-detail-panels',
  host: { class: 'cc-detail-panels' },
  template: `
    <div *ngIf="nutrition" dynamicWidth (width)="width = $event">
      <!-- 1 column -->
      <div *ngIf="columns == 'one'" fxLayout="column" fxFlex="100%">
        <ng-container *ngTemplateOutlet="ingredientsTpl"></ng-container>
        <ng-container *ngTemplateOutlet="instructionsTpl"></ng-container>
        <ng-container *ngTemplateOutlet="balanceTpl"></ng-container>
        <ng-container *ngTemplateOutlet="caloriesTpl"></ng-container>
        <ng-container *ngTemplateOutlet="proteinTpl"></ng-container>
        <ng-container *ngTemplateOutlet="fatTpl"></ng-container>
        <ng-container *ngTemplateOutlet="carbTpl"></ng-container>
        <ng-container *ngTemplateOutlet="mineralTpl"></ng-container>
        <ng-container *ngTemplateOutlet="vimatinTpl"></ng-container>
        <ng-container *ngTemplateOutlet="sterolTpl"></ng-container>
        <ng-container *ngTemplateOutlet="otherTpl"></ng-container>
        <ng-container *ngTemplateOutlet="insufficientTpl"></ng-container>
        <ng-container *ngTemplateOutlet="excessTpl"></ng-container>
        <ng-container *ngTemplateOutlet="nutrLabel"></ng-container>
      </div>

      <!-- 2 columns -->
      <div *ngIf="columns == 'two'" fxFlex="100%">
        <span fxLayout="column" fxFlex="50%">
          <ng-container *ngTemplateOutlet="ingredientsTpl"></ng-container>
          <ng-container *ngTemplateOutlet="instructionsTpl"></ng-container>
          <ng-container *ngTemplateOutlet="caloriesTpl"></ng-container>
          <ng-container *ngTemplateOutlet="proteinTpl"></ng-container>
          <ng-container *ngTemplateOutlet="fatTpl"></ng-container>
          <ng-container *ngTemplateOutlet="carbTpl"></ng-container>
          <ng-container *ngTemplateOutlet="mineralTpl"></ng-container>
          <ng-container *ngTemplateOutlet="vimatinTpl"></ng-container>
        </span>

        <span fxLayout="column" fxFlex="50%">
          <ng-container *ngTemplateOutlet="balanceTpl"></ng-container>
          <ng-container *ngTemplateOutlet="sterolTpl"></ng-container>
          <ng-container *ngTemplateOutlet="otherTpl"></ng-container>
          <ng-container *ngTemplateOutlet="insufficientTpl"></ng-container>
          <ng-container *ngTemplateOutlet="excessTpl"></ng-container>
          <ng-container *ngTemplateOutlet="nutrLabel"></ng-container>
        </span>
      </div>
    </div>

    <!-- TEMPLATES -->

    <!-- Balanced Nutrition -->
    <ng-template #balanceTpl>
      <mat-expansion-panel class="mat-elevation-z2" expanded="true">
        <mat-expansion-panel-header>
          <mat-panel-title
            >Nutrition balance <span class="spacer"></span>Score:&nbsp;
            <b>56</b></mat-panel-title
          >
        </mat-expansion-panel-header>
        <br />
        <div class="wind-rose-wrapper">
          <cc-nutrient-wind-rose *ngIf="showChart"></cc-nutrient-wind-rose>
        </div>
      </mat-expansion-panel>
    </ng-template>

    <!-- Calories  -->
    <ng-template #caloriesTpl>
      <mat-expansion-panel class="mat-elevation-z2" expanded="true">
        <mat-expansion-panel-header>
          <mat-panel-title
            >Calories <span class="spacer"></span>
            {{ calories.quantity | number: numInfo }}&nbsp;<sub>{{
              calories.unit
            }}</sub></mat-panel-title
          >
        </mat-expansion-panel-header>
        <br />
        <div class="calories-chart-wrapper" *ngIf="nutrition?.calories">
          <cc-calories-chart
            *ngIf="showChart"
            [nutrition]="nutrition"
          ></cc-calories-chart>
        </div>
        <table cc-calories [nutrition]="nutrition"></table>
        <br />
      </mat-expansion-panel>
    </ng-template>

    <!-- Protein -->
    <ng-template #proteinTpl>
      <mat-expansion-panel class="mat-elevation-z2">
        <mat-expansion-panel-header>
          <mat-panel-title
            >Protein <span class="spacer"></span>
            {{ protein.quantity | number: numInfo }}&nbsp;<sub>{{
              protein.unit
            }}</sub></mat-panel-title
          >
        </mat-expansion-panel-header>
        <br />
        <table cc-protein [nutrition]="nutrition"></table>
      </mat-expansion-panel>
    </ng-template>

    <!-- Fats -->
    <ng-template #fatTpl>
      <mat-expansion-panel class="mat-elevation-z2">
        <mat-expansion-panel-header>
          <mat-panel-title
            >Fats <span class="spacer"></span>
            {{ fat.quantity | number: numInfo }}&nbsp;<sub>{{
              fat.unit
            }}</sub></mat-panel-title
          >
        </mat-expansion-panel-header>
        <br />
        <table cc-fats [nutrition]="nutrition"></table>
      </mat-expansion-panel>
    </ng-template>

    <!-- Carbs -->
    <ng-template #carbTpl>
      <mat-expansion-panel class="mat-elevation-z2">
        <mat-expansion-panel-header>
          <mat-panel-title
            >Carbohydrates <span class="spacer"></span>
            {{ carbohydrates.quantity | number: numInfo }}&nbsp;<sub>{{
              carbohydrates.unit
            }}</sub></mat-panel-title
          >
        </mat-expansion-panel-header>
        <br />
        <table cc-carbs [nutrition]="nutrition"></table>
      </mat-expansion-panel>
    </ng-template>

    <!-- Vitamins -->
    <ng-template #vimatinTpl>
      <mat-expansion-panel class="mat-elevation-z2">
        <mat-expansion-panel-header>
          <mat-panel-title>Vitamins</mat-panel-title>
        </mat-expansion-panel-header>
        <br />
        <table cc-vitamin [nutrition]="nutrition"></table>
      </mat-expansion-panel>
    </ng-template>

    <!-- Minerals -->
    <ng-template #mineralTpl>
      <mat-expansion-panel class="mat-elevation-z2">
        <mat-expansion-panel-header>
          <mat-panel-title>Minerals</mat-panel-title>
        </mat-expansion-panel-header>
        <br />
        <table cc-mineral [nutrition]="nutrition"></table>
      </mat-expansion-panel>
    </ng-template>

    <!-- Sterols -->
    <ng-template #sterolTpl>
      <mat-expansion-panel class="mat-elevation-z2">
        <mat-expansion-panel-header>
          <mat-panel-title>Sterols</mat-panel-title>
        </mat-expansion-panel-header>
        <br />
        <table cc-sterols [nutrition]="nutrition"></table>
      </mat-expansion-panel>
    </ng-template>

    <!-- Other -->
    <ng-template #otherTpl>
      <mat-expansion-panel class="mat-elevation-z2">
        <mat-expansion-panel-header>
          <mat-panel-title>Others</mat-panel-title>
        </mat-expansion-panel-header>
        <br />
        <table cc-other [nutrition]="nutrition"></table>
        <button routerLink="/nutrient/water">More Info</button>
      </mat-expansion-panel>
    </ng-template>

    <!-- Insufficient -->
    <ng-template #insufficientTpl>
      <mat-expansion-panel class="mat-elevation-z2">
        <mat-expansion-panel-header>
          <mat-panel-title>Insufficient</mat-panel-title>
        </mat-expansion-panel-header>
        <br />
        <table cc-insufficient [nutrition]="nutrition"></table>
      </mat-expansion-panel>
    </ng-template>

    <!-- Excess -->
    <ng-template #excessTpl>
      <mat-expansion-panel class="mat-elevation-z2">
        <mat-expansion-panel-header>
          <mat-panel-title>Excessive</mat-panel-title>
        </mat-expansion-panel-header>
        <br />
        <table cc-excess [nutrition]="nutrition"></table>
      </mat-expansion-panel>
    </ng-template>

    <!-- Ingredients -->
    <ng-template #ingredientsTpl>
      <ng-content select=".ingredients"></ng-content>
    </ng-template>

    <!-- Instructions -->
    <ng-template #instructionsTpl>
      <ng-content select=".instructions"></ng-content>
    </ng-template>

    <!-- Nutrition Label-->
    <ng-template #nutrLabel>
      <mat-expansion-panel class="nutrition-panel">
        <mat-expansion-panel-header>
          <mat-panel-title>Nutrition label</mat-panel-title>
        </mat-expansion-panel-header>
        <br />
        <cc-nutrition-label
          [portion]="portion"
          [nutrition]="nutrition"
        ></cc-nutrition-label>
      </mat-expansion-panel>
    </ng-template>
  `,
  styleUrls: ['./detail-panels.component.scss'],
})
export class DetailPanelsComponent implements OnInit {
  readonly numInfo = '1.1-1'

  readonly minPanelWidth = 700

  columns: 'one' | 'two' | 'three' = 'two'

  showChart: boolean = false
  enableEditiing: boolean = false

  // primaries: Primaries<Portion>
  calories!: Portion
  fat!: Portion
  carbohydrates!: Portion
  protein!: Portion

  @Input() portion!: Portion | null

  @Input() chartDelay: number = 0

  @Input() set width(width: number) {
    setTimeout(() => {
      if (width < this.minPanelWidth) this.columns = 'one'
      else if (width < this.minPanelWidth * 2) this.columns = 'two'
      else this.columns = 'three'
    })
  }

  private _nutrition!: Nutrition<number>
  @Input() set nutrition(nutrition: Nutrition<number>) {
    const units = NUTRIENTS.units
    this.calories = createPortion(units.calories || 'cal', nutrition.calories)
    this.fat = createPortion(units.fat || 'g', nutrition.fat)
    this.carbohydrates = createPortion(
      units.carbohydrates || 'g',
      nutrition.carbohydrates
    )
    this.protein = createPortion(units.protein || 'g', nutrition.protein)
    this._nutrition = Object.assign({}, ZERO_NUTRITION, nutrition)
  }
  get nutrition(): Nutrition<number> {
    return this._nutrition
  }

  ngOnInit(): void {
    setTimeout(() => (this.showChart = true), this.chartDelay)
  }
}
