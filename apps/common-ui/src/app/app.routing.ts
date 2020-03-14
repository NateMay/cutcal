import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonUiLandingComponent } from './common-ui-landing/common-ui-landing.component';

// 'date-picker'
// 'date-picker2'
// 'time-picker'
// 'datetime-binder'
// 'breadcrumbs'
// 'am-pm-toggle'
// 'nutrition-label'
// 'holdable'
// 'dnd'
// 'upload'
// 'flip'
// 'animate'
// 'classes'
// 'carousel'
// 'dynamic-width'

const COMMONUI_ROUTES: Routes = [
  {
    path: '',
    component: CommonUiLandingComponent,
  },
  {
    path: 'date-picker',
    loadChildren: () =>
      import('@cutcal/playgrounds').then(module => module.Doc4DatepickerModule),
  },
  {
    path: 'time-picker',
    loadChildren: () =>
      import('@cutcal/playgrounds').then(module => module.Doc4TimepickerModule),
  },
  {
    path: 'am-pm-toggle',
    loadChildren: () =>
      import('@cutcal/playgrounds').then(module => module.Doc4AmPmModule),
  },
  {
    path: 'cc-timepicker',
    loadChildren: () =>
      import('@cutcal/playgrounds').then(module => module.Doc4CcTimepickerModule),
  },
  {
    path: 'datetime-binder',
    loadChildren: () =>
      import('@cutcal/playgrounds').then(
        module => module.Doc4DatetimeBinderModule
      ),
  },
  {
    path: 'breadcrumbs',
    loadChildren: () =>
      import('@cutcal/playgrounds').then(
        module => module.Doc4BreadcrumbsModule
      ),
  },
  {
    path: 'nutrition-label',
    loadChildren: () =>
      import('@cutcal/playgrounds').then(module => module.Doc4NutrLabelModule),
  },
  {
    path: 'holdable',
    loadChildren: () =>
      import('@cutcal/playgrounds').then(module => module.Doc4HoldableModule),
  },
  {
    path: 'upload',
    loadChildren: () =>
      import('@cutcal/playgrounds').then(module => module.Doc4ImgUploadModule),
  },
  {
    path: 'dnd',
    loadChildren: () =>
      import('@cutcal/playgrounds').then(module => module.Doc4DndModule),
  },
  {
    path: 'flip',
    loadChildren: () =>
      import('@cutcal/playgrounds').then(module => module.Doc4FlipCardModule),
  },
  {
    path: 'animate',
    loadChildren: () =>
      import('@cutcal/playgrounds').then(module => module.Doc4AnimateModule),
  },
  {
    path: 'carousel',
    loadChildren: () =>
      import('@cutcal/playgrounds').then(module => module.Doc4CarouselModule),
  },
  {
    path: 'dyn-width',
    loadChildren: () =>
      import('@cutcal/playgrounds').then(module => module.Doc4DynWidthModule),
  },
]

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(COMMONUI_ROUTES)],
})
export class CommonUIRouting {}
