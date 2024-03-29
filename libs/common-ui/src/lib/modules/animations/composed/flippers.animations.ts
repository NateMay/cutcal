import {
  animate,
  animation,
  AnimationReferenceMetadata,
  keyframes,
  style
} from '@angular/animations'

/* stylelint-disable declaration-block-trailing-semicolon */
export const flip = animation(
  [
    // style({ 'backface-visibility': 'visible' }),
    animate(
      '{{ timing }} ease-out',
      keyframes([
        style({
          transform: 'perspective(400px) rotate3d(0, 1, 0, -360deg)',
          offset: 0
        }),
        style({
          transform:
            'perspective(400px) scale3d(1.5, 1.5, 1.5) rotate3d(0, 1, 0, -190deg)',
          offset: 0.4
        }),
        style({
          transform:
            'perspective(400px) scale3d(1.5, 1.5, 1.5) rotate3d(0, 1, 0, -170deg)',
          offset: 0.5
        }),
        style({
          transform: 'perspective(400px) scale3d(0.95, 0.95, 0.95)',
          offset: 0.8
        }),
        style({ transform: 'perspective(400px)', offset: 1 })
      ])
    )
  ],
  { params: { timing: '500ms', delay: 0 } }
)

export const flipIn = (
  rotateX: number,
  rotateY: number
): AnimationReferenceMetadata =>
  animation(
    [
      // style({ 'backface-visibility': 'visible' }),
      animate(
        '{{ timing }} ease-in',
        keyframes([
          style({
            opacity: 0,
            transform: 'perspective(400px) rotate3d(1, 0, 0, 90deg)',
            offset: 0
          }),
          style({
            opacity: 1,
            transform: 'perspective(400px) rotate3d(1, 0, 0, -20deg)',
            offset: 0.4
          }),
          style({
            transform: 'perspective(400px) rotate3d(1, 0, 0, 10deg)',
            offset: 0.6
          }),
          style({
            transform: 'perspective(400px) rotate3d(1, 0, 0, -5deg)',
            offset: 0.8
          }),
          style({
            transform: 'perspective(400px) rotate3d(0, 0, 0, 0)',
            offset: 1
          })
        ])
      )
    ],
    { params: { timing: '500ms', delay: 0, rotateX, rotateY } }
  )

export const flipInX = flipIn(1, 0)
export const flipInY = flipIn(0, 1)

export const flipOut = (
  rotateX: number,
  rotateY: number
): AnimationReferenceMetadata =>
  animation(
    [
      // style({ 'backface-visibility': 'visible' }),
      animate(
        '{{ timing }}',
        keyframes([
          style({ transform: 'perspective(400px)', offset: 0 }),
          style({
            opacity: 1,
            transform:
              'perspective(400px) rotate3d({{ rotateX }}, {{ rotateY }}, 0, -20deg)',
            offset: 0.3
          }),
          style({
            opacity: 0,
            transform:
              'perspective(400px) rotate3d({{ rotateX }}, {{ rotateY }}, 0, 90deg)',
            offset: 1
          })
        ])
      )
    ],
    { params: { timing: '500ms', delay: 0, rotateX, rotateY } }
  )

export const flipOutX = flipOut(1, 0)
export const flipOutY = flipOut(0, 1)
