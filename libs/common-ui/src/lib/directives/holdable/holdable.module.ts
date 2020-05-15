import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { RouterModule } from '@angular/router'
import { HoldableDirective } from './holdable.dir'

const DECLARATIONS = [HoldableDirective]

@NgModule({
  imports: [CommonModule, RouterModule, MatIconModule, MatButtonModule],
  declarations: [...DECLARATIONS],
  exports: [...DECLARATIONS]
})
export class HoldableModule {}
