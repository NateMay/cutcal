import { NgModule } from '@angular/core'
import { ActionLinkDirective } from './action-link.directive'
import { ActionLinkObserver } from './action-link.service'

// FEATURE (auth) canActivate/deactivate
// https://medium.com/wizdm-genesys/angular-supercharging-the-router-a49e370fad78
@NgModule({
  declarations: [ActionLinkDirective],
  exports: [ActionLinkDirective],
  providers: [ActionLinkObserver]
})
export class ActionLinkModule {}
