import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { SidebarSearchComponent } from './sidebar-search/sidebar-search.component'

@NgModule({
  declarations: [SidebarSearchComponent],
  exports: [SidebarSearchComponent],
  imports: [CommonModule, MatInputModule, MatFormFieldModule, MatIconModule],
})
export class SidebarModule {}
