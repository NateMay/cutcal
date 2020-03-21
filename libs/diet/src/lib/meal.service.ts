import { Injectable } from '@angular/core'
import { DocumentReference } from '@angular/fire/firestore'
import { AngularFireFunctions } from '@angular/fire/functions'
import { AuthService } from '@cutcal/auth'
import { KVP, purifyObject } from '@cutcal/core'
import { FirestoreService, removeId, timestamp } from '@cutcal/fire'
import { multiplyNutrition, updateNutritions } from '@cutcal/nutrition'
import { find, flatten, isEmpty, keyBy, map as _map } from 'lodash'
import { combineLatest, Observable, of } from 'rxjs'
import { filter, first, map, share, switchMap } from 'rxjs/operators'
import { addPortion, scaleNutrition } from './convertNutrition/convertNutrition'
import { defaultMealName } from './deafultMealName'
import { Food } from './food'
import { createMeal, Meal } from './meal'
import { Tripple } from './tripple'
import { createUsage, DeleteUsagePayload, Usage } from './usage'

export type MealTripple = [Meal, KVP<Usage>, KVP<Food>]
export type MealsTripple = [KVP<Meal>, KVP<Usage>, KVP<Food>]

/**
 * A service used to interact with the firebase meals collection
 */
@Injectable({
  providedIn: 'root',
})
export class MealService {
  // TODO (env) consider providing these as a config object to toggle environments
  // TODO (firebase) rename collection after fixing analyze component
  mealCol: string = 'meals2'

  foodCol: string = 'foods2'

  constructor(
    private db: FirestoreService,
    // private storage: AngularFireStorage,
    private auth: AuthService,
    // https://github.com/angular/angularfire2/blob/master/docs/functions/functions.md
    private fns: AngularFireFunctions
  ) {}

  /**
   * @description Gets a single meal, all usages in its subcollection, and all associated foods
   * @example
   *   this.getMealUsagesFoods('4b4D3QkatPNFmbbe2XZw').subscribe(
   *     ([meal, usages, foods]: MealTripple) => {
   *       this.meal = meal;
   *       this.usages = usages;
   *       this.foods = foods;
   *     })
   */
  getMealUsagesFoods(mealId: string): Observable<MealTripple> {
    const meal$ = this.db.docWithId$<Meal>(`${this.mealCol}/${mealId}`)

    const usages$ = this.db
      .colWithIds$<Usage>(`${this.mealCol}/${mealId}/usages`)
      .pipe(map((usages: Usage[]) => keyBy(usages, '_id')))

    const foods$ = this.getFoodsFromUsages(usages$)

    return combineLatest(meal$, usages$, foods$).pipe(
      filter(tripple => this.invalidMappings(tripple))
    )
  }

  // this.db.colWithIds$(`parentCollection`).pipe(
  //   map(parentDocs => keyBy(parentDocs, '_id')),
  //   flatMap(parentDocs => combineLatest(_map(parentDocs, parent => this.db.docWithId$(`childDocs/${parent.childId}`))).pipe(
  //     map(childDocs => keyBy(childDocs, '_id')),
  //     map(childDocs => ({parentDocs, childDocs}))
  //   ))
  // );

  /**
   * @description Gets a meal range, all usages in their subcollection, and all associated foods
   * @returns Observable<[ KVP<Meal>, KVP<Usage>, KVP<Food> ]>
   * @example
   *   this.getMealRangeUsagesFoods(new Date(2019, 0, 1), new Date(2019, 0, 31)).subscribe(
   *     ([meals, usages, foods]: MealsTripple) => {
   *       this.meals = meals;
   *       this.usages = usages;
   *       this.foods = foods;
   *     })
   */
  getMealRangeUsagesFoods(
    startDate: Date,
    endDate: Date
  ): Observable<MealsTripple> {
    const meals$ = this.getMealRange(startDate, endDate)

    const usages$ = this.getUsagesFromMeals(meals$)

    const foods$ = this.getFoodsFromUsages(usages$)

    return combineLatest(meals$, usages$, foods$).pipe(
      filter(tripple => this.invalidMappings(tripple))
    )
  }

  /**
   * @description Gets an array of meals for a user inclusive to the date range provided
   * @param {Date} startDate
   * @param {Date} endDate
   * @returns {Observable<KVP<Meal>>}
   */
  getMealRange(startDate: Date, endDate: Date): Observable<KVP<Meal>> {
    return this.db
      .colWithIds$<Meal>(this.mealCol, ref =>
        ref
          .where('userId', '==', this.auth.activeUid)
          .where('timestamp', '>=', startDate.stripTime())
          .where('timestamp', '<=', endDate.endOfDay())
      )
      .pipe(
        map((meals: Meal[]) => keyBy(meals, '_id')),
        share()
      )
  }

