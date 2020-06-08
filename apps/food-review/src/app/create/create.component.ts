import { Component } from '@angular/core'
import { AngularFireFunctions } from '@angular/fire/functions'
import { AddFoodReponse, AddFoodRequest } from '@cutcal/api-interfaces'
import { FirestoreService } from '@cutcal/common-ui'
import { forEach } from 'lodash'
import { Observable } from 'rxjs'
import { first, switchMap, tap } from 'rxjs/operators'
import { GoogleService, WikiDetails } from '../google/google.service'
import { WikipediaService } from '../wikipedia/wikipedia.service'
import { FDC_IDS } from './seed-fdc-foods'

@Component({
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {
  selected: WikiDetails

  description: string = 'Loading...'

  results$: Observable<WikiDetails[]>

  response: AddFoodReponse

  constructor(
    private readonly google: GoogleService,
    private readonly wiki: WikipediaService,
    private readonly fs: FirestoreService,
    private fns: AngularFireFunctions
  ) {}

  addFoodById(fdcId: string): void {
    const callable = this.fns.httpsCallable<AddFoodRequest, AddFoodReponse>(
      'addFood'
    )

    callable({ fdcId })
      .pipe(
        first(),
        tap(response => (this.response = response))
      )
      .subscribe()
  }

  seed() {
    const callable = this.fns.httpsCallable<AddFoodRequest, AddFoodReponse>(
      'addFood'
    )
    forEach(FDC_IDS, (fdcId: string) => {
      console.log(fdcId)
      callable({ fdcId })
        .pipe(first())
        .subscribe()
    })
  }

  addFoodByQuery(queryString: string): void {
    this.results$ = this.google.getSearchResults(queryString)
    this.results$
      .pipe(
        tap((result: WikiDetails[]) => (this.selected = result[0])),
        switchMap(result => this.wiki.getDescription(result[0].link)),
        tap(desc => (this.description = desc.description)),
        first()
      )
      .subscribe()
  }
}
