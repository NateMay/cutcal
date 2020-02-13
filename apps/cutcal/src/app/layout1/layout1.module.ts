import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatRippleModule } from '@angular/material/core'
import { MatIconModule } from '@angular/material/icon'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatToolbarModule } from '@angular/material/toolbar'
import { RouterModule } from '@angular/router'
import { HeaderModule } from './header/header.module'
import { Layout1Component } from './layout1.component'
import { SidebarModule } from './sidebar/sidebar.module'

@NgModule({
  declarations: [Layout1Component],
  exports: [Layout1Component],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    HeaderModule,
    SidebarModule,
    MatRippleModule,
    RouterModule
  ],
})
export class Layout1Module {}
