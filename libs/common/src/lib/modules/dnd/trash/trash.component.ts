import { Component, HostBinding } from '@angular/core';
import { isUsage } from '../../../models';
import { isMeal, Meal } from '../../../models/meal';
import { Usage } from '../../../models/usage';
import { MealService } from '../../../services/meal/meal.service';
import { DndPayload } from '../dnd.payload';
import { DndSvc } from '../dnd.service';

@Component({
  selector: 'cc-trash',
  template: `
    <div class="trash"
      [drop]="null"
      (onDrop)="deleteItemm($event)">
      <span></span>
      <i></i>
    </div>
    <div class="text">Drop Here to Delete</div>
  `,
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent {

  @HostBinding('style.left.px') left: number;

  constructor(
    private mealSvc: MealService,
    private dndSvc: DndSvc
  ) {
    this.dndSvc.showTrash$.subscribe(showTrash => {
      this.left = showTrash ? 20 : -220
    })
  }

  deleteItemm({ drag, drop }: DndPayload<Meal | Usage, any>): any {
    if (isMeal(drag)) return this.mealSvc.deleteMeal(<Meal>drag);
    else if (isUsage(drag)) {
      const usage = <Usage>drag;
      return this.mealSvc.deleteUsage({mealId: usage.rootId, usageId: usage._id});
    }
  }

}
