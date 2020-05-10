import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ExtraOptions, RouterModule } from '@angular/router'
import { QuicklinkModule, QuicklinkStrategy } from 'ngx-quicklink'
import { Layout1Component } from './layout1/layout1.component'

const ROUTER_OPTIONS: ExtraOptions = {
  preloadingStrategy: QuicklinkStrategy,
  anchorScrolling: 'enabled',
  scrollPositionRestoration: 'enabled',
  initialNavigation: 'enabled'
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
            import('@cutcal/features/landing').then(
              module => module.LandingModule
            )
        },
        {
          path: ':layout1',
          component: Layout1Component,
          children: [
            {
              path: 'food-recipe',
              loadChildren: () =>
                import('@cutcal/features/food-recipe').then(
                  module => module.FoodRecipeModule
                )
            },
            {
              path: 'analyze',
              loadChildren: () =>
                import('@cutcal/features/analyze').then(
                  module => module.AnalyzeModule
                )
            },
            {
              path: 'calendar',
              loadChildren: () =>
                import('@cutcal/features/calendar').then(
                  module => module.CalendarModule
                )
            },
            {
              path: 'fallback',
              loadChildren: () =>
                import('@cutcal/features/fallback').then(
                  module => module.FallbackModule
                )
            },
            {
              path: 'footer',
              loadChildren: () =>
                import('@cutcal/features/footer').then(
                  module => module.FooterModule
                )
            },
            {
              path: 'profile',
              loadChildren: () =>
                import('@cutcal/features/profile').then(
                  module => module.ProfileModule
                )
            },
            {
              path: 'recipe-builder',
              loadChildren: () =>
                import('@cutcal/features/recipe-builder').then(
                  module => module.RecipeBuilderModule
                )
            },
            {
              path: 'meal-ingredient',
              loadChildren: () =>
                import('@cutcal/features/meal-ingredient').then(
                  module => module.MealIngredientModule
                )
            },
            {
              path: 'nutrient',
              loadChildren: () =>
                import('@cutcal/features/nutrient').then(
                  module => module.NutrientModule
                )
            },
            {
              path: 'legal',
              loadChildren: () =>
                import('@cutcal/features/legal').then(
                  module => module.LegalModule
                )
            },
            {
              path: 'business',
              loadChildren: () =>
                import('@cutcal/features/business').then(
                  module => module.BusinessModule
                )
            },
            {
              path: 'grocery-pantry',
              loadChildren: () =>
                import('@cutcal/features/grocery-pantry').then(
                  module => module.GroceryPantryModule
                )
            },
            {
              path: 'support',
              loadChildren: () =>
                import('@cutcal/features/support').then(
                  module => module.SupportModule
                )
            }
          ]
        }
      ],
      ROUTER_OPTIONS
    )
  ]
})
export class CutCalRoutingModule {}