  /**
   * @description Takes an observable for a meal map and gets the usage subcollections
   * @param {Observable<KVP<Meal>>} meals$
   * @returns {Observable<KVP<Usage>>}
   */
  getUsagesFromMeals(meals$: Observable<KVP<Meal>>): Observable<KVP<Usage>> {
    return meals$.pipe(
      switchMap(meals =>
        combineLatest(
          _map(meals, meal =>
            this.db.colWithIds$<Usage>(`${this.mealCol}/${meal._id}/usages`)
          )
        )
      ),
      map(us => flatten(us)),
      map(usages => keyBy(usages, '_id'))
    )
  }

  /**
   * @description Takes a usages map and gets the associated foods
   * @param {Observable<KVP<Usage>>} usages$
   * @returns {Observable<KVP<Food>>}
   */
  getFoodsFromUsages(usages$: Observable<KVP<Usage>>): Observable<KVP<Food>> {
    return usages$.pipe(
      switchMap(usages =>
        isEmpty(usages)
          ? of({})
          : combineLatest(
              _map(usages, usage =>
                this.db.docWithId$<Food>(`${this.foodCol}/${usage.foodId}`)
              )
            )
      ),
      map(foods => keyBy(foods, '_id'))
    )
  }

  /**
   * @description Gets a meal by its id
   * @param {string} id id of the target meal
   * @returns {Observable<Meal>}
   */
  getMealByID(id: string): Observable<Meal> {
    return this.db.docWithId$<Meal>(`${this.mealCol}/${id}`)
  }

  /**
   * @description Assigns the userID and saves to firebase
   * @param {Partial<Meal>} meal the meal to create
   * @returns {Promise<DocumentReference>}
   */
  createMeal(meal: Partial<Meal>): Promise<DocumentReference> {
    return this.db.add(
      this.mealCol,
      purifyObject(
        removeId({
          ...meal,
          userId: this.auth.activeUid,
        })
      )
    )
  }

  /**
   * @description Deletes a meal
   * @param {Meal} meal meal to delete
   * @returns {Promise<void>}
   */
  deleteMeal(meal: Meal): Promise<any> | never {
    if (!meal._id)
      throw Error(
        '[CutCal] Meal Service deleteMeal() DeleteMealPayload requires a meal._id'
      )
    const payload = { mealId: meal._id }
    return this.fns
      .httpsCallable('deleteMeal')(payload)
      .toPromise()
  }

  /**
   * @description Updates the timestamp corresponding to the mealtime
   * @param {string} mealId for the target meal
   * @param {Date} date new datetime for the meal
   * @returns {Promise<void>}
   */
  changeMealtime(mealId: string, date: Date): Promise<void> {
    return this.db.upsert(`${this.mealCol}/${mealId}`, {
      timestamp: timestamp(date),
    })
  }

  /**
   * @description Updates the name of a meal
   * @param {Meal} meal for the target meal
   * @param {string} name new name for the meal
   * @returns {Promise<void>}
   */
  changeName(meal: Meal, name: string): Promise<void> | never {
    if (!meal._id)
      throw Error(
        '[CutCal] Meal Service changeName() DeleteMealPayload requires a meal._id'
      )
    if (meal.name == name.trim()) return Promise.resolve()
    else
      return this.db.upsert(`${this.mealCol}/${meal._id}`, {
        name: name.trim(),
      })
  }

  /**
   * @description Updates the description of a meal
   * @param {Meal} meal for the target meal
   * @param {string} notes new description for the meal
   * @returns {Promise<void>}
   */
  changeNotes(meal: Meal, notes: string): Promise<void> | never {
    if (!meal._id)
      throw Error(
        '[CutCal] Meal Service changeNotes() DeleteMealPayload requires a meal._id'
      )
    if (meal.notes == notes.trim()) return Promise.resolve()
    else
      return this.db.upsert(`${this.mealCol}/${meal._id}`, {
        description: notes.trim(),
      })
  }

