import { Component, OnInit } from '@angular/core'
import { InstantSearchConfig } from 'angular-instantsearch/instantsearch/instantsearch'

@Component({
  templateUrl: './algolia.html',
  styleUrls: ['./algolia.scss']
})
export class AlgoliaComponent implements OnInit {
  config: InstantSearchConfig = {
    apiKey: '6be0576ff61c053d5f9a3225e2a90f76',
    appId: 'latency',
    indexName: 'instant_search',
    routing: true
  }

  sortItems = [
    { name: 'instant_search', label: 'Most relevant' },
    { name: 'instant_search_price_asc', label: 'Lowest price' },
    { name: 'instant_search_price_desc', label: 'Highest price' }
  ]

  constructor() {}

  ngOnInit(): void {}
}
