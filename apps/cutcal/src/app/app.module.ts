import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatRippleModule } from '@angular/material/core'
import { MatIconModule } from '@angular/material/icon'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatToolbarModule } from '@angular/material/toolbar'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterModule } from '@angular/router'
import { AppComponent } from './app.component'
import { HeaderModule } from './header/header.module'
import { SidebarModule } from './sidebar/sidebar.module'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    HeaderModule,
    SidebarModule,
    MatRippleModule,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full',
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./profile/profile.module').then(m => m.ProfileModule),
      },
      {
        path: 'food-recipe',
        loadChildren: () =>
          import('@cutcal/cutcal/food-recipe').then(
            module => module.FoodRecipeModule
          ),
      },
      {
        path: 'analyze',
        loadChildren: () =>
          import('@cutcal/cutcal/analyze').then(module => module.AnalyzeModule),
      },
      {
        path: 'calendar',
        loadChildren: () =>
          import('@cutcal/cutcal/calendar').then(
            module => module.CalendarModule
          ),
      },
      {
        path: 'fallback',
        loadChildren: () =>
          import('@cutcal/cutcal/fallback').then(
            module => module.FallbackModule
          ),
      },
      {
        path: 'footer',
        loadChildren: () =>
          import('@cutcal/cutcal/footer').then(module => module.FooterModule),
      },
      {
        path: 'header',
        loadChildren: () =>
          import('@cutcal/cutcal/header').then(module => module.HeaderModule),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('@cutcal/cutcal/profile').then(module => module.ProfileModule),
      },
      {
        path: 'sidebar',
        loadChildren: () =>
          import('@cutcal/cutcal/sidebar').then(module => module.SidebarModule),
      },
      {
        path: 'recipe-builder',
        loadChildren: () =>
          import('@cutcal/cutcal/recipe-builder').then(
            module => module.RecipeBuilderModule
          ),
      },
      {
        path: 'meal-ingredient',
        loadChildren: () =>
          import('@cutcal/cutcal/meal-ingredient').then(
            module => module.MealIngredientModule
          ),
      },
      {
        path: 'nutrient',
        loadChildren: () =>
          import('@cutcal/cutcal/nutrient').then(
            module => module.NutrientModule
          ),
      },
      {
        path: 'legal',
        loadChildren: () =>
          import('@cutcal/cutcal/legal').then(module => module.LegalModule),
      },
      {
        path: 'business',
        loadChildren: () =>
          import('@cutcal/cutcal/business').then(
            module => module.BusinessModule
          ),
      },
      {
        path: 'auth',
        loadChildren: () =>
          import('@cutcal/cutcal/auth').then(module => module.AuthModule),
      },
      {
        path: 'grocery-pantry',
        loadChildren: () =>
          import('@cutcal/cutcal/grocery-pantry').then(
            module => module.GroceryPantryModule
          ),
      },
      {
        path: 'support',
        loadChildren: () =>
          import('@cutcal/cutcal/support').then(module => module.SupportModule),
      },
      {
        path: 'landing',
        loadChildren: () =>
          import('@cutcal/cutcal/landing').then(module => module.LandingModule),
      },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
