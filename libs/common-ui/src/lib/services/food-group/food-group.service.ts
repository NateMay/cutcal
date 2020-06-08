import { Injectable } from '@angular/core'
import { FOOD_GROUPS } from '@cutcal/diet'
import { BehaviorSubject } from 'rxjs'

// FEATURE (food-groups) implement with https://material.angular.io/components/chips/overview
@Injectable({
  providedIn: 'root'
})
export class FoodGroupSvc {
  private _foodGroups = new BehaviorSubject<string[]>(FOOD_GROUPS)

  get foodGroups(): string[] {
    return this._foodGroups.getValue()
  }

  constructor() {}
}
