import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RadialProgressComponent } from './radial-progress.component'

@NgModule({
  declarations: [RadialProgressComponent],
  exports: [RadialProgressComponent],
  imports: [CommonModule],
})
export class RadialProgressModule {}
