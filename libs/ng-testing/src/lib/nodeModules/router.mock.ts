import { Directive, Injectable, Input, NgModule } from '@angular/core'
import { NavigationEnd } from '@angular/router'
import { Subject } from 'rxjs'

@Injectable()
export class MockRouterSvc {
  public url: string
  private subject = new Subject()
  public events = this.subject.asObservable()

  navigate(url: string) {
    this.triggerNavEvents(`http://cutcal/${url}`)
  }

  triggerNavEvents(url: string, urlAfter?: string) {
    this.subject.next(
      new NavigationEnd(
        0,
        `http://cutcal/${url}`,
        Boolean(urlAfter) ? `http://cutcal/${urlAfter}` : `http://cutcal/${url}`
      )
    )
  }
}

@Directive({
  // tslint:disable-next-line
  selector: 'routerLink',
})
export class MockRouterLink {
  @Input() routerLink: string
}

@NgModule({
  declarations: [MockRouterLink],
  exports: [MockRouterLink],
  providers: [MockRouterSvc],
})
export class MockRouterModule {}
