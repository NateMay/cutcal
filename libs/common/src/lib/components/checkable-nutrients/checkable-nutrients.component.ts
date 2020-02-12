import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import * as _ from 'lodash';
import { getNutritionParts, NutritionParts } from '../../functions/getNutritionParts';
import { NutrCheckable } from '../../models/nutr-checkable';
import { Nutrition } from '../../models/nutrition';

export interface CheckableNutrientsChange {
  nutrCheckables: Nutrition<NutrCheckable>;
  nutrGroupCheckables: NutritionParts<NutrCheckable>;
}

interface TemplateData {
  label: string;
  key: string; // corresponds to the NutritionParts property name
  children?: TemplateData[]
}

function createData(label: string, key: string, children?: TemplateData[]): TemplateData {
  return { label, key, children }
}

 /**
  * List of checkboxes to toggle selected nutrients
  */
@Component({
  selector: 'cc-checkable-nutrients',
  styleUrls: ['./checkable-nutrients.component.scss'],
  template: `

    <!-- Root Iterator -->
    <ng-container *ngFor="let parent of templateData; first as isFirst">

      <ng-container
        #parentData
        [ngTemplateOutlet]="parentPanel"
        [ngTemplateOutletContext]="{
          label: parent.label,
          key: parent.key,
          self: parentData,
          isOpen: isFirst
        }">
      </ng-container>

      <ng-container *ngIf="parent.children && parentData.isOpen">
        <ng-container
          *ngFor="let child of parent.children"
          [ngTemplateOutlet]="childPanel"
          [ngTemplateOutletContext]="{label: child.label, key: child.key}"
        ></ng-container>
        <br><br>
      </ng-container>

    </ng-container>


    <!-- Parent Panel Template -->
    <ng-template #parentPanel
      let-label="label"
      let-key="key"
      let-isOpen="isOpen"
      let-self="self"
      >
      <mat-expansion-panel
        class="parent-panel"
        [expanded]="isOpen || false"
        (opened)="(self ? self.isOpen = true : null)"
        (closed)="(self ? self.isOpen = false: null)">

        <mat-expansion-panel-header collapsedHeight="42px">
          <mat-panel-title class="parent-title">{{ label }}</mat-panel-title>
        </mat-expansion-panel-header>

        <ng-container
          [ngTemplateOutlet]="checkableList"
          [ngTemplateOutletContext]="{ checkables: nutrGroupCheckables[key] }"
        ></ng-container>

      </mat-expansion-panel>
    </ng-template>


    <!-- Child Panel Template -->
    <ng-template #childPanel let-label="label" let-key="key">
      <mat-expansion-panel>

        <mat-expansion-panel-header collapsedHeight="36px">
          <mat-panel-title>{{ label }}</mat-panel-title>
        </mat-expansion-panel-header>

        <ng-container
          [ngTemplateOutlet]="checkableList"
          [ngTemplateOutletContext]="{ checkables: nutrGroupCheckables[key] }"
        ></ng-container>

      </mat-expansion-panel>
    </ng-template>


    <!-- Checkboxes template -->
    <ng-template #checkableList let-checkables="checkables">
      <ng-container *ngFor="let nutrient of checkables | coll">
        <span fxLayout="column">

          <mat-checkbox
            [checked]="nutrient.isChecked"
            (change)="selectionChange($event, nutrient)">
            {{ nutrient.label }}<small *ngIf="nutrient.unit">&nbsp;({{ nutrient.unit }})</small>
          </mat-checkbox>

        </span>
      </ng-container>
    </ng-template>
  `
})
export class CheckableNutrientsComponent {

  templateData: TemplateData[] = [
    createData('Energy', 'energy'),

    createData('Charbohydrates', 'carbBase', [
      createData('Sugars', 'sugars')
    ]),

    createData('Protein', 'proteinBase', [
      createData('Amino Acids', 'aminoAcids')
    ]),

    createData('Fats', 'fatBase', [
      createData('Saturated Fats', 'satFat'),
      createData('Polyunsaturated Fats', 'polyFat'),
      createData('Monounsaturated Fats', 'monoFat'),
      createData('Transunsaturated Fats', 'transFat')
    ]),

    createData('Vitamins', 'vitaminBase', [
      createData('Vitamin A', 'vit_A'),
      createData('Vitamin D', 'vit_D'),
      createData('Vitamin E', 'vit_E'),
      createData('Folate', 'folate')
    ]),

    createData('Minerals', 'minerals'),
    createData('Sterols', 'sterols'),
    createData('Other', 'others')
  ]

  @Output() change = new EventEmitter<NutrCheckable>();


  // Data Structures for Checkables
  nutrGroupCheckables: NutritionParts<NutrCheckable>;

  private _nutrCheckables: Nutrition<NutrCheckable>
  @Input() set nutrCheckables(nutrCheckables: Nutrition<NutrCheckable>) {
    if (_.isEqual(this.nutrCheckables, nutrCheckables)) return;
    this.updateDataStructures( nutrCheckables, getNutritionParts(nutrCheckables) );
  }
  get nutrCheckables(): Nutrition<NutrCheckable> {
    return this._nutrCheckables;
  }
  @Output() nutrCheckablesChange = new EventEmitter<Nutrition<NutrCheckable>>();


  updateDataStructures(
    nutrCheckables: Nutrition<NutrCheckable>,
    nutrGroupCheckables?: NutritionParts<NutrCheckable>
  ) {
    if (!_.isEqual(this.nutrCheckables, nutrCheckables)) {
      this._nutrCheckables = nutrCheckables;
    }
    if (!_.isEqual(this.nutrGroupCheckables, nutrGroupCheckables)) {
      this.nutrGroupCheckables = nutrGroupCheckables || getNutritionParts(nutrCheckables);
    }
  }


  selectionChange(change: MatCheckboxChange, item: NutrCheckable): void {
    item.isChecked = change.checked;
    this.change.emit(item);
  }

}
