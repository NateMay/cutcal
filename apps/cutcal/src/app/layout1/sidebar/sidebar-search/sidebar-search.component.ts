import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild
} from '@angular/core'

// example typeahead
// https://medium.com/@jon.rista/a-place-for-every-mapper-228f71e56f1b

// saveEntity$: Observable<Action> = this.actions$.pipe(
//   ofType<SaveEntity>(EntityActions.SAVE),
//   map(action => action.payload),
//   switchMap(entity => // May CANCEL critical operation!!
//       this.entityService.save(entity).pipe(
//           map(saved => new SaveEntitySuccess({saved})),
//           catchError(err => new SaveEntityFailure({err})
//   ))
// );

@Component({
  selector: 'ds-sidebar-search',
  templateUrl: './sidebar-search.component.html',
  styleUrls: ['./sidebar-search.component.scss']
})
export class SidebarSearchComponent implements OnInit {
  foods = [
    {
      name: 'bacon',
      description: 'Yummy Pig Strips',
      expanded: true
    },
    {
      name: 'eggs',
      description: 'Delicious Chicken Babies',
      expanded: false
    },
    {
      name: 'salad',
      description: 'Salubrious Plant Massacre',
      expanded: false
    },
    {
      name: 'potatos',
      description: 'Stachy Spuds',
      expanded: false
    },
    {
      name: 'Chicken Noodle Soup',
      description: 'Campbells Originl',
      expanded: false
    },
    {
      name: 'A much longer food name and more representative of the FDC names',
      description: 'Campbells Originl',
      expanded: false
    }
  ]

  searchAcivated = true

  @ViewChild('inputEl') inputEl!: ElementRef<HTMLInputElement>

  constructor() {}

  // @HostListener('document:keydown.escape')
  deactivateSearch(): void {
    this.searchAcivated = false
  }

  activateSearch(): void {
    this.searchAcivated = true
  }

  @HostListener('document:keydown.control.l')
  focusAndActiveSearch(): void {
    this.inputEl.nativeElement.focus()
    this.searchAcivated = true
  }

  ngOnInit(): void {}
}
