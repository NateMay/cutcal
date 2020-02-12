import { A11yModule } from '@angular/cdk/a11y'
import { OverlayModule } from '@angular/cdk/overlay'
import { CommonModule } from '@angular/common'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { FlexLayoutModule } from '@angular/flex-layout'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatSidenavModule } from '@angular/material/sidenav'
import { RouterModule } from '@angular/router'
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor'
import { DndModule } from './modules/dnd/dnd.module'
import { PipesModule } from './pipes/pipes.module'
import { ConfrmPasswordDir } from './validators/confirmPassword/confirmPassword'
import { PasswordValidatorDir } from './validators/password/password'

const DECLARATIONS = [ConfrmPasswordDir, PasswordValidatorDir]

const MODULES = [DndModule, PipesModule]

const NG_MODULES = [
  FormsModule,
  CommonModule,
  RouterModule,
  HttpClientModule,
  FlexLayoutModule,
  ReactiveFormsModule,
]

const MAT_MODULES = [
  A11yModule,
  OverlayModule,
  MatIconModule,
  MatInputModule,
  MatButtonModule,
  MatSidenavModule,
  MatFormFieldModule,
  MatExpansionModule,
]

/**
 * CutCal Common Module
 */

@NgModule({
  declarations: [...DECLARATIONS],
  imports: [...MODULES, ...MAT_MODULES, ...NG_MODULES],
  exports: [...MODULES, ...MAT_MODULES, ...DECLARATIONS, ...NG_MODULES],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
    // DISTANT (caching) devTools audit says I need caching

    // this is copied from another project, but will need to customize
    // https://angular.io/guide/http#caching
    // Take from: https://github.com/angular/angular/blob/master/aio/content/examples/http/src/app/http-interceptors/caching-interceptor.ts

    // {
    //   provide: RequestCache,
    //   useClass: RequestCacheWithMap
    // },
  ],
})
export class BasicsModule {}
