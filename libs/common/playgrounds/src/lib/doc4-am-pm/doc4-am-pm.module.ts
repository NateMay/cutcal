import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { Doc4AmPmComponent } from './doc4-am-pm.component'

@NgModule({
  declarations: [Doc4AmPmComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: Doc4AmPmComponent,
      },
    ]),
  ],
})
export class Doc4AmPmModule {}
