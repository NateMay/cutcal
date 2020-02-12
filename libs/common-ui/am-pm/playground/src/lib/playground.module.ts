import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { AmPmModule } from '@cutcal/common-ui/am-pm'
import { AmPmPlagroundComponent } from './am-pm-plaground.component'
@NgModule({
  imports: [
    CommonModule,
    AmPmModule,
    RouterModule.forChild([
      {
        path: '',
        component: AmPmPlagroundComponent,
      },
    ]),
  ],
  declarations: [AmPmPlagroundComponent],
})
export class AmPmPlaygroundModule {}
