import { Injectable } from '@angular/core'
import { AngularFirestoreDocument } from '@angular/fire/firestore'
import { AngularFireStorage } from '@angular/fire/storage'
import { UploadMetadata } from '@angular/fire/storage/interfaces'
import * as firebase from 'firebase/app'
import * as _ from 'lodash'
import { combineLatest, Observable, of } from 'rxjs'
import { filter, finalize, flatMap, map } from 'rxjs/operators'
import { AuthService } from '../../../auth/auth.service'
import { uniqueID } from '../../functions'
import { createUsage } from '../../functions/createUsage'
import { Recipe } from '../../models'
import { Food } from '../../models/food'
import { KVP } from '../../models/key-value-pair'
import { Tripple } from '../../models/tripple'
import { Usage } from '../../models/usage'
import { FirestoreService } from '../fireStore/fireStore.service'

export type FoodTripple = [Food, KVP<Usage>, KVP<Food>]

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  // TODO (env) consider providing this as a config object to toggle environments
  // TODO (firebase) rename collection after fixing analyze component
  foodCol: string = 'foods2'

  uploadPercent$: Observable<number | undefined>
  downloadURL: Observable<string>

  constructor(
    private db: FirestoreService,
    private auth: AuthService,
    private storage: AngularFireStorage
  ) {}

  /**
   * Gets a single food, all usages in its subcollection, and all associated foods
   * @example
   *   this.getFoodUsagesFoods('4b4D3QkatPNFmbbe2XZw').subscribe(
   *     ([food, usages, foods]: FoodTripple) => {
   *       this.food = food;
   *       this.usages = usages;
   *       this.foods = foods;
   *     })
   */
  getFoodUsagesFoods(foodId: string): Observable<FoodTripple> {
    const food$ = this.db.docWithId$<Food>(`${this.foodCol}/${foodId}`)

    const usages$ = this.db
      .colWithIds$<Usage>(`${this.foodCol}/${foodId}/usages`)
      .pipe(map(usages => _.keyBy(usages, '_id')))

    const foods$ = this.getFoodsFromUsages(usages$)

    return combineLatest(food$, usages$, foods$).pipe(
      filter(this.invalidMappings)
    )
  }

  /**
   * Takes a usages map and gets the associated foods
   * @param {Observable<KVP<Usage>>} usages$
   * @returns {Observable<KVP<Food>>}
   */
  getFoodsFromUsages(usages$: Observable<KVP<Usage>>): Observable<KVP<Food>> {
    return usages$.pipe(
      flatMap(usages =>
        _.isEmpty(usages)
          ? of({})
          : combineLatest(
              _.map(usages, usage =>
                this.db.docWithId$<Food>(`${this.foodCol}/${usage.foodId}`)
              )
            )
      ),
      map(foods => _.keyBy(foods, '_id'))
    )
  }

  getRef(food: Food): firebase.firestore.DocumentReference {
    return this.db.doc<AngularFirestoreDocument<Food>>(`foods2/${food._id}`).ref
  }

  getFoodByID(id: string): Observable<Food> {
    return this.db.docWithId$<Food>(`foods/${id}`)
  }

  createUsageFromFood(food: Food, parentId: string, rootId?: string): Usage {
    const { unit, quantity } = food.defaultPortion
    return createUsage(
      unit,
      quantity,
      food._id,
      parentId,
      rootId || parentId,
      this.auth.activeUid,
      uniqueID()
    )
  }

  createRecipe(recipe: Recipe, image: File) {
    // TODO (recipe) (cloud-function)
    // const knownUsages = _.map(recipe.ingredients, ingredient => ingredient.usage);
    // const embeddedUsages =
    // combineLatest(
    //   _.map(recipe.ingredients.map(ingredient => ingredient.food), food => )
    // )
    // this.db.colWithIds$(`${this.foodCol}`)
  }

  /**
   * Protects from race condition where a food is not yet referenced properly
   * @param {Tripple} : MealTripple or MealsTripple
   */
  invalidMappings([X, usages, foods]: Tripple): boolean {
    return !_.map(usages, usage => foods[usage.foodId]).some(food => !food)
  }

  newFoodImage(event: any, food: Food, uploaderId: string): void {
    this.newFoodImageFile(event.target.files[0], food, uploaderId)
  }

  newFoodImageFile(file: File, food: Food, uploaderId: string) {
    const filePath = `foods/${food._id}/${uniqueID()}.${file.name.extension()}`

    const metaData: UploadMetadata = {
      customMetadata: {
        uploaderId,
        uploadDate: new Date().toString(),
      },
    }

    const task = this.storage.upload(filePath, file, metaData)

    // observe percentage changes
    this.uploadPercent$ = task.percentageChanges()
    // get notified when the download URL is available
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = this.storage.ref(filePath).getDownloadURL()
          // TODO (images) (food) update the food images list
        })
      )
      .subscribe()
  }
}
