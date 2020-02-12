import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

// FEATURE (storage)

@Component({
  selector: 'cc-storage',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./storage.component.scss'],
  host: {'class': 'cc-storage'},
  template: `
  <mat-accordion multi="true">

    <mat-expansion-panel>
      <mat-expansion-panel-header>
        <mat-panel-title>
          <mat-icon svgIcon="scratch"></mat-icon>
          <b>Scratch Pad</b>
        </mat-panel-title>
      </mat-expansion-panel-header>
      <div class="item" *ngFor="let grocery of groceries">{{ grocery }}</div>
      <a routerLink="/pantry">Full Scratch Pad</a>
    </mat-expansion-panel>

    <mat-expansion-panel>
      <mat-expansion-panel-header>
        <mat-panel-title>
          <mat-icon svgIcon="grocery"></mat-icon>
          <b>Grocery List</b>
        </mat-panel-title>
      </mat-expansion-panel-header>
      <div class="item" *ngFor="let grocery of groceries">{{ grocery }}</div>
      <a routerLink="/grocery-list">Full Grocery List</a>
    </mat-expansion-panel>

    <mat-expansion-panel>
      <mat-expansion-panel-header>
        <mat-panel-title>
          <mat-icon svgIcon="fridge"></mat-icon>
          <b>In The Kitchen</b>
        </mat-panel-title>
      </mat-expansion-panel-header>
      <div class="item" *ngFor="let grocery of groceries">{{ grocery }}</div>
      <a routerLink="/pantry">Full Pantry</a>
    </mat-expansion-panel>

  </mat-accordion>
  `
})
export class StorageComponent {

  groceries = [
    'Eggs',
    'Bacon',
    'Potatoes'
  ]

  constructor(
    private matIconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    this.matIconRegistry
      .addSvgIcon('grocery', this.clean('../../../../assets/svgs/groceries.svg'))
      .addSvgIcon('fridge', this.clean('../../../../assets/svgs/fridge.svg'))
      .addSvgIcon('scratch', this.clean('../../../../assets/svgs/scratch.svg'))
  }

  clean(path: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(path);
  }

}
