import { Component } from '@angular/core'
import { AngularFireFunctions } from '@angular/fire/functions'
import { FdcService } from '@cutcal/fdc'
import { FirestoreService } from '@cutcal/fire'
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
    private readonly fdc: FdcService,
    private readonly fs: FirestoreService,
    private fns: AngularFireFunctions
  ) {
    this.search('avocado')
    // this.fdc.queryFood('avocado').subscribe(console.log)
    // this.fs.docWithId$('test/JByoHEmRhXbqWl0TVSaP').subscribe(console.log)

    const callable = fns.httpsCallable('addFood')
    callable({ fdcId: '1' }).subscribe(console.log)
  }

  search(term: string): void {
    this.results$ = this.google.getSearchResults(term)
    this.results$
      .pipe(
        // tap(console.log),
        tap((result: WikiDetails[]) => (this.selected = result[0])),
        switchMap(result => this.wiki.getDescription(result[0].link)),
        tap(desc => (this.description = desc.message)),
        first()
      )
      .subscribe()
  }
}
