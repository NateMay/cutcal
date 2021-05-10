import { enableProdMode } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import 'hammerjs'
import { CutCalModule } from './app/cutcal-root.module'
import { environment } from './environments/environment'

if (environment.production) {
  enableProdMode()
}

platformBrowserDynamic()
  .bootstrapModule(CutCalModule)
  .catch((err) => console.error(err))
