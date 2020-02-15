import { Injectable, NgModule } from '@angular/core'
import { GestureConfig } from '@angular/material/core'
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppState, reducers } from '@cutcal/common'
import { EffectsModule } from '@ngrx/effects'
import { RouterState, RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store'
import { MetaReducer, StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule, StoreDevtoolsOptions } from '@ngrx/store-devtools'
import { STRICT_RUNTIME_CHECKS } from '../../../../libs/core/src/lib/constants/runtime-checks'
import { environment } from '../environments/environment'
import { AppComponent } from './app.component'
import { AppEffects } from './app.effects'
import { RoutingModule } from './app.routing'
import { Layout1Module } from './layout1/layout1.module'
import { actionSanitizer } from './utils/action.sanitizer'
import { CustomSerializer } from './utils/serializer'

export const metaReducers: Array<
  MetaReducer<AppState>
> = !environment.production ? [] : []

const DEV_TOOLS_OPTIONS: StoreDevtoolsOptions = {
  maxAge: 25,
  actionSanitizer,
  logOnly: environment.production,
}

@Injectable()
export class MyHammerConfig extends GestureConfig {
  overrides = <any>{
    pinch: { enable: false },
    rotate: { enable: false },
  }
}

@NgModule({
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RoutingModule,
    Layout1Module,
    /**
     * IMP: Order matters
     *   1️⃣ StoreModule
     *   2️⃣ StoreDevtoolsModule
     *   3️⃣ EffectsModule
     *   4️⃣ StoreRouterConnectingModule
     */
    StoreModule.forRoot(reducers, {
      metaReducers,
      ...STRICT_RUNTIME_CHECKS,
    }),
    !environment.production
      ? StoreDevtoolsModule.instrument(DEV_TOOLS_OPTIONS)
      : [],
    EffectsModule.forRoot([AppEffects]),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
      routerState: RouterState.Minimal,
    }),
  ],
  providers: [
    { provide: HAMMER_GESTURE_CONFIG, useClass: MyHammerConfig },
    { provide: RouterStateSerializer, useClass: CustomSerializer },
  ],
})
export class AppModule {}
