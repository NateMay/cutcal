import { AnimationStyleMetadata, style } from '@angular/animations'

/**
 * @description Creates a swing like animation
 * @see {@link https://github.com/daneden/animate.css/tree/master/source Github}
 * @see {@link https://www.youtube.com/watch?v=5Z2C0wy4bmg YouTube}
 * @see {@link https://angularfirebase.com/lessons/hammerjs-angular-5-animations-for-mobile-gestures-tutorial/ AngularFirebase}
 */

export const swing: AnimationStyleMetadata[] = [
  /* stylelint-disable declaration-block-trailing-semicolon */
  style({ transform: 'rotate3d(0, 0, 1, 15deg)', offset: 0.2 }),
  style({ transform: 'rotate3d(0, 0, 1, -10deg)', offset: 0.4 }),
  style({ transform: 'rotate3d(0, 0, 1, 5deg)', offset: 0.6 }),
  style({ transform: 'rotate3d(0, 0, 1, -5deg)', offset: 0.8 }),
  style({ transform: 'none', offset: 1 })
]
