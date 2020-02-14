import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { FOOD_GROUPS } from '../../../../../../data/food-groups'

// FEATURE (food-groups) implement with https://material.angular.io/components/chips/overview
@Injectable({
  providedIn: 'root',
})
export class FoodGroupSvc {
  _foodGroups = new BehaviorSubject<string[]>(FOOD_GROUPS)

  get foodGroups(): string[] {
    return this._foodGroups.getValue()
  }

  constructor() {}
}
