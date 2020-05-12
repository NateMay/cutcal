import { Component } from '@angular/core'
import { AngularFireFunctions } from '@angular/fire/functions'
import { FirestoreService } from '@cutcal/common'
import { Observable } from 'rxjs'
import { first, switchMap, tap } from 'rxjs/operators'
import { GoogleService, WikiDetails } from '../google/google.service'
import { WikipediaService } from '../wikipedia/wikipedia.service'

@Component({
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {
  selected: WikiDetails

  description: string = 'Loading...'

  results$: Observable<WikiDetails[]>

  constructor(
    private readonly google: GoogleService,
    private readonly wiki: WikipediaService,
    private readonly fs: FirestoreService,
    private fns: AngularFireFunctions
  ) {}

  addFoodById(fdcId: string): void {
    const callable = this.fns.httpsCallable('addFood')
    callable({ fdcId })
      .pipe(first())
      .subscribe(console.log)
  }

  addFoodByQuery(queryString: string): void {
    this.results$ = this.google.getSearchResults(queryString)
    this.results$
      .pipe(
        tap((result: WikiDetails[]) => (this.selected = result[0])),
        switchMap(result => this.wiki.getDescription(result[0].link)),
        tap(desc => (this.description = desc.message)),
        first()
      )
      .subscribe()
  }
}
