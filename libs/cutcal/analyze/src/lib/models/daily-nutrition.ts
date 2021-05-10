import { Meal } from '@cutcal/diet'
import { Nutrition, sumNutritions } from '@cutcal/nutrition'
import { flatMap } from 'lodash'

export class DailyNutrition {
  date: Date
  nutrition: Nutrition<number>
  meals: Meal[]
  dateString: string

  constructor(meals: Meal[]) {
    this.meals = meals
    this.date = meals[0].timestamp.toDate().stripTime()
    this.dateString = this.date.toUrlString()
    this.nutrition = sumNutritions(flatMap(meals, (meal) => meal.nutrition))
  }
}
