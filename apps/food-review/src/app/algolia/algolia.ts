import { Component, OnInit } from '@angular/core'
import { InstantSearchConfig } from 'angular-instantsearch/instantsearch/instantsearch'

@Component({
  templateUrl: './algolia.html',
  styleUrls: ['./algolia.scss']
})
export class AlgoliaComponent implements OnInit {
  config: InstantSearchConfig = {
    apiKey: 'a1cc78476d92b73185b46aa3121db228',
    appId: 'OB2L36C5AS',
    indexName: 'dev_CUTCAL',
    routing: false
  }

  sortItems = [
    { name: 'instant_search', label: 'Most relevant' },
    { name: 'instant_search_price_asc', label: 'Lowest price' },
    { name: 'instant_search_price_desc', label: 'Highest price' }
  ]

  constructor() {}

  ngOnInit(): void {}
}
