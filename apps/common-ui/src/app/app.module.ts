import { NgModule } from '@angular/core'
import { MatIconModule } from '@angular/material/icon'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatToolbarModule } from '@angular/material/toolbar'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterModule } from '@angular/router'
import { LandingModule, landingRoutes } from '@cutcal/common-ui/landing'
import { AppComponent } from './app.component'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      [
        {
          path: 'playground',
          loadChildren: () =>
            import('@cutcal/common-ui/breadcrumb/playground').then(
              module => module.PlaygroundModule
            ),
        },
        {
          path: 'playground',
          loadChildren: () =>
            import('@cutcal/common-ui/animate/playground').then(
              module => module.PlaygroundModule
            ),
        },
        {
          path: 'am-pm',
          loadChildren: () =>
            import('@cutcal/common-ui/am-pm/playground').then(
              module => module.AmPmPlaygroundModule
            ),
        },
        {
          path: 'playground',
          loadChildren: () =>
            import('@cutcal/common-ui/carousel/playground').then(
              module => module.PlaygroundModule
            ),
        },
        {
          path: 'playground',
          loadChildren: () =>
            import('@cutcal/common-ui/datepicker/playground').then(
              module => module.PlaygroundModule
            ),
        },
        {
          path: 'playground',
          loadChildren: () =>
            import('@cutcal/common-ui/timepicker/playground').then(
              module => module.PlaygroundModule
            ),
        },
        {
          path: 'playground',
          loadChildren: () =>
            import('@cutcal/common-ui/drag-n-drop/playground').then(
              module => module.PlaygroundModule
            ),
        },
        {
          path: 'playground',
          loadChildren: () =>
            import('@cutcal/common-ui/date-time-binder/playground').then(
              module => module.PlaygroundModule
            ),
        },
        {
          path: 'playground',
          loadChildren: () =>
            import('@cutcal/common-ui/dynamic-width/playground').then(
              module => module.PlaygroundModule
            ),
        },
        {
          path: 'playground',
          loadChildren: () =>
            import('@cutcal/common-ui/flip-card/playground').then(
              module => module.PlaygroundModule
            ),
        },
        {
          path: 'playground',
          loadChildren: () =>
            import('@cutcal/common-ui/holdable/playground').then(
              module => module.PlaygroundModule
            ),
        },
        {
          path: 'playground',
          loadChildren: () =>
            import('@cutcal/common-ui/image-upload/playground').then(
              module => module.PlaygroundModule
            ),
        },
        {
          path: 'playground',
          loadChildren: () =>
            import('@cutcal/common-ui/nutrition-label/playground').then(
              module => module.PlaygroundModule
            ),
        },
        { path: 'landing', children: landingRoutes },
      ],
      { initialNavigation: 'enabled' }
    ),
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    BrowserAnimationsModule,
    LandingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
