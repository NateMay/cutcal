import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Route } from '@angular/router'
import { CommonUiLandingComponent } from './common-ui-landing.component'

export const landingRoutes: Route[] = []

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [CommonUiLandingComponent],
})
export class LandingModule {}
