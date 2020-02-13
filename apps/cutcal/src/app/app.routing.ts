import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ExtraOptions, RouterModule } from '@angular/router'
import { QuicklinkModule, QuicklinkStrategy } from 'ngx-quicklink'
import { Layout1Component } from './layout1/layout1.component'

const ROUTER_OPTIONS: ExtraOptions = {
  preloadingStrategy: QuicklinkStrategy,
  anchorScrolling: 'enabled',
  scrollPositionRestoration: 'enabled',
  initialNavigation: 'enabled',
}

@NgModule({
  exports: [RouterModule],
  imports: [
    CommonModule,
    QuicklinkModule,
    RouterModule.forRoot(
      [
        {
          path: '',
          loadChildren: () =>
            import('@cutcal/cutcal/landing').then(
              module => module.LandingModule
            ),
        },
        {
          path: ':layout1',
          component: Layout1Component,
          children: [
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
                import('@cutcal/cutcal/analyze').then(
                  module => module.AnalyzeModule
                ),
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
                import('@cutcal/cutcal/footer').then(
                  module => module.FooterModule
                ),
            },
            {
              path: 'profile',
              loadChildren: () =>
                import('@cutcal/cutcal/profile').then(
                  module => module.ProfileModule
                ),
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
                import('@cutcal/cutcal/legal').then(
                  module => module.LegalModule
                ),
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
                import('@cutcal/cutcal/support').then(
                  module => module.SupportModule
                ),
            },
          ],
        },
      ],
      ROUTER_OPTIONS
    ),
  ],
})
export class RoutingModule {}
