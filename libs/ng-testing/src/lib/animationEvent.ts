export const mockAnimationEvent = (
  fromState: string,
  toState: string
): any => ({
  preventDefault: (): void => {},
  fromState,
  toState,
})
