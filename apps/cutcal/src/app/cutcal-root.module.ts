import { Injectable, NgModule } from '@angular/core'
import { AngularFireModule } from '@angular/fire'
import { AngularFireAuthModule } from '@angular/fire/auth'
import { AngularFirestoreModule } from '@angular/fire/firestore'
import {
  BrowserModule,
  HammerGestureConfig,
  HammerModule,
  HAMMER_GESTURE_CONFIG
} from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { STRICT_RUNTIME_CHECKS } from '@cutcal/core'
import { EffectsModule } from '@ngrx/effects'
import {
  RouterState,
  RouterStateSerializer,
  StoreRouterConnectingModule
} from '@ngrx/router-store'
import { MetaReducer, StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule, StoreDevtoolsOptions } from '@ngrx/store-devtools'
import { environment } from '../environments/environment'
import { CutCalComponent } from './cutcal-root'
import { CutCalEffects } from './cutcal-root.effects'
import { CutCalRoutingModule } from './cutcal.routing'
import { Layout1Module } from './layout1/layout1.module'
import { actionSanitizer } from './utils/action.sanitizer'
import { CustomSerializer } from './utils/serializer'
import { AppState, reducers } from '../+state/app.state';

export const metaReducers: MetaReducer<AppState>[] = environment.production
  ? []
  : []

const DEV_TOOLS_OPTIONS: StoreDevtoolsOptions = {
  maxAge: 25,
  actionSanitizer,
  logOnly: environment.production
}

@Injectable()
export class MyHammerConfig extends HammerGestureConfig {
  overrides = {
    pinch: { enable: false },
    rotate: { enable: false }
  }
}

@NgModule({
  declarations: [CutCalComponent],
  bootstrap: [CutCalComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CutCalRoutingModule,
    Layout1Module,
    HammerModule,
    /**
     * @section [Firebase] 🔥
     */
    AngularFireModule.initializeApp(environment.firebase),
    environment.production
      ? AngularFirestoreModule.enablePersistence()
      : AngularFirestoreModule,
    AngularFireAuthModule,
    /**
     * IMPORTANT - Order matters
     * 1️⃣ StoreModule
     * 2️⃣ StoreDevtoolsModule
     * 3️⃣ EffectsModule
     * 4️⃣ StoreRouterConnectingModule
     */
    StoreModule.forRoot(reducers, {
      metaReducers,
      ...STRICT_RUNTIME_CHECKS
    }),
    !environment.production
      ? StoreDevtoolsModule.instrument(DEV_TOOLS_OPTIONS)
      : [],
    /**
     * // TODO (ngrx) Customizable re-subscriptions for Effects
     * {@link https://medium.com/ngrx/announcing-ngrx-version-9-immutability-out-of-the-box-customizable-effects-and-more-e4cf71be1a5b Brandon Roberts}
     */
    EffectsModule.forRoot([CutCalEffects]),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
      routerState: RouterState.Minimal
    })
  ],
  providers: [
    { provide: HAMMER_GESTURE_CONFIG, useClass: MyHammerConfig },
    { provide: RouterStateSerializer, useClass: CustomSerializer }
  ]
})
export class CutCalModule {}
