import { NgModule } from '@angular/core'
import { FlexLayoutModule } from '@angular/flex-layout'
import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatToolbarModule } from '@angular/material/toolbar'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppComponent } from './app.component'
import { CommonUIRouting } from './app.routing'
import { CommonUiLandingComponent } from './common-ui-landing/common-ui-landing.component'
import { CommonUiSidenavComponent } from './common-ui-sidenav/common-ui-sidenav.component'
@NgModule({
  declarations: [
    AppComponent,
    CommonUiSidenavComponent,
    CommonUiLandingComponent
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    CommonUIRouting,
    FlexLayoutModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