  /**
   * @description Updates the timestamp corresponding to the mealtime
   * @param {Meal} meal
   * @param {Usage} usage
   * @param {Food} food
   * @param {string} unit
   * @param {number} quantity
   * @returns {Promise<void>}
   */
  changePortion(
    meal: Meal,
    usage: Usage,
    food: Food,
    unit: string,
    quantity: number
  ): Promise<any> | never {
    if (!meal._id)
      throw Error(
        '[CutCal] Meal Service changePortion() DeleteMealPayload requires a meal._id'
      )
    const adjustedUsage = { ...usage, unit, quantity }

    // adjust meal nutrition
    const substracted = updateNutritions(
      'subtract',
      meal.nutrition,
      scaleNutrition(usage, food)
    )
    const added = updateNutritions(
      'add',
      substracted,
      scaleNutrition(adjustedUsage, food)
    )

    // update the meal nutrition and the usage portion
    const mealNutritionPromise = this.db.upsert(`${this.mealCol}/${meal._id}`, {
      nutrition: added,
    })
    const usagePromise = this.db.upsert(
      `${this.mealCol}/${meal._id}/usages/${usage._id}`,
      adjustedUsage
    )

    return Promise.all([usagePromise, mealNutritionPromise])
  }

  /**
   * @description Adds a Usage to the meal subcollection or increments an existing usage of the same food
   * @param {Meal} meal
   * @param {Usage} usage
   */

  async addUsage(
    food: Food,
    meal: Meal,
    usages?: KVP<Usage>
  ): Promise<any> | never {
    if (!meal._id)
      throw Error(
        '[CutCal] Meal Service addUsage() requires a meal with a meal_id'
      )

    usages = usages || keyBy(await this.getUsages(meal._id), '_id')

    const { unit, quantity } = food.defaultPortion

    // If the food exists, just increment it
    const existing: Usage | undefined = find(
      usages,
      usage => usage.foodId == food._id
    )
    if (existing)
      return this.changePortion(
        meal,
        existing,
        food,
        unit,
        addPortion({ unit, quantity }).to(existing)
      )

    // Otherwise, create a new Usage
    const newUsage: Usage = createUsage(
      unit,
      quantity,
      food._id,
      meal._id,
      meal._id,
      this.auth.activeUid
    )

    // And adjust the meal nutrition
    const mealNutritionPromise = this.db.upsert(`${this.mealCol}/${meal._id}`, {
      nutrition: updateNutritions(
        'add',
        meal.nutrition,
        scaleNutrition(newUsage, food)
      ),
    })

    const usagePromise = this.db.add(
      `${this.mealCol}/${meal._id}/usages`,
      removeId(newUsage)
    )

    return Promise.all([usagePromise, mealNutritionPromise])
  }

  getUsages(mealId: string): Promise<Usage[]> {
    return this.db
      .colWithIds$<Usage>(`${this.mealCol}/${mealId}/usages`)
      .pipe(first())
      .toPromise()
  }

  async createMealAddUsage(food: Food, date: Date): Promise<any> | never {
    const { unit, quantity } = food.defaultPortion

    if (!food.nutrition)
      throw Error(
        '[CutCal] MealService createMealAddUsage() requires a food with a nutrition Object'
      )

    const newMeal = createMeal(
      defaultMealName(date),
      timestamp(date),
      multiplyNutrition(
        food.nutrition,
        quantity * food.portions[unit].quantity
      ),
      '',
      [],
      {},
      this.auth.activeUid
    )
    const mealRef = await this.createMeal(newMeal)
    const newUsage: Usage = createUsage(
      unit,
      quantity,
      food._id,
      mealRef.id,
      mealRef.id,
      this.auth.activeUid
    )

    return this.db.add(
      `${this.mealCol}/${mealRef.id}/usages`,
      removeId(newUsage)
    )
  }

  deleteUsage(payload: DeleteUsagePayload): Promise<any> {
    return this.fns
      .httpsCallable('deleteUsage')(payload)
      .toPromise()
  }

  /**
   * @description Protects from race condition where a food is not yet referenced properly
   * @param {Tripple} : MealTripple or MealsTripple
   */
  invalidMappings([, usages, foods]: Tripple): boolean {
    return !_map(usages, usage => foods[usage.foodId]).some(food => !food)
  }

  // move this into a calendar service
  // getMonthData(date: Date): Observable<MonthCalendar> | never {
  //   const calendar: Date[] = getFullCalendar(date)

  //   const last: Date | undefined = _.last(calendar)

  //   if (!last) throw Error('[CutCal] getMonthData() has no last date')

  //   return this.getMealRange(calendar[0], last.endOfDay()).pipe(
  //     map(meals => createCalendar(date, meals)),
  //     shareReplay()
  //   )
  // }
}
