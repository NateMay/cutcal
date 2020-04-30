import { Component, HostBinding } from '@angular/core'
import { isMeal, isUsage, Meal, MealService, Usage } from '@cutcal/diet'
import { DndPayload } from '../../modules/dnd/dnd.payload'
import { DndSvc } from '../../modules/dnd/dnd.service'

@Component({
  selector: 'cc-trash',
  template: `
    <div class="trash" [drop]="null" (onDrop)="deleteItemm($event)">
      <span></span>
      <i></i>
    </div>
    <div class="text">Drop Here to Delete</div>
  `,
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent {
  @HostBinding('style.left.px') left: number

  constructor(
    private readonly mealSvc: MealService,
    private readonly dndSvc: DndSvc
  ) {
    this.dndSvc.showTrash$.subscribe(showTrash => {
      this.left = showTrash ? 20 : -220
    })
  }

  deleteItemm({ drag, drop }: DndPayload<Meal | Usage, any>): any {
    if (isMeal(drag)) return this.mealSvc.deleteMeal(<Meal>drag)
    else if (isUsage(drag)) {
      const usage = <Usage>drag
      return this.mealSvc.deleteUsage({
        mealId: usage.rootId,
        usageId: usage._id
      })
    }
  }
}
