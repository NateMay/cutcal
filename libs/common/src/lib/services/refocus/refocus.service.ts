import { Injectable, NgZone } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { executeOnStable } from '../../functions/executeOnStable/executeOnStable';


/**
 * Service which recasts focus to an element after some disruptive operation
 */

@Injectable({
  providedIn: 'root'
})
export class RefocusService {

  id: string;
  refocus: boolean = false;

  reCastFocusId(id: string) {
    this.id = id;
    this.refocus = true;
  }

  constructor(
    private router: Router,
    private ngZone: NgZone
  ) {

    this.router.events.subscribe(event => {

      if (this.refocus && event instanceof NavigationEnd) {

        this.refocus = false;

        executeOnStable(this.ngZone, () => {
          const element = document.getElementById(this.id);
          if (element) element.focus();
        })

      }
    })
  }

}
