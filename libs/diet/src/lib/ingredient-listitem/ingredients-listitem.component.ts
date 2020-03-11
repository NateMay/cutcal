import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  isDevMode,
  Output,
} from '@angular/core'
import { MatSliderChange } from '@angular/material/slider'
import { Router } from '@angular/router'
import { getQuantityStep } from '@cutcal/common'
import { Food, isFood } from './../food'
import { Ingredient } from './../ingredient'
import { isMeal, Meal } from './../meal'
import { Portion } from './../portion'
import { Usage } from './../usage'
import { IngredientPortionChange } from './ingredientPortionChange'

// FEATURE (ingredient-listitem) make the edit panel a modal

export interface DeleteIngredientPayload {
  rootId: string
  usageId: string
}

@Component({
  selector: 'li[cc-ingredient-listitem],cc-ingredient-listitem',
  host: { class: 'cc-ingredients-listitem' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./ingredients-listitem.component.scss'],
  template: `
    <span fxLayout="row" [drag]="usage">
      <button (click)="goToItem()">
        <div fxLayout="row" fxLayoutGap="12px">
          <img
            [attr.src]="food?.primaryImage?.url || basicImage"
            [attr.alt]="food.name"
            style="height: 32px;"
          />
          <div fxLayout="column" class="text-wrapper">
            <div class="text">{{ food.name }}</div>
            <div class="portion">
              {{ usage.quantity }}
              {{ usage.unit | unit | plural: usage.quantity }}
            </div>
          </div>
        </div>
      </button>

      <button
        mat-icon-button
        style="width: 40px"
        (click)="showing = !showing"
        aria-label="edit portion"
      >
        <mat-icon style="margin-top: -16px;">edit</mat-icon>
      </button>
    </span>

    <div fxLayout="column" class="editor" *ngIf="showing">
      <div fxLayout="row" fxLayoutGap="24px" style="padding: 0 8px;">
        <mat-form-field fxFlex="50">
          <mat-label>Quantity</mat-label>
          <input
            type="number"
            placeholder="1.25"
            [(ngModel)]="quantity"
            aria-label="Quantity"
            matInput
          />
        </mat-form-field>

        <mat-form-field fxFlex="50">
          <mat-label>Unit</mat-label>
          <mat-select [(value)]="unit">
            <mat-option
              *ngFor="let amt of food.portions | keyvalue"
              [value]="amt.unit"
            >
              {{ amt.unit }}
            </mat-option>
          </mat-select>
        </mat-form-field>
      </div>

      <div fxLayout="row" fxLayoutGap="24px">
        <mat-slider
          fxFlex="60"
          [max]="max"
          [min]="min"
          [step]="step"
          [thumbLabel]="quantity"
          [value]="quantity"
          (change)="onSliderChange($event)"
        >
        </mat-slider>

        <button
          mat-button
          class="save-button"
          fxFlex="20"
          (click)="updatePortion()"
        >
          Save
        </button>

        <button
          fxFlex="20"
          mat-icon-button
          color="red"
          (click)="delete()"
          aria-label="Delete Ingredient"
        >
          <mat-icon>delete</mat-icon>
        </button>
      </div>
    </div>
  `,
})
export class IngredientsListitemComponent {
  // TODO (listitem) add other portion that this can be converted to

  readonly basicImage = '../../../../assets/svgs/meal.svg'

  usage!: Usage
  food!: Food
  step!: number
  min: number = 0
  max!: number
  quantity!: number
  unit!: string
  showing: boolean = false

  portions: Portion[]

  private _root: Meal | Food

  @Input() set root(root: Meal | Food) {
    this._root = root
  }
  get root(): Meal | Food {
    return this._root
  }

  @Input() set ingredient(ingredient: Ingredient) {
    if (!ingredient) return
    this.usage = ingredient.usage
    this.food = ingredient.food
    // const x = getAlternatePortion(this.usage);
    this.unit = this.usage.unit || this.food.defaultPortion.unit
    this.updateLocalQuantity(
      this.usage.quantity || this.food.defaultPortion.quantity
    )
  }

  @Output() portionChange = new EventEmitter<IngredientPortionChange>()
  @Output() deleteUsage = new EventEmitter<DeleteIngredientPayload>()

  constructor(private router: Router) {}

  goToItem(): void {
    if (isFood(this.root)) this.router.navigate(['food', this.food._id])
    else if (isMeal(this.root))
      this.router.navigate([
        'meal',
        this.usage.rootId,
        'ingredient',
        this.usage._id,
      ])
    else if (isDevMode())
      console.warn(
        '"cc-ingredient-listitem" requires property "rootIs" to be set for routing to work'
      )
  }

  onSliderChange(change: MatSliderChange): void {
    this.updateLocalQuantity(change.value || 1)
  }

  updateLocalQuantity(quantity: number): void {
    this.quantity = quantity
    this.max = this.quantity * 2
    this.step = getQuantityStep(this.quantity)
  }

  updatePortion(): void {
    this.portionChange.emit({
      usage: this.usage,
      food: this.food,
      unit: this.unit,
      quantity: this.quantity,
    })
  }

  delete(): void {
    this.deleteUsage.emit({
      rootId: this.root._id,
      usageId: this.usage._id,
    })
  }
}
