import * as _ from 'lodash'
import { sumNutritions } from '../../shared/functions/sumNutritions/sumNutritions'
import { Meal } from '../../shared/models/meal'
import { Nutrition } from '../../shared/models/nutrition'

export class DailyNutrition {
  date: Date
  nutrition: Nutrition<number>
  meals: Meal[]
  dateString: string

  constructor(meals: Meal[]) {
    this.meals = meals
    this.date = meals[0].timestamp.toDate().stripTime()
    this.dateString = this.date.toUrlString()
    this.nutrition = sumNutritions(_.flatMap(meals, meal => meal.nutrition))
  }
}
