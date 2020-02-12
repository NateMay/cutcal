import { HAMMER_LOADER } from '@angular/platform-browser'

export const MOCK_HAMMER_LOADER = {
  provide: HAMMER_LOADER,
  useValue: () => new Promise(() => {}),
}
