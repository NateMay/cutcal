import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

// DISTANT (grocery) multi select
/**
 * {@link https://netbasal.com/implement-multiple-selection-using-shift-click-in-angular-8e5551424f7b Netanel Basal}
 */

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
    ]),
  ],
})
export class GroceryPantryModule {}
