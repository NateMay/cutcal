import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { AngularFireModule } from '@angular/fire'
import { AngularFireAuthModule } from '@angular/fire/auth'
import { AngularFirestoreModule } from '@angular/fire/firestore'
import { AngularFireFunctionsModule } from '@angular/fire/functions'
import { FlexLayoutModule } from '@angular/flex-layout'
import { ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatListModule } from '@angular/material/list'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatToolbarModule } from '@angular/material/toolbar'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FdcService } from '@cutcal/fdc'
import { FirestoreService } from '@cutcal/fire'
import { NgAisModule } from 'angular-instantsearch'
import { environment } from '../environments/environment'
import { AlgoliaComponent } from './algolia/algolia'
import { CreateComponent } from './create/create.component'
import { AppComponent } from './food-review.component'
import { FoodReviewRouting } from './food-review.routing'
@NgModule({
  declarations: [AppComponent, AlgoliaComponent, CreateComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatListModule,
    MatSidenavModule,
    FlexLayoutModule,
    MatToolbarModule,
    ReactiveFormsModule,
    FoodReviewRouting,
    // https://community.algolia.com/angular-instantsearch/getting-started.html#going-further
    NgAisModule.forRoot(),
    AngularFireFunctionsModule,
    /**
     * @section [Firebase] 🔥
     */
    AngularFireModule.initializeApp(environment.firebase),
    environment.production
      ? AngularFirestoreModule.enablePersistence()
      : AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [FdcService, FirestoreService],
  bootstrap: [AppComponent]
})
export class AppModule {}
