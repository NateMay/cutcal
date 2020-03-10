import { Component } from '@angular/core'
import { Observable } from 'rxjs'
import { first, switchMap, tap } from 'rxjs/operators'
import { GoogleService, WikiDetails } from './google/google.service'
import { WikipediaService } from './wikipedia/wikipedia.service'

@Component({
  selector: 'cc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  selected: WikiDetails

  description: string = 'Loading...'

  results$: Observable<WikiDetails[]>

  constructor(
    private google: GoogleService,
    private wiki: WikipediaService
  ) {
    this.search('avocado')
  }

  search(term: string): void {
    this.results$ = this.google.getSearchResults(term)
    this.results$
      .pipe(
        // tap(console.log),
        tap((result: WikiDetails[]) => (this.selected = result[0])),
        switchMap(result => this.wiki.getDescription(result[0].link)),
        tap(desc => this.description = desc.message),
        first()
      )
      .subscribe()
  }

}
