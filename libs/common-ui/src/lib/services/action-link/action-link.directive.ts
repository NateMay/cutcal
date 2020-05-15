import {
  Directive,
  EventEmitter,
  Input,
  OnDestroy,
  Output
} from '@angular/core'
import { Subscription } from 'rxjs'
import { ActionLinkObserver } from './action-link.service'

@Directive({
  selector: '[ccActionLink]'
})
export class ActionLinkDirective implements OnDestroy {
  private sub!: Subscription | null

  /** @description Emits on activation */
  @Output() activate = new EventEmitter<{ [key: string]: string } | undefined>()

  constructor(private readonly observer: ActionLinkObserver) {}

  /** @description Sets the link path the directive will activate upon */
  @Input() set wmActionLink(link: string) {
    // Unsubscribes previous subscriptions, if any
    if (this.sub) this.sub.unsubscribe()

    // Registers to the specified link to emit on activation
    this.sub = this.observer
      .register(link)
      .subscribe(params => this.activate.emit(params))
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe()
  }
}
