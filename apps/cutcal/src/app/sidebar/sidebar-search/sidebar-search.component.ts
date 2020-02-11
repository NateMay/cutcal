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
    },
    {
      name: 'eggs',
      description: 'Delicious Chicken Babies',
    },
    {
      name: 'salad',
      description: 'Salubrious Plant Massacre',
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
