import {
  animate,
  AnimationTriggerMetadata,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations'

/**
 * Allows for a staggered animation entry for items
 * @param {string} triggerName name of the animation trigger
 * @return {AnimationTriggerMetadata}
 */

export function getListStagger(
  triggerName: string = 'listStagger',
  speed: number = 100
): AnimationTriggerMetadata {
  return trigger(triggerName, [
    transition('* <=> *', [
      query(
        ':enter',
        [
          style({ opacity: 0, transform: 'translateY(50px)' }),
          stagger(
            '50ms',
            animate(
              `${speed}ms ease-out`,
              style({ opacity: 1, transform: 'translateY(0px)' })
            )
          ),
        ],
        { optional: true }
      ),
      query(':leave', animate('50ms', style({ opacity: 0 })), {
        optional: true,
      }),
    ]),
  ])
}
