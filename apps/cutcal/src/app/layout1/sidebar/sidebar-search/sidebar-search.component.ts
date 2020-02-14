import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core'

@Component({
  selector: 'cc-sidebar-search',
  templateUrl: './sidebar-search.component.html',
  styleUrls: ['./sidebar-search.component.scss'],
})
export class SidebarSearchComponent implements OnInit {
  foods = [
    {
      name: 'bacon',
      description: 'Yummy Pig Strips',
      expanded: true,
    },
    {
      name: 'eggs',
      description: 'Delicious Chicken Babies',
      expanded: false,
    },
    {
      name: 'salad',
      description: 'Salubrious Plant Massacre',
      expanded: false,
    },
    {
      name: 'potatos',
      description: 'Stachy Spuds',
      expanded: false,
    },
    {
      name: 'Chicken Noodle Soup',
      description: 'Campbells Originl',
      expanded: false,
    },
    {
      name: 'A much longer food name and more representative of the FDC names',
      description: 'Campbells Originl',
      expanded: false,
    },
  ]

  searchAcivated = true

  @ViewChild('inputEl') inputEl!: ElementRef

  // @HostListener('document:keydown.escape')
  deactivateSearch() {
    this.searchAcivated = false
  }

  activateSearch() {
    this.searchAcivated = true
  }

  @HostListener('document:keydown.control.l')
  focusAndActiveSearch() {
    this.inputEl.nativeElement.focus()
    this.searchAcivated = true
  }

  constructor() {}

  ngOnInit() {}
}
